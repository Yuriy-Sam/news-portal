import { AuthUserType, CategoryType } from "@/types";
import mongoose, { Document, Model } from "mongoose";
// import { IUser } from "./UserModel"
export interface IPost extends Document {
  _id?: string;
  url: string;
  categoriesValues: string[];
  autorId: string;
  image: string;
  title: string;
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
  _doc?: any;
}
// {
const postSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    categoriesValues: { type: Array<String>, required: true },
    autorId: { type: String, required: true },
    image: { type: String, required: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Post: Model<IPost> =
  mongoose.models.Post || mongoose.model<IPost>("Post", postSchema);

export default Post;
