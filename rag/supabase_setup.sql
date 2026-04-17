-- 1. Enable the pgvector extension to work with embeddings
create extension if not exists vector;

-- 2. Create the medical_documents table
-- Using a specific name to avoid conflicts with other tables
create table if not exists medical_documents (
  id uuid primary key default gen_random_uuid(),
  content text,
  metadata jsonb,
  embedding vector(768) -- 768 for Gemini text-embedding-004
);

-- 3. Create a function to search for medical documents
create or replace function match_medical_documents (
  query_embedding vector(768),
  match_threshold float,
  match_count int
)
returns table (
  id uuid,
  content text,
  metadata jsonb,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    medical_documents.id,
    medical_documents.content,
    medical_documents.metadata,
    1 - (medical_documents.embedding <=> query_embedding) as similarity
  from medical_documents
  where 1 - (medical_documents.embedding <=> query_embedding) > match_threshold
  order by similarity desc
  limit match_count;
end;
$$;
