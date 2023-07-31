import connectDB from "@/mongodb/connect";
import path from "path";
import fs from "fs/promises";
import User, { IUser } from "@/mongodb/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import multer, { FileFilterCallback } from "multer";
import { Request as ExpressRequest } from "express";
import bcrypt from "bcryptjs";

// Define the storage settings for multer
// const storage = multer.diskStorage({
//   destination: function (req: ExpressRequest, file: Express.Multer.File, cb) {
//     cb(null, "./public/uploads"); // Store the uploaded files in the public/uploads directory
//   },
//   filename: function (req: ExpressRequest, file: Express.Multer.File, cb) {
//     cb(null, file.originalname); // Use the original file name as the file name
//   },
// });

// const upload = multer({ storage: storage });

// // Define the custom NextRequest interface
// interface CustomNextRequest extends NextRequest {
//   file: Express.Multer.File; // This allows TypeScript to recognize the file property added by multer
// }

// Function to save photo to local disk
// async function savePhotoToLocal(file: Express.Multer.File) {
//   const data = await fs.readFile(file.path);
//   const uploadDir = path.join(
//     process.cwd(),
//     "public",
//     `uploads/${file.originalname}`
//   );
//   try {
//     await fs.writeFile(uploadDir, data);
//     console.log(`File "${file.originalname}" saved to "${uploadDir}"`);
//   } catch (error) {
//     console.error(`Failed to save "${file.originalname}":`, error);
//     throw error; // Rethrow the error to handle it later
//   }
// }

// export async function POST(req: NextRequest) {
//   await connectDB();
//   // const { firstName, lastName, email, password } = await req.json();
//   // console.log(firstName, lastName);
//   // if (req.file) {
//     //   // If a file was uploaded, save it to the local disk
//     //   console.log("server have file");
//     //   try {
//     await savePhotoToLocal(req.body);
//     //     await User.create({
//     //       firstName,
//     //       lastName,
//     //       email,
//     //       password,
//     //       avatar: req.file.path,
//     //     });
//     console.log("server created user with photo");
//     //   } catch (error) {
//     //     console.error("Error saving photo:", error);
//     //     return NextResponse.json(
//     //       { error: "Error saving photo" },
//     //       { status: 500 }
//     //     );
//     //   }
//   } else {
//     // await User.create({ firstName, lastName, email, password });
//     console.log("server created user without photo");
//   }

//   return NextResponse.json({ message: "User Created" }, { status: 201 });
// }
// async function savePhotoToLocal(formData: FormData) {
//   const file: File | undefined = formData.getAll("avatar")[0] as File;
//   console.log(file);

//   if (file) {
//     const data = await file.arrayBuffer();
//     const buffer = Buffer.from(data);
//     const uploadDir = path.join(
//       process.cwd(),
//       "public",
//       `/uploads/${file.name}`
//     );
//     try {
//       await fs.writeFile(uploadDir, buffer);
//       console.log(`File "${file.name}" saved to "${uploadDir}"`);
//     } catch (error) {
//       console.error(`Failed to save "${file.name}":`, error);
//     }
//   } else {
//     console.error("No file selected.");
//   }
// }

// async function uploadPhoto(formData: FormData) {
//   try {
//     const newFile = await savePhotoToLocal(formData);
//   } catch (error: any) {
//     return { errMessage: error.message };
//   }
// }
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const formData = await req.formData();

    // Extract form data fields
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const password = formData.get("password");
    // const avatar = formData.get("avatar");

    // Convert password to a buffer before hashing
    const hashedPassword = await bcrypt.hash(password as string, 10);

    // Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Email is already in use");

      return NextResponse.json(
        { error: "Email is already in use" },
        { status: 400 }
      );
    }

    // Create the new user with the hashed password
    await User.create({ firstName, lastName, email, password: hashedPassword });
    console.log("User Created");
    return NextResponse.json({ message: "User Created" }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);

  const email = url.searchParams.get("email");
  const password = url.searchParams.get("password");

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  await connectDB();
  const user = await User.findOne({ email: email });

  if (!user) {
    return NextResponse.json({ error: "Invalid email" }, { status: 401 });
  }

  // Compare the provided password with the hashed password in the database
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  // Password is valid, you can create a session or JWT token for authentication
  // For this example, I'll just return a success response
  return NextResponse.json(
    { user, message: "Login successful" },
    { status: 200 }
  );
}

// export async function GET() {
//   await connectDB();
//   const users = await User.find();
//   return NextResponse.json({ users });
// }
