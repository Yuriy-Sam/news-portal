import connectDB from "@/mongodb/connect";
import { NextRequest, NextResponse } from "next/server";
import Category from "@/mongodb/models/CategoryModel";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const url = req.nextUrl;

    const value = url.searchParams.get("value");
    const title = url.searchParams.get("title");
    const image = url.searchParams.get("image");

    await Category.create({ value, title, image });
    return NextResponse.json({ message: "Category Created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    // console.log("connect work");
    const categories = await Category.find({});

    return NextResponse.json(
      { categories, message: "Get categories successful" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Get categories Error" },
      { status: 500 }
    );
  }
}
