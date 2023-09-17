import connectDB from "@/mongodb/connect";
import User from "@/mongodb/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Post, { IPost } from "@/mongodb/models/PostModel";
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
// export async function DELETE(req: NextRequest, { params }: any) {
//   const { id } = params;
//   await connectDB();
//   await User.findByIdAndDelete(id);
//   return NextResponse.json({ message: "User Deleted" }, { status: 200 });
// }

export async function GET(req: NextRequest, { params }: any) {
  try {
    const { id } = params;
    await connectDB();
    let post: IPost | null = null;

    switch (id) {
      case "bestToday":
        post = await Post.findOne().sort({ views: -1 });
        break;

      default:
        post = await Post.findOne({ _id: id });
        break;
    }

    // const post =
    //   id === "first"
    //     ? await Post.findOne().sort({ createdAt: 1 })
    //     : await Post.findOne({ _id: id });
    if (!post) {
      return NextResponse.json({ error: "Post is not find" }, { status: 401 });
    }

    const userId = cookies().get("user")?.value;

    const authUser = await User.findOne({ _id: userId });

    let isNotes = false;
    if (authUser && authUser.notes.length > 0) {
      isNotes = authUser.notes.some((note) => {
        return note === post?._id?.toString();
      });
    }
    // Fetch the Category details
    const categories = await Promise.all(
      post.categoriesValues.map((categoryValue: string) =>
        Category.findOne({ value: categoryValue })
      )
    );

    // Fetch the author details
    const autor = await User.findOne({ _id: post.autorId });

    let date = formatDistance(new Date(post.createdAt.toString()), new Date(), {
      addSuffix: true,
    });
    // Remove autorId and categoriesValues from the post object
    const {
      autorId,
      categoriesValues,
      createdAt,
      updatedAt,
      ...postWithoutDetails
    } = post._doc;

    const customPost = {
      ...postWithoutDetails,
      categories,
      autor,
      date,
      isNotes,
    };

    return NextResponse.json(
      { post: customPost, message: "Post is find" },
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
