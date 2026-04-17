import { NextRequest, NextResponse } from "next/server";
import { ChatVertexAI } from "@langchain/google-vertexai";
import { VertexAIEmbeddings } from "@langchain/google-vertexai";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { createClient } from "@supabase/supabase-js";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import * as path from "path";
import * as fs from "fs";

// First try to load from GOOGLE_VERTEX_CREDENTIALS
let vertexCredentials: any = null;
if (process.env.NEXT_PUBLIC_GOOGLE_VERTEX_JSON) {
  try {
    vertexCredentials = JSON.parse(process.env.NEXT_PUBLIC_GOOGLE_VERTEX_JSON);
  } catch (error) {
    console.error("Failed to parse GOOGLE_VERTEX_CREDENTIALS", error);
  }
}

// Fallback to file-based credentials if no string provided
if (!vertexCredentials) {
  const keyPath = path.join(
    process.cwd(),
    "config",
    "service-account-vertex.json",
  );
  if (fs.existsSync(keyPath)) {
    process.env.GOOGLE_APPLICATION_CREDENTIALS = keyPath;
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "";

let supabaseClient: any = null;
if (supabaseUrl && supabaseKey) {
  supabaseClient = createClient(supabaseUrl, supabaseKey);
}

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 },
      );
    }

    if (!supabaseClient) {
      return NextResponse.json(
        { error: "Supabase not configured" },
        { status: 500 },
      );
    }

    // 1. Initialize Vector Store and Model
    const embeddings = new VertexAIEmbeddings({
      model: "text-embedding-004",
      ...(vertexCredentials && {
        authOptions: {
          credentials: vertexCredentials,
          projectId: vertexCredentials.project_id,
        },
      }),
    });

    const vectorStore = new SupabaseVectorStore(embeddings, {
      client: supabaseClient,
      tableName: "medical_documents",
      queryName: "match_medical_documents",
    });

    const chatModel = new ChatVertexAI({
      model: "gemini-2.5-flash",
      temperature: 0.3,
      location: "us-central1",
      ...(vertexCredentials && {
        authOptions: {
          credentials: vertexCredentials,
          projectId: vertexCredentials.project_id,
        },
      }),
    });

    // 2. Retrieve context based on the user's message
    const retriever = vectorStore.asRetriever(3); // Get top 3 relevant documents
    const relevantDocs = await retriever.invoke(message);

    const context = relevantDocs.map((doc) => doc.pageContent).join("\n\n");

    // 3. Create prompt template
    const template = `You are a helpful and knowledgeable homeopathic assistant. 
Use the following pieces of context to answer the user's question.
If you don't know the answer based on the context, just say that you don't know, don't try to make up an answer.

Context:
{context}

Question: {question}

Helpful Answer:`;

    const prompt = PromptTemplate.fromTemplate(template);

    // 4. Create and run sequence
    const chain = RunnableSequence.from([
      prompt,
      chatModel,
      new StringOutputParser(),
    ]);

    // We can stream this, but for simplicity we will invoke and return JSON.
    // If you need actual streaming, you can use Next.js AI SDK's stream streamText()
    const response = await chain.invoke({
      context,
      question: message,
    });

    return NextResponse.json({ response });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate response", details: error.message },
      { status: 500 },
    );
  }
}
