// app/models/Product.ts
import mongoose, { Schema, Model } from "mongoose";

export interface IProduct {
  _id: string;
  name: string;
  category: string;
  price: number;
  brand: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: 0,
    },
    brand: {
      type: String,
      required: [true, "Product brand is required"],
      trim: true,
    },
    image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Product: Model<IProduct> =
  mongoose.models.Product ||
  mongoose.model<IProduct>("Product", ProductSchema, "products");

export default Product;