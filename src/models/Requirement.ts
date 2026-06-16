import { query } from "@/lib/mysql";
import crypto from "crypto";

export interface IRequirement {
  _id: string;
  title: string;
  icon: string;
  countries: string[];
  shortDescription: string;
  roles: string[];
  eligibilityRequirements: string[];
  status: "active" | "inactive";
  orderNumber: number;
  details: string;
  createdAt?: Date;
  updatedAt?: Date;
}

function parseJsonField(field: any) {
  if (typeof field === "string") {
    try {
      return JSON.parse(field);
    } catch {
      return [];
    }
  }
  return field || [];
}

export const Requirement = {
  async find() {
    const rows = await query("SELECT * FROM requirements ORDER BY orderNumber ASC, createdAt DESC");
    return rows.map((row: any) => ({
      ...row,
      countries: parseJsonField(row.countries),
      roles: parseJsonField(row.roles),
      eligibilityRequirements: parseJsonField(row.eligibilityRequirements),
    }));
  },

  async findOne(filter: { title?: string } = {}) {
    let rows;
    if (filter.title) {
      rows = await query("SELECT * FROM requirements WHERE title = ? LIMIT 1", [filter.title]);
    } else {
      rows = await query("SELECT * FROM requirements LIMIT 1");
    }
    if (rows.length === 0) return null;
    const row = rows[0];
    return {
      ...row,
      countries: parseJsonField(row.countries),
      roles: parseJsonField(row.roles),
      eligibilityRequirements: parseJsonField(row.eligibilityRequirements),
    };
  },

  async create(data: any) {
    const _id = data._id || crypto.randomUUID();
    const countries = JSON.stringify(data.countries || []);
    const roles = JSON.stringify(data.roles || []);
    const eligibilityRequirements = JSON.stringify(data.eligibilityRequirements || []);
    
    await query(
      `INSERT INTO requirements (_id, title, icon, countries, shortDescription, roles, eligibilityRequirements, status, orderNumber, details) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        _id,
        data.title,
        data.icon,
        countries,
        data.shortDescription,
        roles,
        eligibilityRequirements,
        data.status || "active",
        data.orderNumber || 0,
        data.details || ""
      ]
    );

    return { ...data, _id };
  },

  async findByIdAndUpdate(id: string, data: any, options?: { new?: boolean }) {
    const countries = JSON.stringify(data.countries || []);
    const roles = JSON.stringify(data.roles || []);
    const eligibilityRequirements = JSON.stringify(data.eligibilityRequirements || []);

    await query(
      `UPDATE requirements 
       SET title = ?, icon = ?, countries = ?, shortDescription = ?, roles = ?, eligibilityRequirements = ?, status = ?, orderNumber = ?, details = ?
       WHERE _id = ?`,
      [
        data.title,
        data.icon,
        countries,
        data.shortDescription,
        roles,
        eligibilityRequirements,
        data.status,
        data.orderNumber,
        data.details,
        id
      ]
    );

    const rows = await query("SELECT * FROM requirements WHERE _id = ? LIMIT 1", [id]);
    if (rows.length === 0) return null;
    const row = rows[0];
    return {
      ...row,
      countries: parseJsonField(row.countries),
      roles: parseJsonField(row.roles),
      eligibilityRequirements: parseJsonField(row.eligibilityRequirements),
    };
  },

  async findByIdAndDelete(id: string) {
    const rows = await query("SELECT * FROM requirements WHERE _id = ? LIMIT 1", [id]);
    if (rows.length === 0) return null;
    await query("DELETE FROM requirements WHERE _id = ?", [id]);
    const row = rows[0];
    return {
      ...row,
      countries: parseJsonField(row.countries),
      roles: parseJsonField(row.roles),
      eligibilityRequirements: parseJsonField(row.eligibilityRequirements),
    };
  },

  async updateOne(filter: { title: string }, update: { $set: any }) {
    const data = update.$set;
    
    // Fetch original or just build set statement
    const existingRows = await query("SELECT * FROM requirements WHERE title = ? LIMIT 1", [filter.title]);
    if (existingRows.length === 0) return;
    const existing = existingRows[0];

    const icon = data.icon !== undefined ? data.icon : existing.icon;
    const countries = data.countries !== undefined ? JSON.stringify(data.countries) : existing.countries;
    const shortDescription = data.shortDescription !== undefined ? data.shortDescription : existing.shortDescription;
    const roles = data.roles !== undefined ? JSON.stringify(data.roles) : existing.roles;
    const eligibilityRequirements = data.eligibilityRequirements !== undefined ? JSON.stringify(data.eligibilityRequirements) : existing.eligibilityRequirements;
    const status = data.status !== undefined ? data.status : existing.status;
    const orderNumber = data.orderNumber !== undefined ? data.orderNumber : existing.orderNumber;
    const details = data.details !== undefined ? data.details : existing.details;

    await query(
      `UPDATE requirements 
       SET icon = ?, countries = ?, shortDescription = ?, roles = ?, eligibilityRequirements = ?, status = ?, orderNumber = ?, details = ?
       WHERE title = ?`,
      [
        icon,
        countries,
        shortDescription,
        roles,
        eligibilityRequirements,
        status,
        orderNumber,
        details,
        filter.title
      ]
    );
  }
};

export default Requirement;
