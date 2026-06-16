import { query } from "@/lib/mysql";
import crypto from "crypto";

export interface ICtaSetting {
  _id: string;
  heading: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundColor: string;
  status: "active" | "inactive";
  createdAt?: Date;
  updatedAt?: Date;
}

export const CtaSetting = {
  async findOne(filter?: any) {
    const rows = await query("SELECT * FROM cta_settings ORDER BY createdAt DESC LIMIT 1");
    return rows[0] || null;
  },

  async findByIdAndUpdate(id: string, data: any, options?: { new?: boolean }) {
    await query(
      `UPDATE cta_settings 
       SET heading = ?, description = ?, buttonText = ?, buttonLink = ?, backgroundColor = ?, status = ?
       WHERE _id = ?`,
      [
        data.heading,
        data.description,
        data.buttonText,
        data.buttonLink,
        data.backgroundColor || "bg-[#24342b]",
        data.status || "active",
        id
      ]
    );
    const rows = await query("SELECT * FROM cta_settings WHERE _id = ? LIMIT 1", [id]);
    return rows[0] || null;
  },

  async create(data: any) {
    const _id = crypto.randomUUID();
    await query(
      `INSERT INTO cta_settings (_id, heading, description, buttonText, buttonLink, backgroundColor, status)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        _id,
        data.heading,
        data.description,
        data.buttonText,
        data.buttonLink,
        data.backgroundColor || "bg-[#24342b]",
        data.status || "active"
      ]
    );
    return { ...data, _id };
  }
};

export default CtaSetting;
