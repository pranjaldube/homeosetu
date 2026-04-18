import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";
import { REMEDY_DICTIONARY } from "../app/(home)/software/kent-repertory/REMEDY_DICTIONARY";

const prisma = new PrismaClient();

const BookName = "Homeosetu Clinical Repertory";
const chapterName = "Clinical Boericke";

// CSV Splitter
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

// Dictionary lookup
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

// Normalize
function normalize(r: string) {
  return r.replace(".", "").trim().toLowerCase();
}

// Remove numeric grades like "2tarent."
function cleanForLookup(abbr: string) {
  return abbr.replace(/^\d+/, "");
}

async function main() {
  console.log("Start seeding...");

  const csvPath = path.join(
    process.cwd(),
    "app/(home)/software/kent-repertory/kent-data.csv",
  );

  const fileContent = fs.readFileSync(csvPath, "utf-8");
  const lines = fileContent.split(/\r?\n/);

  const book = await prisma.book.upsert({
    where: { bookName: BookName },
    update: {},
    create: { bookName: BookName },
  });

  console.log(`Book ID: ${book.id}`);

  const chapter = await prisma.content.create({
    data: {
      bookId: book.id,
      name: chapterName,
      description: `${chapterName} Chapter`,
    },
  });

  console.log(`Chapter '${chapterName}' ID: ${chapter.id}`);

  let rubricCount = 0;

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const cols = splitCsv(line);

    const rawRubric = cols[0]?.trim();
    const rawRemedyList = cols[1]?.trim();
    const meaning = cols[2]?.trim();

    if (!rawRubric || !rawRemedyList) continue;

    const rubricName = rawRubric.replace(/:$/, "").trim();

    const rubric = await prisma.rubric.create({
      data: {
        chapterId: chapter.id,
        name: rubricName,
        meaning: null,
      },
    });

    // ✅ STEP 1: Extract descriptions from meaning
    const descriptionMap = new Map<string, string>();

    if (meaning) {
      const regex = /\[(.*?)\]/g;
      let match;

      while ((match = regex.exec(meaning)) !== null) {
        const inside = match[1].trim();

        const parts = inside.split(/,\s*-/);
        const remedyPart = parts[0];
        const description = parts[1]?.trim() || null;

        if (!description) continue;

        const remedies = remedyPart
          .split(",")
          .map((r) => normalize(r))
          .filter(Boolean);

        for (const r of remedies) {
          if (!descriptionMap.has(r)) {
            descriptionMap.set(r, description);
          }
        }
      }
    }

    // ✅ STEP 2: Process remedies
    const mainRemedies = rawRemedyList
      .split(",")
      .map((r) => r.trim())
      .filter(Boolean);

    for (const abbr of mainRemedies) {
      const clean = normalize(abbr);

      let description = descriptionMap.get(clean) || null;
      let fullForm = abbr;

      // 🔁 STEP 3: fallback to dictionary
      if (!description) {
        const lookupAbbr = cleanForLookup(abbr);
        const remedyDetails = getRemedyDetails(lookupAbbr);

        if (remedyDetails.description) {
          description = remedyDetails.description;
        }

        if (remedyDetails.fullForm) {
          fullForm = remedyDetails.fullForm;
        }
      }

      // 🔚 Final fallback
      if (!description) {
        description = abbr;
      }

      await prisma.remedy.create({
        data: {
          rubricId: rubric.id,
          abbr: abbr,
          grade: 1,
          fullForm: fullForm,
          description: description,
        },
      });
    }

    rubricCount++;

    if (rubricCount % 50 === 0) {
      console.log(`Processed ${rubricCount}`);
    }
  }

  console.log("Done:", rubricCount);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
