import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || "127.0.0.1",
  port: parseInt(process.env.MYSQL_PORT || "3306"),
  user: process.env.MYSQL_USER || "admin",
  password: process.env.MYSQL_PASSWORD || "admin123",
  database: process.env.MYSQL_DATABASE || "myapp",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

let initialized = false;

export async function query<T = any>(sql: string, params?: any[]): Promise<T> {
  if (!initialized) {
    await initDatabase();
  }
  const [results] = await pool.execute(sql, params);
  return results as T;
}

export async function initDatabase() {
  if (initialized) return;
  initialized = true;

  try {
    // 1. Create admin_users
    await pool.execute(`
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
    await pool.execute(`
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
    await pool.execute(`
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
    await pool.execute(`
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
    console.log("MySQL database tables initialized/verified successfully.");
  } catch (error) {
    console.error("Failed to initialize MySQL database tables:", error);
    initialized = false; // allow retry on next query attempt
    throw error;
  }
}

export default pool;
