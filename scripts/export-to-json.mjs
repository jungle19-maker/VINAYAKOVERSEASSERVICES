/**
 * export-to-json.mjs
 * ─────────────────────────────────────────────────────────
 * Exports every collection from local MongoDB to a JSON file
 * inside ./mongo-export/ folder.
 *
 * Then import each JSON on Atlas:
 *   cloud.mongodb.com → Browse Collections → Add Data → Import JSON
 *
 * Run:  node scripts/export-to-json.mjs
 * ─────────────────────────────────────────────────────────
 */

import { MongoClient } from "mongodb";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const LOCAL_URI = "mongodb://localhost:27017/vos-requirements";
const OUTPUT_DIR = join(__dirname, "..", "mongo-export");

async function exportToJson() {
  const client = new MongoClient(LOCAL_URI);

  try {
    console.log("⏳ Connecting to Local MongoDB...");
    await client.connect();
    console.log("✅ Connected!\n");

    // Create output folder
    mkdirSync(OUTPUT_DIR, { recursive: true });

    const db = client.db(); // uses "vos-requirements" from URI

    const collections = await db.listCollections().toArray();

    if (collections.length === 0) {
      console.log("⚠️  No collections found in local database.");
      return;
    }

    console.log(`📦 Found ${collections.length} collection(s):\n`);

    for (const { name } of collections) {
      const docs = await db.collection(name).find({}).toArray();

      // Convert ObjectId and other BSON types to plain JSON
      const jsonData = JSON.stringify(docs, (key, value) => {
        // Handle MongoDB ObjectId → plain string
        if (value && typeof value === "object" && value._bsontype === "ObjectId") {
          return value.toString();
        }
        return value;
      }, 2);

      const filePath = join(OUTPUT_DIR, `${name}.json`);
      writeFileSync(filePath, jsonData, "utf-8");

      console.log(`  ✅ "${name}" → ${docs.length} docs → mongo-export/${name}.json`);
    }

    console.log(`\n🎉 Export complete!`);
    console.log(`📁 Files saved to: ${OUTPUT_DIR}`);
    console.log(`\n─────────────────────────────────────────────────`);
    console.log(`📌 HOW TO IMPORT INTO ATLAS:`);
    console.log(`  1. Go to https://cloud.mongodb.com`);
    console.log(`  2. Click your Cluster → "Browse Collections"`);
    console.log(`  3. Click "Add Data" → "Upload File"`);
    console.log(`  4. Select a JSON file from: mongo-export/`);
    console.log(`  5. Choose database: "vos", collection: (same as filename)`);
    console.log(`  6. Repeat for each JSON file`);
    console.log(`─────────────────────────────────────────────────\n`);

  } catch (err) {
    console.error("\n❌ Export failed:", err.message);
    process.exit(1);
  } finally {
    await client.close();
    console.log("🔌 Connection closed.");
  }
}

exportToJson();
