import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import DocumentModel from "@/models/Document";

export async function GET() {
  try {
    await connectToDatabase();
    const documents = await DocumentModel.find().sort({ priorityNumber: 1, createdAt: -1 });
    return NextResponse.json(documents);
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch documents" }, { status: 500 });
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
    const document = await DocumentModel.create(data);
    
    return NextResponse.json(document, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to create document" }, { status: 500 });
  }
}
