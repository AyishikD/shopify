"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

interface Product {
  _id: string;
  name: string;
  categoryName: string;
  price: number;
  imageUrl: string;
  slug: string;
}

export default function CustomCarousel({ products }: { products: Product[] }) {
  const carouselRef = useRef(
    Autoplay({
      delay: 1500,
      stopOnInteraction: false,
    })
  );

  return (
    <Carousel
      plugins={[carouselRef.current]}
      className="w-full"
      onMouseEnter={carouselRef.current.stop}
      onMouseLeave={carouselRef.current.reset}
    >
      <CarouselContent>
        {products.map((product) => (
          <CarouselItem key={product._id} className="basis-1/3">
            <div key={product._id} className="group relative">
              <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                <Link href={`/product/${product.slug}`}>
                  <Image
                    src={product.imageUrl}
                    alt="Product image"
                    className="w-full h-full object-contain object-center lg:h-full lg:w-full mix-blend-darken transition-transform duration-300 ease-in-out group-hover:scale-90"
                    width={300}
                    height={300}
                  />
                </Link>
              </div>

              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link href={`/product/${product.slug}`}>{product.name}</Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.categoryName}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  ₹{product.price}
                </p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
