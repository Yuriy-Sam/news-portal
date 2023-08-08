import connectDB from "@/mongodb/connect";
import User from "@/mongodb/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Post from "@/mongodb/models/PostModel";
import Category from "@/mongodb/models/CategoryModel";
import { formatDistance } from "date-fns";

// export async function PUT(req: NextRequest, { params }: any) {
//   const { id } = params;
//   const { newFirstName: firstName, newLastName: lastName } = await req.json();
//   await connectDB();
//   await User.findByIdAndUpdate(id, { firstName, lastName });
//   return NextResponse.json({ message: "User Updated" }, { status: 200 });
// }
// export async function DELETE(req: NextRequest, { params }: any) {
//   const { id } = params;
//   await connectDB();
//   await User.findByIdAndDelete(id);
//   return NextResponse.json({ message: "User Deleted" }, { status: 200 });
// }

export async function GET(req: NextRequest) {
  console.log("views post work");
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