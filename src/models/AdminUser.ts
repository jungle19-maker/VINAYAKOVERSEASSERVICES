import { query } from "@/lib/mysql";
import crypto from "crypto";

export interface IAdminUser {
  _id: string;
  email: string;
  passwordHash: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const AdminUser = {
  async countDocuments() {
    const rows = await query("SELECT COUNT(*) as count FROM admin_users");
    return rows[0]?.count || 0;
  },

  async findOne(filter: { email?: string }) {
    if (!filter.email) return null;
    const rows = await query("SELECT * FROM admin_users WHERE email = ? LIMIT 1", [filter.email]);
    return rows[0] || null;
  },

  async create(data: { email: string; passwordHash: string; role?: string }) {
    const _id = crypto.randomUUID();
    const role = data.role || "admin";
    await query(
      "INSERT INTO admin_users (_id, email, passwordHash, role) VALUES (?, ?, ?, ?)",
      [_id, data.email, data.passwordHash, role]
    );
    return { _id, email: data.email, passwordHash: data.passwordHash, role };
  }
};

export default AdminUser;
