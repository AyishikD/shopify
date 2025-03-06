import Image from "next/image";
import { client, urlFor } from "../lib/sanity";
import Link from "next/link";

async function getData() {
  const query = "*[_type == 'heroImage'][0]";
  const data = await client.fetch(query);
  return data;
}

export default async function Hero() {
  const data = await getData();

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-16 lg:py-24">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-300 via-white to-pink-300 opacity-50 animate-gradient"></div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        {/* Left Content */}
        <div className="flex flex-col justify-center text-center md:text-left">
          <h1 className="text-5xl font-extrabold text-gray-900 md:text-6xl">
          Best Fashion at a low price!
          </h1>
          <p className="mt-6 text-lg text-gray-600">
          We sell only the most exclusive and high quality products for you.
          We are the best so come and shop with us.
          </p>

          <div className="mt-8 flex justify-center md:justify-start">
            <button
              
              className="inline-block rounded-2xl bg-blue-600 px-8 py-3 text-lg font-semibold text-white shadow-xl transition duration-300 hover:bg-blue-500 hover:scale-105 hover:shadow-2xl"
            >
              Shop Now
            </button>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="relative flex items-center justify-center">
          {/* Image Container with Hover Effect */}
          <div className="relative w-72 sm:w-96 md:w-auto group cursor-pointer">
            {/* Front Image (Disappears on Hover) */}
            <Image
              src={urlFor(data.image2).url()}
              alt="Fashion Image 2"
              width={500}
              height={600}
              className="rounded-3xl shadow-2xl transition-opacity duration-500 group-hover:opacity-0"
            />
            
            {/* Back Image (Revealed on Hover) */}
            <Image
              src={urlFor(data.image1).url()}
              alt="Fashion Image 1"
              width={500}
              height={600}
              className="absolute top-0 left-0 rounded-3xl shadow-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          </div>
        </div>
      </div>

      {/* Category Buttons */}
      <div className="mt-12 flex justify-center">
        <div className="flex flex-wrap items-center justify-center gap-4">
          {["Men", "Women", "Teens", "Electronics"].map((category) => (
            <Link
              key={category}
              href={`/${category}`}
              className="rounded-lg bg-white/30 px-6 py-2 text-lg font-medium text-gray-800 backdrop-blur-xl transition-all duration-300 hover:bg-white/50 hover:scale-110"
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
