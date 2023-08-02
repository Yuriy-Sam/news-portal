import connectDB from "@/mongodb/connect";
import { NextRequest, NextResponse } from "next/server";
import Category from "@/mongodb/models/CategoryModel";
import User from "@/mongodb/models/UserModel";
import Post from "@/mongodb/models/PostModel";

// export async function POST(req: NextRequest) {
//   try {
//     await connectDB();

//     const url = new URL(req.url);
//     const data: any = {};

//     url.searchParams.forEach(async (value, key) => {
//       if (key === "categoriesValues") {
//         const categoriesValues = value.split(",");
//         const categoryPromises = categoriesValues.map(async (item) => {
//           const cat = await Category.findOne({ value: item });
//           return cat ? { ...cat.toObject() } : null;
//         });

//         const categories = await Promise.all(categoryPromises);
//         data.categories = categories.filter((cat) => cat !== null);
//       } else if (key === "autorId") {
//         const user = await User.findOne({ _id: value });
//         data.autor = user ? { ...user.toObject() } : null;
//       } else {
//         data[key] = value; // Set the data[key] for other keys
//       }
//     });
//     const catt = await Category.findOne({ value: "politic" });
//     // data.catt = catt ? { ...catt.toObject() } : null;

//     return NextResponse.json(
//       { data, message: "Get categories successful" },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const url = req.nextUrl;
    const data: any = {};

    url.searchParams.forEach(async (value, key) => {
      if (key === "categoriesValues") {
        const categoriesValues = value.split(",");
        data.categoriesValues = categoriesValues;
      } else {
        data[key] = value;
      }
    });
    await Post.create({ ...data });

    return NextResponse.json(
      { data, message: "Post created" },
      { status: 200 }
    );
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
    const posts = await Post.find();

    // Fetch categories for each post
    const postsWithCategories = await Promise.all(
      posts.map(async (post) => {
        const categories = await Promise.all(
          post.categoriesValues.map((categoryValue) =>
            // Fetch the Category details
            Category.findOne({ value: categoryValue })
          )
        );

        // Fetch the author details
        const autor = await User.findOne({ _id: post.autorId });
        // Remove autorId and categoriesValues from the post object
        const { autorId, categoriesValues, ...postWithoutDetails } = post._doc;
        return {
          ...post._doc,
          categories,
          autor,
        };
      })
    );
    // const cat = await Category.findOne({ value: "politic" });
    return NextResponse.json(
      { data: postsWithCategories, message: "Get categories successful" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
// export async function GET(req: NextRequest) {
//   try {
//     await connectDB();

//     const posts = await Post.find({});
//     // posts.map((el) => {

//     //   console.log("eeadas: ", el.categoriesValues);
//     //   if (el.categoriesValues) {
//     //     const cat = await Category.findOne({ value: el.categoriesValues. });
//     //     return cat;
//     //     el.categoriesValues.map(async (item) => {

//     //     });
//     //     const categoryPromises = el.categoriesValues.map(async (item) => {
//     //       const cat = await Category.findOne({ value: item });
//     //       return cat ? { ...cat.toObject() } : null;
//     //     });

//     //     const categories = await Promise.all(categoryPromises);
//     //     data.categories = categories.filter((cat) => cat !== null);
//     //   }

//     //   // el.categoriesValues.map(async (item) => {
//     //   //   const cat = await Category.findOne({ value: item });
//     //   //   return cat;
//     //   // });
//     //   // el.autorIdconst = User.findOne({ _id: el.autorIdconst });
//     //   //     data.autor = user ? { ...user.toObject() } : null;
//     // });
//     // console.log("newPosts", newPosts);
//     // posts.categoriesValues

//     // url.searchParams.forEach(async (value, key) => {
//     //   if (key === "categoriesValues") {
//     //     const categoriesValues = value.split(",");
//     // const categoryPromises = categoriesValues.map(async (item) => {
//     //   const cat = await Category.findOne({ value: item });
//     //   return cat ? { ...cat.toObject() } : null;
//     // });

//     // const categories = await Promise.all(categoryPromises);
//     // data.categories = categories.filter((cat) => cat !== null);
//     //   } else if (key === "autorId") {
//     //     const user = await User.findOne({ _id: value });
//     //     data.autor = user ? { ...user.toObject() } : null;
//     //   } else {
//     //     data[key] = value; // Set the data[key] for other keys
//     //   }
//     // });
//     // const catt = await Category.findOne({ value: "politic" });

//     return NextResponse.json(
//       { posts, message: "Get categories successful" },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
// export async function GET(req: NextRequest) {
//   try {
//     await connectDB();

//     const url = new URL(req.url);
//     const data: any = {};

//     url.searchParams.forEach(async (value, key) => {
//       if (key === "categoriesValues") {
//         const categoriesValues = value.split(",");
//         const categoryPromises = categoriesValues.map(async (item) => {
//           const cat = await Category.findOne({ value: item });
//           return cat ? { ...cat.toObject() } : null;
//         });

//         const categories = await Promise.all(categoryPromises);
//         data.categories = categories.filter((cat) => cat !== null);
//       } else if (key === "autorId") {
//         const user = await User.findOne({ _id: value });
//         data.autor = user ? { ...user.toObject() } : null;
//       } else {
//         data[key] = value; // Set the data[key] for other keys
//       }
//     });
//     const catt = await Category.findOne({ value: "politic" });

//     return NextResponse.json(
//       { data, message: "Get categories successful" },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
