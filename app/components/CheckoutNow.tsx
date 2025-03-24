"use client";

import { Button } from "@/components/ui/button";
import { useShoppingCart } from "use-shopping-cart";
import { urlFor } from "../lib/sanity";
import { ProductCart } from "./AddToBag";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function CheckoutNow({
  currency,
  description,
  image,
  name,
  price,
  price_id,
}: ProductCart) {
  const { checkoutSingleItem } = useShoppingCart();
  const { isSignedIn } = useAuth();
  const router = useRouter();

  function buyNow(priceId: string) {
    if (!isSignedIn) {
      router.push("/sign-in"); // Redirect to login if not signed in
      return;
    }
    checkoutSingleItem(priceId);
  }

  const product = {
    name,
    description,
    price,
    currency,
    image: urlFor(image).url(),
    price_id,
  };

  return (
    <Button
      variant="outline"
      onClick={() => buyNow(product.price_id)}
    >
      Checkout Now
    </Button>
  );
}

