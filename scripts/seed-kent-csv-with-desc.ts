import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

const BookName =
  "Homeosetu bowel nosode repertory";
const chapterName = "A to Z";

// Better CSV Splitter (handles quotes and commas properly)
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
  console.log("Start seeding Repertory from CSV...");

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

  // 1️⃣ Create / Upsert Book
  const book = await prisma.book.upsert({
    where: { bookName: BookName },
    update: {},
    create: { bookName: BookName },
  });

  console.log(`Book ID: ${book.id}`);

  // 2️⃣ Create / Find Chapter
  let chapter;
  //   chapter = await prisma.content.findFirst({
  //     where: {
  //       bookId: book.id,
  //       name: chapterName,
  //     },
  //   });

  //   if (!chapter) {
  chapter = await prisma.content.create({
    data: {
      bookId: book.id,
      name: chapterName,
      description: `${chapterName} Chapter`,
    },
  });
  //   }

  console.log(`Chapter ID: ${chapter.id}`);

  let rubricCount = 0;

  // 3️⃣ Process CSV Lines
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const cols = splitCsv(line);

    if (cols.length < 1) continue;

    const rawRubric = cols[0]?.trim();
    const rawRemedyList = cols[1]?.trim();
    const meaning = cols[2]?.trim();

    if (!rawRubric) continue;

    let rubricName = rawRubric;

    if (rubricName.endsWith(":")) {
      rubricName = rubricName.slice(0, -1).trim();
    }

    // Remove unwanted prefix if needed
    rubricName = rubricName
      .replace("Homeosetu Repertory to Keynotes;", "")
      .trim();

    // 4️⃣ Upsert Rubric (avoid duplicates)
    let rubric;
    // rubric = await prisma.rubric.findFirst({
    //   where: {
    //     chapterId: chapter.id,
    //     name: rubricName,
    //   },
    // });

    // if (!rubric) {
    rubric = await prisma.rubric.create({
      data: {
        chapterId: chapter.id,
        name: rubricName,
        meaning: null,
      },
    });
    // }

    // 5️⃣ Parse Meaning Column (Bracket Descriptions)
    if (meaning) {
      const remedyRegex = /\[(.*?)\]/g;
      let match;

      while ((match = remedyRegex.exec(meaning)) !== null) {
        const inside = match[1].trim();

        const parts = inside.split(/,(.+)/); // split only first comma
        if (parts.length >= 2) {
          const firstPart = parts[0].trim();
          let description = parts[1].trim();

          if (description.startsWith("-")) {
            description = description.substring(1).trim();
          }

          const gradeMatch = firstPart.match(/^(\d+)?(.+)$/);

          if (gradeMatch) {
            const gradeStr = gradeMatch[1];
            const abbrRaw = gradeMatch[2].replace(".", "").trim();

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

    // 6️⃣ Fallback: If no meaning but simple remedy list exists
    else if (rawRemedyList) {
      const remedies = rawRemedyList
        .split(",")
        .map((r) => r.replace(".", "").trim())
        .filter(Boolean);

      for (const abbr of remedies) {
        await prisma.remedy.create({
          data: {
            rubricId: rubric.id,
            abbr: abbr,
            grade: 1,
            fullForm: abbr,
            description: null,
          },
        });
      }
    }

    rubricCount++;

    if (rubricCount % 50 === 0) {
      console.log(`Processed ${rubricCount} rubrics...`);
    }
  }

  console.log(`Seeding finished. Total rubrics: ${rubricCount}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
