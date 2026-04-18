import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const chapterId = "224bfbec-220a-4556-a916-b79308188301";

  console.log(`Attempting to delete chapter with ID: ${chapterId}`);

  try {
    const chapter = await prisma.content.findUnique({
      where: { id: chapterId },
    });

    if (!chapter) {
      console.error(`Chapter with ID ${chapterId} not found.`);
      process.exit(1);
    }

    const deletedChapter = await prisma.content.delete({
      where: { id: chapterId },
    });

    console.log(
      `Successfully deleted chapter '${deletedChapter.name}' and all related rubrics and remedies.`,
    );
  } catch (error) {
    console.error("Error deleting chapter:", error);
    process.exit(1);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
