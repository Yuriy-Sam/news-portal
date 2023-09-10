import connectDB from "@/mongodb/connect";
import User from "@/mongodb/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const userId = cookies().get("user")?.value;
  if (userId) {
    await connectDB();
    const user = await User.findById(userId);
    return NextResponse.json(
      { data: user, message: "Get User" },
      { status: 200 }
    );
  } else {
    return NextResponse.json({ error: "No User" }, { status: 400 });
  }
}
