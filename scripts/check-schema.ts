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

async function checkSchema() {
    // Try to get one row to see columns
    const { data, error } = await client.from("documents").select("*").limit(1);
    if (error) {
        console.error("Error fetching from documents:", error);
    } else {
        console.log("Columns in 'documents':", data.length > 0 ? Object.keys(data[0]) : "Table is empty");
    }
}

checkSchema().catch(console.error);
