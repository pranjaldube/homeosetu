const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    // First, let's check if categories already exist
    const existingCategories = await database.category.findMany();
    
    if (existingCategories.length > 0) {
      console.log("Categories already exist. Skipping seeding.");
      return;
    }

    // If no categories exist, proceed with creation
    const categories = [
      { name: "Category1" },
      { name: "Category2" },
      { name: "Category3" },
    ];

    for (const category of categories) {
      await database.category.create({
        data: category
      });
    }

    console.log("Categories seeded successfully");
  } catch (error) {
    console.error("Error seeding the database categories:", error);
  } finally {
    await database.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});