import connectDB from "@/mongodb/connect";
import { NextRequest, NextResponse } from "next/server";
import Category from "@/mongodb/models/CategoryModel";
import User from "@/mongodb/models/UserModel";
import Post from "@/mongodb/models/PostModel";
import { formatDistance } from "date-fns";

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

    const formData: any = await req.formData();
    // formData.append("upload_preset", "posts_upload");
    // console.log("post keys -- ", ...formData.keys());
    // const title = formData.get("title");
    // const subtitle = formData.getAll("subtitle");
    // const mainImageFile = formData.getAll("mainImage");
    // const content = formData.getAll("content");

    // console.log("post entries -- ", ...formData.entries());
    let data: any = {};
    let content: any = [];
    let categories: any = [];
    for (const pair of formData.entries()) {
      const [key, value] = pair;
      if (key === "title" || key === "mainImage" || key === "autorId") {
        data[key] = value;
      } else if (key === "category") {
        categories.push(value);
      } else {
        content.push({ type: key, value: value });
      }
    }
    data["categoriesValues"] = categories;
    data["content"] = content;
    console.log("data post create - ", data);

    // url.searchParams.forEach(async (value, key) => {
    //   if (key === "categoriesValues") {
    //     const categoriesValues = value.split(",");
    //     data.categoriesValues = categoriesValues;
    //   } else {
    //     data[key] = value;
    //   }
    // });
    await Post.create({ ...data, views: 1 });

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
    const url = req.nextUrl;
    const offsetParam = url.searchParams.get("offset");
    const limitParam = url.searchParams.get("limit");
    const categoriesParam = url.searchParams.get("categories");

    let posts = await Post.find().sort({ createdAt: -1 });

    if (categoriesParam) {
      posts = posts.filter((el) =>
        el.categoriesValues.some((cat) => {
          return categoriesParam.split(",").some((v) => {
            return cat === v;
          });
        })
      );
    }

    posts = posts.slice(+offsetParam!, +limitParam!);
    // Fetch categories for each post
    const postsWithCategories = await Promise.all(
      posts.map(async (post) => {
        // Fetch the Category details
        const categories = await Promise.all(
          post.categoriesValues.map((categoryValue) => {
            return Category.findOne({ value: categoryValue });
          })
        );

        // Fetch the autor details
        const autor = await User.findOne({ _id: post.autorId });
        let date = formatDistance(
          new Date(post.createdAt.toString()),
          new Date(),
          {
            addSuffix: true,
          }
        );
        // console.log(
        //   "test date: ",
        //   formatDistance(new Date(post.updatedAt.toString()), new Date(), {
        //     addSuffix: true,
        //   })
        // );

        // Remove autorId and categoriesValues from the post object
        const {
          autorId,
          categoriesValues,
          createdAt,
          updatedAt,
          ...postWithoutDetails
        } = post._doc;
        return {
          ...postWithoutDetails,
          categories,
          autor,
          date,
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
