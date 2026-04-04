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

vertexCredentials = {
  type: "service_account",
  project_id: "homeosetu-intelligence-73612",
  private_key_id: "2ea9d02c2a2b3e748cdc86e95989440c2a856966",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDiVb7n107lUv3B\n2Sg37jCmsTIiowwgq2xT8I65ad9+k3bj3Nr3MwLz1UvTwtgy0e2UyxiJYy4Fd5xR\nm0rTXvgzi/flwYoI7NyUElSn6iS6QNi3k3c61CY5Mq7NfQhnTCetFCePr5BvbQr1\nEZCSkC0qoambpqja1Kzdp2HyBqzmM/te8S0rBhQuhfZVYEqiyS6CEwzqjtUHM1L9\nVgAK3VQdmyGKpBf+qjhnrGLgG7PfyYpkslEH+sVUU3p1a/jARzNf8b4gHCRGmU2g\nLBsOZOUPA1QYqo+K7oHVLu1CidjXriDcWqNLgqohLbL7elpNsb8Zo0T1eQzxCcaR\nwRsEmJ7LAgMBAAECggEAVSqHueyKOv+WDd3dZOJjey39HAx3UUm/6vv/cKR2nUX2\n/DoMSO1whHjz3fyY5tKYkB82HehsllESSKDjMJMxWRAnmVRQ0RfzzmHxaffQlyc0\nhStft4rB0U8ReLA+O8Rrv5RwaIBbHJqO/3V7DbNj04FedXvqWOGjJIrJ78z0PXCH\nzYeYmuB7HXry/v5lu+7rkDL8705DqyBpPGvCoI1mQkcDZ+4eKW5C0q7CWlv1FUl0\nfBr49UoAG9mGMa1OcHS+t7801/2umLrt6g8hx4A85Ij/VyuSfqIiX2S1UX1l0JJn\njVWHP4VyB6vkHuBRRgHD2TTsjgo16FkkbvpzA38rNQKBgQD0z2jc3RN9o5tWLr6Q\n5ifS9xlo+Xid1KjC8h5zkVynN3uUM0H0PBsRDcwbKUdUqnKe56qLEanYGvqwhkMM\nGgmbzhb5y6v4u69bNZcbwzcseB0hDQjNSVq7kwvccJmOHbI5CinWhbxf/K4XghWK\njFC3bQXTJSAg2rRzpnPVwkKixwKBgQDsrib291KbYW2jj8gfVP2BHEGgOOkhndPq\ngrO4YgVGBYnXS8WhRp3Jywsd6fkxniaP/rxi0ONQpOcYjsBy91Bn4S/OkZD2ceKT\nL8SkdB2kW/pa+As7pNliTgsJZ++vx8iCEHRyV+fQf0KYZg3/xOslKBK3OgM1Af3D\nPXKcacQf3QKBgQCU25FdyyfQ26zWqLHDlc9dXlcbF6aaAfdkIqkViKwYGYqRQOG3\nytyCcCtN0LnI56OusBtpWKI3/5+zutAGCccR8CzUU14MbsNf6KQrg3aHGbpMoIpb\nmWEMcYtizSzx12jJej6abNNwYkrRjI3goxVpk2dZTlfM4m+bavlAX1D5fQKBgQDT\niLtOk7IDKcriGsnUJxQD5wtIdlT3NKaIvJSAQStRb/XItPJHuGOiTZT8AXg1PpJc\ntGIPN39TPm9FZaDfn+b/USZ3S2byvMqynkj0astrcMGLuJHhlu6ri/EVUQ3KX5b3\nmFlbMPIBSRxuNRhh9s/rf6tqk7D2GXeCnlLnNSiTCQKBgCf3MbER5QdUHt81vx42\n9UP4nnYYzndJarR7274RPTRFebkL4GSRh7T+Llt+eqhd5PoVKRHDW6tbDwyR8bvk\n8kcMbwP+35jlR4YXYE0X879adiMvhCh46VK6NvEvBAC1UL609TKNwk05EuhBnyNO\n8CspuTzlac2T1CavB9T7tnrE\n-----END PRIVATE KEY-----\n",
  client_email:
    "vertex-rag-sa@homeosetu-intelligence-73612.iam.gserviceaccount.com",
  client_id: "101192899855333782499",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/vertex-rag-sa%40homeosetu-intelligence-73612.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

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
      tableName: "documents",
      queryName: "match_documents",
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
