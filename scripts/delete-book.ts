import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Get book ID from command line arguments
  const bookId = "f5c3c6cf-2c09-4e0c-bda4-b4ae995143f5";
  console.log(`Attempting to delete book with ID: ${bookId}`);

  try {
    // Check if the book exists
    const book = await prisma.book.findUnique({
      where: { id: bookId },
    });

    if (!book) {
      console.error(`Book with ID ${bookId} not found.`);
      process.exit(1);
    }

    // Since onDelete: Cascade is configured on relationships (Book -> Content -> Rubric -> Remedy),
    // deleting the book will automatically delete all related content, chapters, rubrics, and remedies.
    const deletedBook = await prisma.book.delete({
      where: { id: bookId },
    });

    console.log(
      `Successfully deleted book '${deletedBook.bookName}' and all its related content.`,
    );
  } catch (error) {
    console.error("Error deleting book:", error);
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
