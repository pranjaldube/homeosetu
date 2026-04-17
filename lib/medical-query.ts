import { ChatVertexAI } from "@langchain/google-vertexai";
import { VertexAIEmbeddings } from "@langchain/google-vertexai";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { createClient } from "@supabase/supabase-js";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supabaseClient = createClient(supabaseUrl, supabaseKey);

export async function queryMedicalRag(message: string) {
  // 1. Initialize Embeddings and Store
  const embeddings = new VertexAIEmbeddings({
    model: "text-embedding-004",
  });

  const vectorStore = new SupabaseVectorStore(embeddings, {
    client: supabaseClient,
    tableName: "medical_documents",
    queryName: "match_medical_documents",
  });

  // 2. Initialize Model
  const chatModel = new ChatVertexAI({
    model: "gemini-2.5-flash", 
    temperature: 0.2,
  });

  // 3. Retrieve context
  const retriever = vectorStore.asRetriever(5); // Get more context for medical queries
  const relevantDocs = await retriever.invoke(message);

  if (relevantDocs.length === 0) {
    return {
        answer: "I couldn't find any specific remedies or categories matching those symptoms in my current database.",
        sources: []
    };
  }

  const context = relevantDocs.map((doc) => doc.pageContent).join("\n\n");

  // 4. Create prompt template specifically for Remedy and Category
  const template = `You are a professional homeopathic assistant. 
Based on the symptom or pain described by the user, provide the most relevant Remedy Name and the Category it falls under from the provided context.

Context:
{context}

User Question: {question}

Response structure:
- **Remedy**: [Name of the remedy, e.g., Aconite Napellus]
- **Category**: [The Category from the context, e.g., Symptoms, Systems Affected, etc.]
- **Details**: [Briefly mention why this matches the symptoms]

If the context does not provide a specific remedy or category, state that clearly.
Helpful Answer:`;

  const prompt = PromptTemplate.fromTemplate(template);

  const chain = RunnableSequence.from([
    prompt,
    chatModel,
    new StringOutputParser(),
  ]);

  const response = await chain.invoke({
    context,
    question: message,
  });

  return {
    answer: response,
    sources: relevantDocs.map(d => d.metadata)
  };
}
