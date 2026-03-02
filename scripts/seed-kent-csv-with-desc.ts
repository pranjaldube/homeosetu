import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();
const BookName =
  "Symptom in Keynotes and Characteristics of MM By Dr H C Allen";
const chapterName = "Gastric";

// Better CSV Splitter that strips quotes
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

async function main() {
  console.log("Start seeding Repertory from CSV with Remedy Descriptions...");

  const csvPath = path.join(
    process.cwd(),
    "app/(home)/software/kent-repertory/kent-data.csv",
  );

  if (!fs.existsSync(csvPath)) {
    console.error(`File not found: ${csvPath}`);
    return;
  }

  const fileContent = fs.readFileSync(csvPath, "utf-8");
  const lines = fileContent.split(/\r?\n/);

  // 1. Create Book
  const book = await prisma.book.upsert({
    where: { bookName: BookName },
    update: {},
    create: { bookName: BookName },
  });
  console.log(`Book ID: ${book.id}`);

  // 2. Create Chapter
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

  // 3. Process Lines
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const cols = splitCsv(line);
    if (cols.length < 3) continue;

    let rawRubric = cols[0].trim();
    const rawRemedies = cols[1].trim();
    const meaning = cols[2].trim();

    let rubricName = rawRubric;
    if (rubricName.endsWith(":")) {
      rubricName = rubricName.slice(0, -1).trim();
    }
    if (!rubricName) continue;

    let rubric = await prisma.rubric.create({
      data: {
        chapterId: chapter.id,
        name: rubricName,
        meaning: meaning || null,
      },
    });

    // Parse Remedies
    if (rawRemedies) {
      // Extract items enclosed in square brackets: e.g. [ Caps., -Pains in distant parts on coughing... ]
      const remedyRegex = /\[(.*?)\]/g;
      let match;
      let foundBrackets = false;

      while ((match = remedyRegex.exec(rawRemedies)) !== null) {
        foundBrackets = true;
        const inside = match[1];
        const commaIdx = inside.indexOf(",");

        if (commaIdx !== -1) {
          const firstPart = inside.substring(0, commaIdx).trim();
          let description = inside.substring(commaIdx + 1).trim();

          // Remove leading hyphen if exists
          if (description.startsWith("-")) {
            description = description.substring(1).trim();
          }

          // Extract grade from firstPart
          const gradeMatch = firstPart.match(/^(\d+)?(.+)$/);
          if (gradeMatch) {
            const gradeStr = gradeMatch[1];
            const abbrRaw = gradeMatch[2].trim();
            const grade = gradeStr ? parseInt(gradeStr) : 1;

            await prisma.remedy.create({
              data: {
                rubricId: rubric.id,
                abbr: abbrRaw,
                grade: grade,
                fullForm: abbrRaw, // Use abbreviation as fullForm since dictionary lookup is skipped
                description: description,
              },
            });
          }
        }
      }

      // Fallback just in case they didn't wrap in brackets but it's just "Caps., -Desc"
      if (!foundBrackets && rawRemedies.length > 0) {
        const commaIdx = rawRemedies.indexOf(",");
        if (commaIdx !== -1) {
          const firstPart = rawRemedies.substring(0, commaIdx).trim();
          let description = rawRemedies.substring(commaIdx + 1).trim();
          if (description.startsWith("-")) {
            description = description.substring(1).trim();
          }

          const gradeMatch = firstPart.match(/^(\d+)?(.+)$/);
          if (gradeMatch) {
            const gradeStr = gradeMatch[1];
            const abbrRaw = gradeMatch[2].trim();
            const grade = gradeStr ? parseInt(gradeStr) : 1;

            await prisma.remedy.create({
              data: {
                rubricId: rubric.id,
                abbr: abbrRaw,
                grade: grade,
                fullForm: abbrRaw,
                description: description,
              },
            });
          }
        }
      }
    }

    rubricCount++;
    if (rubricCount % 50 === 0) {
      console.log(`Processed ${rubricCount} rubrics...`);
    }
  }

  console.log(`Seeding finished. Processed ${rubricCount} rubrics.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
