import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import AdminUser from "@/models/AdminUser";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    
    // Only allow if no admins exist
    const count = await AdminUser.countDocuments();
    if (count > 0) {
      return NextResponse.json({ message: "Admin already exists" }, { status: 400 });
    }

    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ message: "Email and password required" }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await AdminUser.create({ email, passwordHash, role: "admin" });

    return NextResponse.json({ message: "Admin created", email: user.email });
  } catch (error) {
    return NextResponse.json({ message: "Error setting up admin" }, { status: 500 });
  }
}
