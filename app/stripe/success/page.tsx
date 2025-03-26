
"use client";

import { Button } from "@/components/ui/button";
import { CheckCheck } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function StripeSuccess() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isSignedIn) {
      router.push("/sign-in"); // Redirect to login page if not signed in
    }
  }, [isSignedIn, router]);

  if (!isSignedIn) return <p>Redirecting to login...</p>;

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center">
        <CheckCheck className="text-green-600 w-16 h-16 mx-auto my-6" />
        <h3 className="md:text-2xl text-lg text-gray-900 font-semibold">
          Payment Successful!
        </h3>
        <p className="text-gray-600 my-2">
          Thank you for your purchase. We hope you enjoy it!
        </p>
        <p>Have a great day!</p>
        <Button asChild className="mt-5">
          <Link href="/">Go Back</Link>
        </Button>
      </div>
    </div>
  );
}

