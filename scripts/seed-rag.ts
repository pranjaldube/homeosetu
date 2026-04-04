import { createClient } from "@supabase/supabase-js";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { VertexAIEmbeddings } from "@langchain/google-vertexai";
import { Document } from "@langchain/core/documents";
import * as path from "path";
import * as fs from "fs";

// Load environment variables

// Assuming user will place the JSON key at config/service-account-vertex.json
const keyPath = path.join(
  process.cwd(),
  "config",
  "service-account-vertex.json",
);

// Check if credentials are set, else set it to point to the config folder json key
if (fs.existsSync(keyPath)) {
  process.env.GOOGLE_APPLICATION_CREDENTIALS = keyPath;
  console.log(`Using vertex key from: ${keyPath}`);
} else if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  console.log(
    "No GOOGLE_APPLICATION_CREDENTIALS found. Ensuring you have vertex-key.json in your config folder.",
  );
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "";

if (!supabaseUrl || !supabaseKey) {
  console.error(
    "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Check your .env file",
  );
  process.exit(1);
}

const client = createClient(supabaseUrl, supabaseKey);

const data = [
  {
    id: 1,
    remedy: "Aconite",
    relationships: ["Belladonna", "Arnica", "Chamomilla"],
    type: "acute",
    description: "Used in sudden onset conditions, fear, shock, and anxiety.",
  },
  {
    id: 2,
    remedy: "Belladonna",
    relationships: ["Aconite", "Bryonia", "Gelsemium"],
    type: "acute",
    description:
      "Used in high fever, redness, throbbing pain, and inflammation.",
  },
  {
    id: 3,
    remedy: "Arnica",
    relationships: ["Aconite", "Ruta", "Hypericum"],
    type: "injury",
    description: "Used for trauma, bruises, soreness, and muscle pain.",
  },
  {
    id: 4,
    remedy: "Bryonia",
    relationships: ["Belladonna", "Rhus tox", "Nux vomica"],
    type: "chronic",
    description:
      "Used for dryness, joint pain, and conditions aggravated by movement.",
  },
  {
    id: 5,
    remedy: "Gelsemium",
    relationships: ["Belladonna", "Aconite", "Ignatia"],
    type: "acute",
    description: "Used for weakness, drowsiness, and flu-like symptoms.",
  },
  {
    id: 6,
    remedy: "Nux vomica",
    relationships: ["Bryonia", "Pulsatilla", "Sulphur"],
    type: "digestive",
    description: "Used for indigestion, irritability, and overconsumption.",
  },
  {
    id: 7,
    remedy: "Pulsatilla",
    relationships: ["Nux vomica", "Sepia", "Silicea"],
    type: "hormonal",
    description: "Used for mood swings, hormonal imbalance, and mild symptoms.",
  },
  {
    id: 8,
    remedy: "Rhus tox",
    relationships: ["Bryonia", "Arnica", "Ruta"],
    type: "injury",
    description: "Used for stiffness, sprains, and pain relieved by movement.",
  },
  {
    id: 9,
    remedy: "Sulphur",
    relationships: ["Nux vomica", "Calcarea carb", "Lycopodium"],
    type: "chronic",
    description: "Used for skin issues, heat, and burning sensations.",
  },
  {
    id: 10,
    remedy: "Calcarea carb",
    relationships: ["Sulphur", "Lycopodium", "Silicea"],
    type: "chronic",
    description: "Used for slow metabolism, weakness, and calcium deficiency.",
  },
];

async function main() {
  console.log("Generating embeddings with Vertex AI...");

  // Instantiate Google Vertex AI Embeddings
  const embeddings = new VertexAIEmbeddings({
    model: "text-embedding-004", // Or whichever model you have access to, e.g. textembedding-gecko@003
  });

  const docs = data.map((item) => {
    // We combine the relevant data into a single string for better embed understanding
    const pageContent = `Remedy: ${item.remedy}
Type: ${item.type}
Description: ${item.description}
Relationships: ${item.relationships.join(", ")}`;

    return new Document({
      pageContent,
      metadata: { id: item.id, remedy: item.remedy, type: item.type },
    });
  });

  console.log("Storing documents in Supabase Vector store...");

  try {
    await SupabaseVectorStore.fromDocuments(docs, embeddings, {
      client,
      tableName: "documents", // Default table for LangChain's supabase integration
      queryName: "match_documents", // Default function name
    });
    console.log("Successfully ingested documents into Supabase!");
  } catch (err: any) {
    console.error("Failed to ingest documents:", err.message || err);
  }
}

main().catch(console.error);
