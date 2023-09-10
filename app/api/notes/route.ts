import connectDB from "@/mongodb/connect";
import User from "@/mongodb/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Post from "@/mongodb/models/PostModel";
import Category from "@/mongodb/models/CategoryModel";
import { formatDistance } from "date-fns";
import { cookies } from "next/headers";

// export async function PUT(req: NextRequest, { params }: any) {
//   const { id } = params;
//   const { newFirstName: firstName, newLastName: lastName } = await req.json();
//   await connectDB();
//   await User.findByIdAndUpdate(id, { firstName, lastName });
//   return NextResponse.json({ message: "User Updated" }, { status: 200 });
// }
export async function DELETE(req: NextRequest) {
  try {
    const url = req.nextUrl;

    const userId = await cookies().get("user")?.value;
    const postId = url.searchParams.get("postId");

    // const { userId, postId } = params;
    if (!userId) {
      return NextResponse.json({ error: "User is not find" }, { status: 401 });
    }
    await connectDB();
    const user = await User.updateOne(
      { _id: userId },
      {
        $pull: { notes: { $in: [postId] } },
      }
    );

    return NextResponse.json(
      { data: postId, message: "Post remove from notes" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Nodes is not add" }, { status: 401 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const url = req.nextUrl;
    const userId = await cookies().get("user")?.value;
    const postId = url.searchParams.get("postId");

    if (!userId) {
      return NextResponse.json({ error: "User is not find" }, { status: 401 });
    }
    await connectDB();
    const user = await User.updateOne(
      { _id: userId },
      {
        $push: { notes: postId },
      }
    );
    return NextResponse.json(
      { data: postId, message: "Post add to notes" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Post is not find" }, { status: 401 });
  }
}
export async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl;
    const userId = await cookies().get("user")?.value;
    const postId = url.searchParams.get("postId");

    if (!userId) {
      return NextResponse.json({ error: "User is not find" }, { status: 401 });
    }
    await connectDB();
    const user = await User.findById(userId);
    return NextResponse.json(
      { data: user?.notes, message: "Post add to notes" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Post is not find" }, { status: 401 });
  }
}
//   // Compare the provided password with the hashed password in the database
//   const isPasswordValid = await bcrypt.compare(password, user.password);

//   if (!isPasswordValid) {
//     return NextResponse.json(
//       { error: "Invalid credentials without password" },
//       { status: 401 }
//     );
//   }

//   // Password is valid, you can create a session or JWT token for authentication
//   // For this example, I'll just return a success response
//   return NextResponse.json(
//     { user, message: "Login successful" },
//     { status: 200 }
//   );
// }
