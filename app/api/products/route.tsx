// app/api/products/route.ts

import dbConnect from "../../lib/mongodb";
import Product from "../../models/Product";
import { NextRequest, NextResponse } from "next/server";

// Optional interface for request body
interface ProductBody {
  name: string;
  price: number;
  category?: string;
  brand?: string;
  image?: string[];
}

// Helper function for error responses
const handleError = (error: unknown) => {
  console.error(error);

  const message =
    error instanceof Error ? error.message : "Internal Server Error";

  return NextResponse.json(
    { error: message },
    { status: 500 }
  );
};

// GET all products
export async function GET() {
  try {
    await dbConnect();

    const products = await Product.find({}).lean();

    return NextResponse.json(products, {
      status: 200,
    });
  } catch (error) {
    return handleError(error);
  }
}

// POST new product
export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body: ProductBody = await req.json();

    // Basic validation
    if (!body.name || !body.price) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const product = new Product(body);

    await product.save();

    return NextResponse.json(product, {
      status: 201,
    });
  } catch (error) {
    return handleError(error);
  }
}