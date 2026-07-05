import Image from "next/image";
import { notFound } from "next/navigation";
import dbConnect from "../../lib/mongodb";
import Product from "../../models/Product";
import AddToCartButton from "../../components/AddtoCartButton";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  await dbConnect();

  const product = await Product.findById(id).lean();

  if (!product) {
    notFound();
  }

  const imageSrc =
    Array.isArray(product.image) && product.image.length > 0
      ? product.image[0]
      : typeof product.image === "string"
      ? product.image
      : "/images/placeholder.png";

  return (
    <main className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="relative aspect-square bg-gray-100">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <p className="text-sm uppercase tracking-wide text-gray-500">
            {product.brand}
          </p>

          <h1 className="text-4xl font-bold mt-2">{product.name}</h1>

          <p className="text-gray-600 mt-3">{product.category}</p>

          <p className="text-2xl font-semibold mt-6">
            AUD ${product.price}
          </p>

          <p className="text-gray-700 mt-6">
            A premium everyday piece designed for comfort, versatility, and
            clean styling.
          </p>

          <AddToCartButton
            product={{
              _id: product._id.toString(),
              name: product.name,
              price: product.price,
              image: imageSrc,
            }}
          />
        </div>
      </div>
    </main>
  );
}