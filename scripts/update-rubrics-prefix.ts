import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Change this variable to the chapter you want to update
const CHAPTER_NAME = "Generalities";

async function main() {
  console.log(`Starting update for chapter: ${CHAPTER_NAME}...`);

  // 1. Find the chapter
  const chapter = await prisma.content.findFirst({
    where: {
      name: CHAPTER_NAME,
    },
  });

  if (!chapter) {
    console.error(`Chapter '${CHAPTER_NAME}' not found!`);
    return;
  }

  console.log(`Found Chapter '${CHAPTER_NAME}' with ID: ${chapter.id}`);

  // 2. Fetch all rubrics for this chapter
  const rubrics = await prisma.rubric.findMany({
    where: {
      chapterId: chapter.id,
    },
  });

  console.log(`Found ${rubrics.length} rubrics for this chapter. Updating...`);

  let updatedCount = 0;
  const prefix = `${CHAPTER_NAME}, `;

  // 3. Update each rubric with the prefix
  for (const rubric of rubrics) {
    // Only update if it doesn't already have the prefix
    if (!rubric.name.startsWith(prefix)) {
      const newName = `${prefix}${rubric.name}`;

      await prisma.rubric.update({
        where: { id: rubric.id },
        data: { name: newName },
      });

      updatedCount++;
      if (updatedCount % 50 === 0) {
        console.log(`Updated ${updatedCount} rubrics...`);
      }
    }
  }

  console.log(
    `Successfully updated ${updatedCount} rubrics with the prefix '${prefix}'.`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
