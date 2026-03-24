import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";
import { REMEDY_DICTIONARY } from "../app/(home)/software/kent-repertory/REMEDY_DICTIONARY";

const prisma = new PrismaClient();

const BookName = "Kent Repertory";
const chapterName = "Mind";

// ✅ CSV Splitter
function splitCsv(str: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuote = false;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (char === '"') {
      if (inQuote && str[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuote = !inQuote;
      }
    } else if (char === "," && !inQuote) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  result.push(current);
  return result;
}

// ✅ Remedy lookup
function getRemedyDetails(abbr: string) {
  const cleanAbbr = abbr.toLowerCase().trim();

  let remedies = REMEDY_DICTIONARY[cleanAbbr];

  if (!remedies && !cleanAbbr.endsWith(".")) {
    remedies = REMEDY_DICTIONARY[cleanAbbr + "."];
  }

  if (!remedies || remedies.length === 0) {
    return {
      fullForm: null,
      description: null,
    };
  }

  return {
    fullForm: remedies[0].name,
    description: remedies[0].description,
  };
}

// ✅ Parse [Title - Description]
function parseMeaningBlocks(raw: string) {
  const result: { title: string; description: string }[] = [];

  const matches = raw.match(/\[(.*?)\]/g);
  if (!matches) return result;

  for (const block of matches) {
    const content = block.slice(1, -1).trim();

    const parts = content.split("-");
    if (parts.length < 2) continue;

    const title = parts[0].trim();
    const description = parts.slice(1).join("-").trim();

    result.push({ title, description });
  }

  return result;
}

// ✅ Map to schema fields
function mapToRubricFields(blocks: { title: string; description: string }[]) {
  const data: any = {};

  for (const block of blocks) {
    const title = block.title.toLowerCase().replace(/\s+/g, " ").trim();

    if (title.includes("meaning")) {
      data.meaning = block.description;
    } else if (title.includes("patient version 2")) {
      data.patientVersion2 = block.description;
    } else if (title.includes("patient version")) {
      data.patientVersion = block.description;
    } else if (title.includes("when to use this rubric as metaphor")) {
      data.whenToUseAsMetaphor = block.description;
    } else if (title.includes("when to use")) {
      data.whenToUse = block.description;
    } else if (title.includes("cross reference by dr kent")) {
      data.crossReferenceByDrKent = block.description;
    } else if (title.includes("cross reference by homeosetu")) {
      data.crossReferenceByHomeosetu = block.description;
    }
  }

  return data;
}

async function main() {
  console.log("🚀 Start seeding...");

  const csvPath = path.join(
    process.cwd(),
    "app/(home)/software/kent-repertory/kent-data.csv",
  );

  if (!fs.existsSync(csvPath)) {
    console.error(`❌ File not found: ${csvPath}`);
    return;
  }

  const fileContent = fs.readFileSync(csvPath, "utf-8");
  const lines = fileContent.split(/\r?\n/);

  // ✅ Book
  const book = await prisma.book.upsert({
    where: { bookName: BookName },
    update: {},
    create: { bookName: BookName },
  });
  console.log(`Book ID: ${book.id}`);

  // ✅ Chapter
  let chapter = await prisma.content.findFirst({
    where: {
      bookId: book.id,
      name: chapterName,
    },
  });

  if (!chapter) {
    chapter = await prisma.content.create({
      data: {
        bookId: book.id,
        name: chapterName,
        description: `${chapterName} Chapter`,
      },
    });
  }
  console.log(`Chapter '${chapterName}' ID: ${chapter.id}`);

  let rubricCount = 0;

  // ✅ Process CSV
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const cols = splitCsv(line);
    if (cols.length < 3) continue;

    const rawRubric = cols[0].trim();
    const rawRemedies = cols[1].trim();
    const rawMeaning = cols[2].trim();

    let rubricName = rawRubric.endsWith(":")
      ? rawRubric.slice(0, -1).trim()
      : rawRubric;

    if (!rubricName) continue;

    // ✅ Parse + map meaning
    const parsedBlocks = parseMeaningBlocks(rawMeaning);
    const mappedFields = mapToRubricFields(parsedBlocks);

    // ✅ Create rubric
    const rubric = await prisma.rubric.create({
      data: {
        chapterId: chapter.id,
        name: rubricName,
        ...mappedFields,
      },
    });

    // ✅ Remedies
    if (rawRemedies) {
      const remedyList = rawRemedies
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      for (const remStr of remedyList) {
        const match = remStr.match(/^(\d+)?(.+)$/);
        if (!match) continue;

        const grade = match[1] ? parseInt(match[1]) : 1;
        const abbrRaw = match[2].trim();

        const details = getRemedyDetails(abbrRaw);

        await prisma.remedy.create({
          data: {
            rubricId: rubric.id,
            abbr: abbrRaw,
            grade,
            fullForm: details.fullForm,
            description: details.description,
          },
        });
      }
    }

    rubricCount++;

    if (rubricCount % 50 === 0) {
      console.log(`✅ Processed ${rubricCount} rubrics...`);
    }
  }

  console.log(`🎉 Done! Total rubrics: ${rubricCount}`);
}

main()
  .catch((e) => {
    console.error("❌ Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
