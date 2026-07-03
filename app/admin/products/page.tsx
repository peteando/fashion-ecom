"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";

export default function ProductForm() {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [folderName, setFolderName] = useState<string>("products");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a file");
      return;
    }

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("images", file);
    formData.append("name", name);
    formData.append("category", category);
    formData.append("brand", brand);
    formData.append("price", price);
    formData.append("folderName", folderName);

    try {
      const res = await fetch("/api/products/create", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Product uploaded successfully!");
        setFile(null);
        setName("");
        setCategory("");
        setBrand("");
        setPrice("");
        setFolderName("products");
      } else {
        setMessage(data.message || data.error || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      setMessage("Network error");
    }

    setLoading(false);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)}
            className="border p-2 w-full rounded"
          />
        </div>

        {/* Brand */}
        <div>
          <label className="block mb-1 font-medium">Brand</label>
          <input
            type="text"
            placeholder="Brand"
            value={brand}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setBrand(e.target.value)}
            className="border p-2 w-full rounded"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1 font-medium">Price</label>
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}
            className="border p-2 w-full rounded"
          />
        </div>

        {/* Image uploader at the bottom */}
        <div>
          <label className="block mb-1 font-medium">Product Image</label>
          <input
            type="file"
            name="images"   
            accept="image/*"
            onChange={handleFileChange}
            className="border p-2 w-full rounded"
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {loading ? "Uploading..." : "Add Product"}
        </button>
      </form>

      {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
    </div>
  );
}
