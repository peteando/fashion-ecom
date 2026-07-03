import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import Product from "../../../models/Product";

// Configure Cloudinary once
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const formData = await request.formData();

    // Extract fields safely as strings
    const name = formData.get("name") as string | null;
    const category = formData.get("category") as string | null;
    const price = formData.get("price") as string | null;
    const brand = formData.get("brand") as string | null;
    
    // Extract files array
    const files = formData.getAll("images") as File[];

    console.log("Form data received:", {
      name,
      category,
      price,
      brand,
      imagesCount: files.length,
    });

    // Validate required text fields
    if (!name || !category || !price || !brand) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate files array
    if (!files || files.length === 0 || (files.length === 1 && files[0].size === 0)) {
      return NextResponse.json(
        { success: false, message: "No files uploaded" },
        { status: 400 }
      );
    }

    // Upload all images to Cloudinary with explicit types
    const uploadResults = await Promise.all(
      files.map(async (file: File): Promise<UploadApiResponse> => {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { resource_type: "auto", folder: "products" },
            (error, result) => {
              if (error) return reject(error);
              if (!result) return reject(new Error("Cloudinary upload failed"));
              resolve(result);
            }
          );
          stream.end(buffer);
        });
      })
    );

    // Extract the secure URLs from Cloudinary responses
    const imageUrls: string[] = uploadResults.map((r) => r.secure_url);

    // Save product in MongoDB
    await dbConnect();
    const newProduct = await Product.create({
      name,
      category,
      price: Number(price),
      brand,
      image: imageUrls,
    });

    return NextResponse.json(
      { success: true, message: "Upload successful", product: newProduct },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding product:", error);
    
    const errorMessage = error instanceof Error ? error.message : "Server error";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}
