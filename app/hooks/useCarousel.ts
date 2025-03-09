"use client";

import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";

const useCarousel = () => {
  const carouselRef = useRef(
    Autoplay({
      delay: 1500,
    })
  );

  return {
    carouselRef,
  };
};

export default useCarousel;
