"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Search, Menu, X, User } from "lucide-react";
import { useShoppingCart } from "use-shopping-cart";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button"; // Assuming shadcn/ui Button
import { Sheet, SheetContent, SheetHeader, SheetTrigger, SheetClose } from "@/components/ui/sheet"; // Using Sheet for mobile menu
import { cn } from "@/lib/utils"; // Assuming shadcn/ui utility for class names
import SearchModal from "./SearchModal"; // Assuming SearchModal is styled appropriately

// Navigation Links Configuration
const links = [
  { name: "Home", href: "/" },
  { name: "Men", href: "/Men" },
  { name: "Women", href: "/Women" },
  { name: "Teens", href: "/Teens" },
  { name: "Electronics", href: "/Electronics" },
];

// Navbar Component
export default function Navbar() {
  const pathname = usePathname();
  const { handleCartClick, cartCount = 0 } = useShoppingCart(); // Get cart count
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for header background/shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Removed explicit height (h-20), height will be determined by content + padding */}
      <header className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 ease-in-out border-b",
        // "h-20", // <-- REMOVED explicit height class
        isScrolled ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm" : "bg-background",
        "border-border/40"
      )}>
        {/* Removed h-full, added py-4 for vertical padding like original code */}
        <div className={cn(
            "container flex items-center justify-between px-4 mx-auto max-w-7xl sm:px-6 lg:px-8",
            // "h-full", // <-- REMOVED
            "py-4"      // <-- ADDED original padding
        )}>
          {/* Mobile Menu Trigger (using Sheet) */}
          <div className="lg:hidden">
             <Sheet>
               <SheetTrigger asChild>
                 <Button variant="ghost" size="icon" aria-label="Open menu">
                   <Menu className="w-7 h-7" />
                 </Button>
               </SheetTrigger>
               <SheetContent side="left" className="w-[300px] sm:w-[400px] p-6 flex flex-col">
                 {/* Mobile Sheet Header */}
                 <SheetHeader className="mb-8">
                   <Link href="/" className="self-start">
                     <SheetClose asChild>
                       <h1 className="text-3xl font-bold">
                         Shop<span className="text-primary">ify</span>
                       </h1>
                     </SheetClose>
                   </Link>
                 </SheetHeader>

                 {/* Mobile Navigation (Keeping larger text) */}
                 <nav className="flex flex-col flex-grow gap-5 mb-8">
                   {links.map((link) => (
                     <SheetClose asChild key={link.href}>
                       <Link
                         href={link.href}
                         className={cn(
                           "text-xl font-medium transition-colors hover:text-primary",
                           pathname === link.href ? "text-primary" : "text-muted-foreground"
                         )}
                       >
                         {link.name}
                       </Link>
                     </SheetClose>
                   ))}
                 </nav>

                 {/* Mobile Actions & Auth (Keeping larger text) */}
                 <div className="mt-auto space-y-5">
                    {/* Search & Cart Buttons in Mobile Menu */}
                    <div className="flex items-center gap-4">
                      <SheetClose asChild>
                       <Button
                         onClick={() => setIsSearchOpen(true)}
                         variant="outline"
                         className="flex-1 text-base py-2.5"
                       >
                         <Search className="w-5 h-5 mr-2" />
                         Ask AI
                       </Button>
                       </SheetClose>
                       <SheetClose asChild>
                       <Button
                         variant="outline"
                         onClick={handleCartClick}
                         className="flex-1 relative text-base py-2.5"
                       >
                          <ShoppingBag className="w-5 h-5 mr-2" />
                          Cart
                          {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                              {cartCount}
                            </span>
                          )}
                       </Button>
                       </SheetClose>
                    </div>
                    {/* Auth Buttons in Mobile Menu */}
                    <SignedOut>
                      <div className="flex flex-col gap-3">
                        <SheetClose asChild>
                           <SignInButton mode="modal">
                             <Button variant="default" className="w-full bg-green-500 hover:bg-green-600 text-white text-base py-2.5">Sign In</Button>
                           </SignInButton>
                        </SheetClose>
                        <SheetClose asChild>
                           <SignUpButton mode="modal">
                             <Button variant="secondary" className="w-full text-base py-2.5">Register</Button>
                           </SignUpButton>
                        </SheetClose>
                      </div>
                    </SignedOut>
                    <SignedIn>
                       <SheetClose asChild>
                          <Link href="/user-profile">
                              <Button variant="outline" className="w-full text-base py-2.5">
                                 <User className="w-5 h-5 mr-2" />
                                 My Account
                              </Button>
                          </Link>
                       </SheetClose>
                    </SignedIn>
                 </div>
               </SheetContent>
             </Sheet>
          </div>

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl font-bold md:text-3xl">
              Shop<span className="text-primary">ify</span>
            </h1>
          </Link>

          {/* Desktop Navigation (Keeping larger text) */}
          <nav className="items-center hidden lg:flex lg:gap-8 xl:gap-10">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                // Note: py-3 on links + py-4 on container means links won't perfectly fill vertical space, but items-center handles alignment
                className={cn(
                  "text-lg font-semibold transition-colors hover:text-primary relative py-3",
                  pathname === link.href
                    ? "text-primary after:content-[''] after:absolute after:left-0 after:bottom-1.5 after:w-full after:h-0.5 after:bg-primary"
                    : "text-muted-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions (Desktop) */}
          <div className="flex items-center gap-3 md:gap-4">
             {/* Search Button with Text - Hidden below sm (640px) */}
             <Button
               onClick={() => setIsSearchOpen(true)}
               variant="outline"
               className={cn(
                 "text-base py-2 px-4 text-muted-foreground hover:text-primary hover:bg-accent",
                 "hidden sm:inline-flex" // Keep hidden below 640px
               )}
             >
               <Search className="w-5 h-5 mr-2" />
               Ask AI
             </Button>

             {/* Cart Button with Text - Remains visible */}
             <Button
               variant="outline"
               onClick={handleCartClick}
               aria-label={`Shopping Cart with ${cartCount} items`}
               className="relative text-base py-2 px-4 text-muted-foreground hover:text-primary hover:bg-accent"
             >
               <ShoppingBag className="w-5 h-5 mr-2" />
               Cart
               {cartCount > 0 && (
                 <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-[11px] font-bold leading-none text-white bg-primary rounded-full">
                   {cartCount}
                 </span>
               )}
             </Button>

            {/* Desktop Authentication - Container hides buttons below sm (640px) */}
            <div className="hidden sm:flex items-center gap-2">
              <SignedOut>
                  <SignInButton mode="modal">
                    <Button variant="ghost" className="text-base py-2 px-4">Sign In</Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button variant="default" className="bg-green-500 hover:bg-green-600 text-white text-base py-2 px-4">Register</Button>
                  </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}