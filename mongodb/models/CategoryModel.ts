import mongoose, { Document, Model } from "mongoose";

export interface ICategory extends Document {
  value: string;
  image: string;
  title: string;
}

const categorySchema = new mongoose.Schema({
  value: { type: String, required: true },
  image: { type: String, required: true },
  title: { type: String, required: true },
});

const Category: Model<ICategory> =
  mongoose.models.category ||
  mongoose.model<ICategory>("Category", categorySchema);

export default Category;
