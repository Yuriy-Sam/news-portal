import { AuthUserType, CategoryType, ContentType } from "@/types";
import mongoose, { Document, Model } from "mongoose";
// import { IUser } from "./UserModel"
export interface IPost extends Document {
  _id?: string;
  url?: string;
  isNotes?: boolean;
  categoriesValues: string[];
  autorId: string;
  mainImage: string;
  title: string;
  content: ContentType[];
  createdAt: Date;
  updatedAt: Date;
  views: number;
  __v?: number;
  _doc?: any;
}
// {
const postSchema = new mongoose.Schema(
  {
    categoriesValues: { type: Array<String>, required: true },
    autorId: { type: String, required: true },
    mainImage: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: Array<ContentType>, required: true },
    views: { type: Number, required: true },
    isNotes: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

const Post: Model<IPost> =
  mongoose.models.Post || mongoose.model<IPost>("Post", postSchema);

export default Post;
