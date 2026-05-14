import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import Requirement from "@/models/Requirement";

export async function GET() {
  try {
    await connectToDatabase();
    const requirements = await Requirement.find().sort({ orderNumber: 1, createdAt: -1 });
    return NextResponse.json(requirements);
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch requirements" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const data = await request.json();
    const requirement = await Requirement.create(data);
    
    return NextResponse.json(requirement, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to create requirement" }, { status: 500 });
  }
}
