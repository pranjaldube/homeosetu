import { createClient } from "@supabase/supabase-js";
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

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const client = createClient(supabaseUrl, supabaseKey);

async function listTables() {
    const { data, error } = await client.rpc("get_tables"); // If such function exists
    // Fallback: use a raw query if possible, but Supabase client doesn't support raw SQL easily via client.
    // However, we can try to select from information_schema if enabled.
    
    // Better: just try common table names.
    const tables = ["documents", "embeddings", "rag_docs", "medical_docs"];
    for (const table of tables) {
        const { data, error } = await client.from(table).select("*").limit(1);
        if (!error) {
            console.log(`Table '${table}' exists. Columns:`, data.length > 0 ? Object.keys(data[0]) : "Empty");
        } else {
            console.log(`Table '${table}' does not exist or error:`, error.message);
        }
    }
}

listTables().catch(console.error);
