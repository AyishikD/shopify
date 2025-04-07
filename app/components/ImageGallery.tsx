"use client";

import Image from "next/image";
import { urlFor } from "../lib/sanity";
import { useState, useRef } from "react";

interface iAppProps {
  images: any;
}

export default function ImageGallery({ images }: iAppProps) {
  const [currentImage, setCurrentImage] = useState(images[0]);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);
  const zoomRef = useRef<HTMLDivElement>(null);

  const handleImageHover = (image: any) => {
    setCurrentImage(image);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!zoomRef.current) return;

    const { left, top, width, height } = zoomRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomPosition({ x, y });
  };

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <div className="order-last flex gap-4 lg:order-none lg:flex-col">
        {images.map((image: any, idx: any) => (
          <div key={idx} className="overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={urlFor(image).url()}
              width={200}
              height={200}
              alt="photo"
              className="h-full w-full object-cover object-center cursor-pointer"
              onMouseEnter={() => handleImageHover(image)}
            />
          </div>
        ))}
      </div>

      <div
        className="relative overflow-hidden rounded-lg bg-gray-100 lg:col-span-4"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsZooming(true)}
        onMouseLeave={() => setIsZooming(false)}
        ref={zoomRef}
      >
        <Image
          src={urlFor(currentImage).url()}
          alt="Photo"
          width={500}
          height={500}
          className="h-full w-full object-cover object-center"
        />

        {isZooming && (
          <div
            className="absolute pointer-events-none border-2 border-gray-300 rounded-full"
            style={{
              width: "150px",
              height: "150px",
              top: `calc(${zoomPosition.y}% - 75px)`,
              left: `calc(${zoomPosition.x}% - 75px)`,
              backgroundImage: `url(${urlFor(currentImage).url()})`,
              backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
              backgroundSize: "450%",
              zIndex: 10,
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            }}
          />
        )}

        <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
          Sale
        </span>
      </div>
    </div>
  );
}
