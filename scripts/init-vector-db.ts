import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Initializing Vector Database for Medical Documents...");

  try {
    // 1. Enable pgvector extension
    console.log("Step 1: Enabling pgvector extension...");
    await prisma.$executeRawUnsafe(`CREATE EXTENSION IF NOT EXISTS vector;`);

    // 2. Create the table
    console.log("Step 2: Creating 'medical_documents' table...");
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS medical_documents (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        content text,
        metadata jsonb,
        embedding vector(768)
      );
    `);

    console.log("Step 2.1: Disabling RLS...");
    await prisma.$executeRawUnsafe(`ALTER TABLE medical_documents DISABLE ROW LEVEL SECURITY;`);

    console.log("Step 2.2: Granting permissions...");
    await prisma.$executeRawUnsafe(`GRANT ALL ON TABLE medical_documents TO postgres, anon, authenticated, service_role;`);

    // 3. Create the RPC function
    console.log("Step 3: Creating 'match_medical_documents' RPC function...");
    await prisma.$executeRawUnsafe(`
      CREATE OR REPLACE FUNCTION match_medical_documents (
        query_embedding vector(768),
        match_threshold float,
        match_count int
      )
      RETURNS TABLE (
        id uuid,
        content text,
        metadata jsonb,
        similarity float
      )
      LANGUAGE plpgsql
      AS $$
      BEGIN
        RETURN QUERY
        SELECT
          medical_documents.id,
          medical_documents.content,
          medical_documents.metadata,
          1 - (medical_documents.embedding <=> query_embedding) AS similarity
        FROM medical_documents
        WHERE 1 - (medical_documents.embedding <=> query_embedding) > match_threshold
        ORDER BY medical_documents.embedding <=> query_embedding
        LIMIT match_count;
      END;
      $$;
    `);

    console.log("✅ Vector database initialized successfully!");
  } catch (error) {
    console.error("❌ Error initializing vector database:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
