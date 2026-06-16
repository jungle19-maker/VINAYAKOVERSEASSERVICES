import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import CtaSetting from "@/models/CtaSetting";

export async function GET() {
  try {
    await connectToDatabase();
    // Assuming we only ever have one active CTA setting, or we take the first one
    const cta = await CtaSetting.findOne();
    return NextResponse.json(cta || {});
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch CTA settings" }, { status: 500 });
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
    
    // Check if one exists to update, else create
    let cta = await CtaSetting.findOne();
    if (cta) {
      cta = await CtaSetting.findByIdAndUpdate(cta._id, data, { new: true });
    } else {
      cta = await CtaSetting.create(data);
    }
    
    return NextResponse.json(cta, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to save CTA settings" }, { status: 500 });
  }
}
