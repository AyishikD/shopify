import Link from "next/link";
import { simplifiedProduct } from "../interface";
import { client } from "../lib/sanity";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

async function getData() {
  const query = `*[_type == "product"][0...4] | order(_createdAt desc) {
        _id,
          price,
        name,
          "slug": slug.current,
          "categoryName": category->name,
          "imageUrl": images[0].asset->url
      }`;

  const data = await client.fetch(query);
  return data;
}

export default async function Newest() {
  const data: simplifiedProduct[] = await getData();

  return (
    <div className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Our Newest Products
          </h2>
        </div>

        {/* Product Grid */}
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data.map((product) => (
            <div
              key={product._id}
              className="relative group overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-2xl"
            >
              {/* Product Image with Hover Zoom */}
              <div className="aspect-square w-full overflow-hidden rounded-t-xl">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  <Link href={`/product/${product.slug}`} className="hover:text-blue-500">
                    {product.name}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-gray-500">{product.categoryName}</p>
                <p className="mt-2 text-lg font-bold text-gray-900">र{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
