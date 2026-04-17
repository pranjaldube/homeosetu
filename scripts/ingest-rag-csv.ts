import { createClient } from "@supabase/supabase-js";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { VertexAIEmbeddings } from "@langchain/google-vertexai";
import { Document } from "@langchain/core/documents";
import * as path from "path";
import * as fs from "fs";

// Load environment variables logic
const envPath = path.join(process.cwd(), ".env");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const [key, ...valueParts] = line.split("=");
    if (key && valueParts.length > 0) {
      const value = valueParts.join("=").trim().replace(/^["']|["']$/g, "");
      process.env[key.trim()] = value;
    }
  });
}

const keyPath = path.join(process.cwd(), "config", "service-account-vertex.json");
if (fs.existsSync(keyPath)) {
  process.env.GOOGLE_APPLICATION_CREDENTIALS = keyPath;
  console.log(`Using vertex key from: ${keyPath}`);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_KEY. Check your .env file");
  process.exit(1);
}

const client = createClient(supabaseUrl, supabaseKey);

// Better CSV Splitter that handles quotes
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

// Extract remedy name from header e.g. "Symptoms_of Aconite_napellus_from_Allens_Keynotes"
function extractRemedy(header: string): string | null {
  // Try to find names like "Aconite", "Aconite_napellus", etc.
  // Usually between "of " and " from" or just a known list.
  // For now, looking for underscores or known remedies.
  if (header.includes("Aconite_Napellus") || header.includes("Aconite_napellus")) return "Aconite Napellus";
  
  // Generic extraction attempt
  const match = header.match(/of\s+([A-Z][a-z]+(_[a-z]+)?)\s+from/i);
  if (match) return match[1].replace(/_/g, " ");
  
  return null;
}

// Clean category from header e.g. "Symptoms_of Aconite_napellus_from_Allens_Keynotes" -> "Symptoms"
function cleanCategory(header: string): string {
  if (header.includes("Symptoms")) return "Symptoms";
  if (header.includes("Systems of the body")) return "Systems Affected";
  if (header.includes("Sphere_of_action")) return "Sphere of Action";
  if (header.includes("Modality") || header.includes("Worse") || header.includes("Better")) return "Modalities";
  if (header.includes("Relationship")) return "Relationship";
  if (header.includes("Clinical_Conditions")) return "Clinical Conditions";
  
  // Fallback to the header itself but cleaned
  return header.split("_")[0] || header;
}

async function main() {
  const ragDir = path.join(process.cwd(), "rag");
  const files = fs.readdirSync(ragDir).filter(f => f.endsWith(".csv"));

  const allDocs: Document[] = [];
  const embeddings = new VertexAIEmbeddings({
    model: "text-embedding-004",
  });

  for (const file of files) {
    const filePath = path.join(ragDir, file);
    console.log(`Processing ${file}...`);
    const content = fs.readFileSync(filePath, "utf-8");
    const lines = content.split(/\r?\n/).filter(line => line.trim().length > 0);

    if (lines.length === 0) continue;

    // First row is categories/headers
    const headers = splitCsv(lines[0]);
    
    // Rows 2 to end are data
    for (let i = 1; i < lines.length; i++) {
        const cols = splitCsv(lines[i]);
        for (let j = 0; j < headers.length; j++) {
            const cellValue = cols[j]?.trim();
            if (!cellValue) continue;

            const remedy = extractRemedy(headers[j]) || "General Homeopathic Knowledge";
            const category = cleanCategory(headers[j]);

            const pageContent = `Symptom/Detail: ${cellValue}\nCategory: ${category}\nRemedy: ${remedy}`;
            
            allDocs.push(new Document({
                pageContent,
                metadata: {
                    source: file,
                    category: category,
                    remedy: remedy,
                    type: "medical_rag"
                }
            }));
        }
    }
  }

  console.log(`Prepared ${allDocs.length} documents for ingestion.`);

  if (allDocs.length === 0) {
    console.log("No data found to ingest.");
    return;
  }

  console.log("Storing documents in Supabase Vector store...");

  try {
    // We ingest in batches to avoid timeouts/limits
    const batchSize = 50;
    for (let i = 0; i < allDocs.length; i += batchSize) {
        const batch = allDocs.slice(i, i + batchSize);
        await SupabaseVectorStore.fromDocuments(batch, embeddings, {
            client,
            tableName: "medical_documents",
            queryName: "match_medical_documents",
        });
        console.log(`Ingested batch ${Math.floor(i / batchSize) + 1} of ${Math.ceil(allDocs.length / batchSize)}`);
    }
    console.log("Successfully ingested all documents into Supabase!");
  } catch (err: any) {
    console.error("Failed to ingest documents:", err.message || err);
  }
}

main().catch(console.error);
