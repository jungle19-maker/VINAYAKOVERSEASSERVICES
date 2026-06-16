import { query } from "@/lib/mysql";
import crypto from "crypto";

export interface IDocumentModel {
  _id: string;
  title: string;
  description: string;
  priorityNumber: number;
  countrySpecificNote: string;
  status: "active" | "inactive";
  createdAt?: Date;
  updatedAt?: Date;
}

export const DocumentModel = {
  async find() {
    return await query("SELECT * FROM documents ORDER BY priorityNumber ASC, createdAt DESC");
  },

  async findOne(filter: { title?: string } = {}) {
    if (filter.title) {
      const rows = await query("SELECT * FROM documents WHERE title = ? LIMIT 1", [filter.title]);
      return rows[0] || null;
    }
    const rows = await query("SELECT * FROM documents LIMIT 1");
    return rows[0] || null;
  },

  async create(data: any) {
    const _id = crypto.randomUUID();
    await query(
      `INSERT INTO documents (_id, title, description, priorityNumber, countrySpecificNote, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        _id,
        data.title,
        data.description,
        data.priorityNumber || 0,
        data.countrySpecificNote || "",
        data.status || "active"
      ]
    );
    return { ...data, _id };
  },

  async findByIdAndUpdate(id: string, data: any, options?: { new?: boolean }) {
    await query(
      `UPDATE documents 
       SET title = ?, description = ?, priorityNumber = ?, countrySpecificNote = ?, status = ?
       WHERE _id = ?`,
      [
        data.title,
        data.description,
        data.priorityNumber,
        data.countrySpecificNote || "",
        data.status,
        id
      ]
    );
    const rows = await query("SELECT * FROM documents WHERE _id = ? LIMIT 1", [id]);
    return rows[0] || null;
  },

  async findByIdAndDelete(id: string) {
    const rows = await query("SELECT * FROM documents WHERE _id = ? LIMIT 1", [id]);
    if (rows.length === 0) return null;
    await query("DELETE FROM documents WHERE _id = ?", [id]);
    return rows[0];
  }
};

export default DocumentModel;
