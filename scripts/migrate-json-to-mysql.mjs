import mysql from "mysql2/promise";
import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const EXPORT_DIR = join(__dirname, "..", "mongo-export");

const dbConfig = {
  host: process.env.MYSQL_HOST || "127.0.0.1",
  port: parseInt(process.env.MYSQL_PORT || "3306"),
  user: process.env.MYSQL_USER || "admin",
  password: process.env.MYSQL_PASSWORD || "admin123",
  database: process.env.MYSQL_DATABASE || "myapp",
};

async function runMigration() {
  console.log("⏳ Connecting to MySQL database...");
  const connection = await mysql.createConnection(dbConfig);
  console.log("✅ Connected to MySQL.");

  try {
    console.log("⏳ Initializing MySQL tables if not exist...");
    // 1. Create admin_users
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS admin_users (
        _id VARCHAR(50) PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        passwordHash VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'admin',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // 2. Create cta_settings
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS cta_settings (
        _id VARCHAR(50) PRIMARY KEY,
        heading VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        buttonText VARCHAR(255) NOT NULL,
        buttonLink VARCHAR(255) NOT NULL,
        backgroundColor VARCHAR(100) DEFAULT 'bg-[#24342b]',
        status VARCHAR(20) DEFAULT 'active',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // 3. Create documents
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS documents (
        _id VARCHAR(50) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        priorityNumber INT DEFAULT 0,
        countrySpecificNote VARCHAR(255) DEFAULT '',
        status VARCHAR(20) DEFAULT 'active',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // 4. Create requirements
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS requirements (
        _id VARCHAR(50) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        icon VARCHAR(100) NOT NULL,
        countries JSON NOT NULL,
        shortDescription VARCHAR(255) NOT NULL,
        roles JSON,
        eligibilityRequirements JSON,
        status VARCHAR(20) DEFAULT 'active',
        orderNumber INT DEFAULT 0,
        details TEXT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log("✅ MySQL tables initialized/verified.");

    // Helper to read JSON and parse
    const loadJson = (filename) => {
      const filePath = join(EXPORT_DIR, filename);
      if (!existsSync(filePath)) {
        console.warn(`⚠️ Warning: ${filename} does not exist. Skipping.`);
        return null;
      }
      return JSON.parse(readFileSync(filePath, "utf-8"));
    };

    // 1. Migrate Admin Users
    const adminUsers = loadJson("adminusers.json");
    if (adminUsers && adminUsers.length > 0) {
      console.log(`📦 Migrating ${adminUsers.length} admin user(s)...`);
      for (const user of adminUsers) {
        const createdAt = user.createdAt ? new Date(user.createdAt) : new Date();
        const updatedAt = user.updatedAt ? new Date(user.updatedAt) : new Date();
        await connection.execute(
          `INSERT INTO admin_users (_id, email, passwordHash, role, createdAt, updatedAt)
           VALUES (?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE passwordHash = VALUES(passwordHash), role = VALUES(role), updatedAt = VALUES(updatedAt)`,
          [user._id, user.email, user.passwordHash, user.role || "admin", createdAt, updatedAt]
        );
      }
      console.log("  ✅ Admin users migrated.");
    }

    // 2. Migrate CTA Settings
    const ctaSettings = loadJson("ctasettings.json");
    if (ctaSettings && ctaSettings.length > 0) {
      console.log(`📦 Migrating ${ctaSettings.length} CTA setting(s)...`);
      for (const cta of ctaSettings) {
        const createdAt = cta.createdAt ? new Date(cta.createdAt) : new Date();
        const updatedAt = cta.updatedAt ? new Date(cta.updatedAt) : new Date();
        await connection.execute(
          `INSERT INTO cta_settings (_id, heading, description, buttonText, buttonLink, backgroundColor, status, createdAt, updatedAt)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE heading = VALUES(heading), description = VALUES(description), buttonText = VALUES(buttonText), buttonLink = VALUES(buttonLink), backgroundColor = VALUES(backgroundColor), status = VALUES(status), updatedAt = VALUES(updatedAt)`,
          [
            cta._id,
            cta.heading,
            cta.description,
            cta.buttonText,
            cta.buttonLink,
            cta.backgroundColor || "bg-[#24342b]",
            cta.status || "active",
            createdAt,
            updatedAt
          ]
        );
      }
      console.log("  ✅ CTA settings migrated.");
    }

    // 3. Migrate Documents
    const documents = loadJson("documents.json");
    if (documents && documents.length > 0) {
      console.log(`📦 Migrating ${documents.length} document(s)...`);
      for (const doc of documents) {
        const createdAt = doc.createdAt ? new Date(doc.createdAt) : new Date();
        const updatedAt = doc.updatedAt ? new Date(doc.updatedAt) : new Date();
        await connection.execute(
          `INSERT INTO documents (_id, title, description, priorityNumber, countrySpecificNote, status, createdAt, updatedAt)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE title = VALUES(title), description = VALUES(description), priorityNumber = VALUES(priorityNumber), countrySpecificNote = VALUES(countrySpecificNote), status = VALUES(status), updatedAt = VALUES(updatedAt)`,
          [
            doc._id,
            doc.title,
            doc.description,
            doc.priorityNumber || 0,
            doc.countrySpecificNote || "",
            doc.status || "active",
            createdAt,
            updatedAt
          ]
        );
      }
      console.log("  ✅ Documents migrated.");
    }

    // 4. Migrate Requirements
    const requirements = loadJson("requirements.json");
    if (requirements && requirements.length > 0) {
      console.log(`📦 Migrating ${requirements.length} requirement(s)...`);
      for (const req of requirements) {
        const countries = JSON.stringify(req.countries || []);
        const roles = JSON.stringify(req.roles || []);
        const eligibilityRequirements = JSON.stringify(req.eligibilityRequirements || []);
        const createdAt = req.createdAt ? new Date(req.createdAt) : new Date();
        const updatedAt = req.updatedAt ? new Date(req.updatedAt) : new Date();

        await connection.execute(
          `INSERT INTO requirements (_id, title, icon, countries, shortDescription, roles, eligibilityRequirements, status, orderNumber, details, createdAt, updatedAt)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE title = VALUES(title), icon = VALUES(icon), countries = VALUES(countries), shortDescription = VALUES(shortDescription), roles = VALUES(roles), eligibilityRequirements = VALUES(eligibilityRequirements), status = VALUES(status), orderNumber = VALUES(orderNumber), details = VALUES(details), updatedAt = VALUES(updatedAt)`,
          [
            req._id,
            req.title,
            req.icon,
            countries,
            req.shortDescription,
            roles,
            eligibilityRequirements,
            req.status || "active",
            req.orderNumber || 0,
            req.details || "",
            createdAt,
            updatedAt
          ]
        );
      }
      console.log("  ✅ Requirements migrated.");
    }

    console.log("\n🎉 Migration completed successfully!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  } finally {
    await connection.end();
    console.log("🔌 Connection closed.");
  }
}

runMigration();
