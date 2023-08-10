import connectDB from "@/mongodb/connect";
import { NextRequest, NextResponse } from "next/server";
import Post from "@/mongodb/models/PostModel";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    await connectDB();
    const post = await Post.findOneAndUpdate(
      { _id: id },
      { $inc: { views: 1 } }
    );
    if (!post) {
      return NextResponse.json({ error: "Post is not find" }, { status: 401 });
    }

    return NextResponse.json({ message: "Views is updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Views is not updated" },
      { status: 401 }
    );
  }
}
