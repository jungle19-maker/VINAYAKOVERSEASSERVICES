import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import Requirement from "@/models/Requirement";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectToDatabase();
    const data = await request.json();
    const requirement = await Requirement.findByIdAndUpdate(id, data, { new: true });
    
    if (!requirement) {
      return NextResponse.json({ message: "Requirement not found" }, { status: 404 });
    }

    return NextResponse.json(requirement);
  } catch (error) {
    return NextResponse.json({ message: "Failed to update requirement" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectToDatabase();
    const requirement = await Requirement.findByIdAndDelete(id);

    if (!requirement) {
      return NextResponse.json({ message: "Requirement not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Requirement deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete requirement" }, { status: 500 });
  }
}
