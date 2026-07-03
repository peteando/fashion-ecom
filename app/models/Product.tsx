// models/Product.ts
import mongoose, { Document, Schema, Model } from "mongoose";

export interface IProduct extends Document {
  _id: string;        // Force _id to be a string
  name: string;
  category: string;
  price: number;
  brand: string;
  image?: string;     // Change from string[] to string to match Compass
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema<IProduct> = new mongoose.Schema(
  {
    _id: {
      type: String,   // Tell Mongoose to expect text string IDs
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
      type: String,   // Change from [String] to String to match Compass
      required: false,
    },
  },
  { timestamps: true }
);

// Explicitly pass "products" as the 3rd argument to target your exact collection
const Product: Model<IProduct> = 
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema, "products");

export default Product;
