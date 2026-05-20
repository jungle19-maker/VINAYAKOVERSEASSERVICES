/**
 * VOS — Local MongoDB → Atlas Migration Script
 * Reads ALL collections from local DB and uploads to Atlas.
 *
 * Run with: node scripts/migrate-to-atlas.mjs
 */

import { MongoClient } from "mongodb";

const LOCAL_URI  = "mongodb://localhost:27017/vos-requirements";
const ATLAS_URI  = "mongodb+srv://junglecartoon19_db_user:swap@40123@cluster0.mongodb.net/vos?retryWrites=true&w=majority";

// Target database name on Atlas
const ATLAS_DB_NAME = "vos";

async function migrate() {
  const localClient = new MongoClient(LOCAL_URI);
  const atlasClient = new MongoClient(ATLAS_URI);

  try {
    // ── Connect ──────────────────────────────────────────
    console.log("⏳ Connecting to Local MongoDB...");
    await localClient.connect();
    console.log("✅ Local MongoDB connected.\n");

    console.log("⏳ Connecting to MongoDB Atlas...");
    await atlasClient.connect();
    console.log("✅ Atlas connected.\n");

    const localDb = localClient.db(); // uses the db in the URI (vos-requirements)
    const atlasDb = atlasClient.db(ATLAS_DB_NAME);

    // ── Get all collection names from local ──────────────
    const collections = await localDb.listCollections().toArray();

    if (collections.length === 0) {
      console.log("⚠️  No collections found in local database. Nothing to migrate.");
      return;
    }

    console.log(`📦 Found ${collections.length} collection(s) to migrate:\n`);

    // ── Migrate each collection ──────────────────────────
    for (const collMeta of collections) {
      const collName = collMeta.name;
      console.log(`🔄 Migrating collection: "${collName}"...`);

      const localColl = localDb.collection(collName);
      const atlasColl = atlasDb.collection(collName);

      const documents = await localColl.find({}).toArray();

      if (documents.length === 0) {
        console.log(`   ⏭️  Empty collection, skipping.\n`);
        continue;
      }

      let inserted = 0;
      let skipped = 0;

      for (const doc of documents) {
        // Try to avoid duplicates by checking _id
        const exists = await atlasColl.findOne({ _id: doc._id });
        if (!exists) {
          await atlasColl.insertOne(doc);
          inserted++;
        } else {
          skipped++;
        }
      }

      console.log(`   ✅ ${inserted} inserted, ${skipped} skipped (already exist).\n`);
    }

    console.log("🎉 Migration complete! All local data has been uploaded to MongoDB Atlas.");

  } catch (err) {
    console.error("\n❌ Migration failed:", err.message);
    console.error("\nCommon causes:");
    console.error("  • Atlas URI is wrong — get the exact connection string from cloud.mongodb.com");
    console.error("  • Your IP is not whitelisted in Atlas Network Access (add 0.0.0.0/0 for all IPs)");
    console.error("  • Local MongoDB is not running — start it with: net start MongoDB");
    process.exit(1);
  } finally {
    await localClient.close();
    await atlasClient.close();
    console.log("\n🔌 Both connections closed.");
  }
}

migrate();
