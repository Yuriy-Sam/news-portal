import connectDB from "@/mongodb/connect";
import path from "path";
import { writeFile } from "fs/promises";
import User, { IUser } from "@/mongodb/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import multer, { FileFilterCallback } from "multer";
import { Request as ExpressRequest } from "express";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { cookies } from "next/headers";

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
// import cloudinary from "cloudinary";

// cloudinary.v2.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET,
// });
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const formData: any = await req.formData();

    // Extract form data fields
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const password = formData.get("password");
    let createProps = {};
    const avatar = formData.get("file");

    if (avatar) {
      await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      )
        .then((res) => res.json())
        .then(
          (data) => (createProps = { ...createProps, avatar: data.secure_url })
        )
        .catch((err) => console.log("Error cloouuuud:", err));
    }

    // Convert password to a buffer before hashing
    const hashedPassword = await bcrypt.hash(password as string, 10);

    // Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email is already in use" },
        { status: 400 }
      );
    }
    // const avatar: File | null = formData.get("avatar") as unknown as File;
    // let fullAvatarName = ``;
    // if (avatar ) {
    // const bytes = await avatar.arrayBuffer();
    // const buffer = Buffer.from(bytes);

    // const name = uuidv4();
    // const ext = avatar.type.split("/")[1];
    // fullAvatarName = `${name}.${ext}`;
    // // const tempdir = os.tmpdir();
    // const uploadDir = path.join(
    //   process.cwd(),
    //   `/public/uploads/avatars/${fullAvatarName}`
    // );
    // await writeFile(uploadDir, buffer);
    //   createProps = { ...createProps, avatar: fullAvatarName };
    //   console.log(`open ${uploadDir} to see the uploaded file`);
    // }
    createProps = {
      ...createProps,
      firstName,
      lastName,
      email,
      password: hashedPassword,
    };
    // Create the new user with the hashed password
    await User.create({ ...createProps });
    // if (userId) {
    //   cookies().set("user", userId);
    // }

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
  const url = req.nextUrl;

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
  if (user._id) {
    cookies().set("user", user._id);
  }
  return NextResponse.json(
    { user, message: "Login successful" },
    { status: 200 }
  );
}

export async function DELETE(req: NextRequest, { params }: any) {
  cookies().delete("user");
  return NextResponse.json({ message: "User Deleted" }, { status: 200 });
}

// export async function GET() {
//   await connectDB();
//   const users = await User.find();
//   return NextResponse.json({ users });
// }
