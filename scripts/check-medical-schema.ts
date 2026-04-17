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
    console.log("Checking 'medical_documents' table...");
    const { data, error } = await client.from("medical_documents").select("*").limit(1);
    if (error) {
        console.error("Error fetching from medical_documents:", error);
    } else {
        console.log("Columns in 'medical_documents':", data.length > 0 ? Object.keys(data[0]) : "Table is empty or no rows to determine columns");
        if (data.length === 0) {
            // Try to figure out columns even if empty by trying to select them
            const { error: colError } = await client.from("medical_documents").select("embedding").limit(0);
            if (colError) {
                console.error("Column 'embedding' does NOT exist in 'medical_documents'");
            } else {
                console.log("Column 'embedding' exists in 'medical_documents'");
            }
        }
    }

    console.log("\nChecking 'documents' table...");
    const { data: dData, error: dError } = await client.from("documents").select("*").limit(1);
    if (dError) {
        console.error("Error fetching from documents:", dError);
    } else {
        console.log("Columns in 'documents':", dData.length > 0 ? Object.keys(dData[0]) : "Table is empty");
    }
}

checkSchema().catch(console.error);
