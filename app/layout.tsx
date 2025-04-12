import CartProvider from "./components/Providers";
import Navbar from "./components/Navbar";
import ShoppingCartModal from "./components/ShoppingCartModal";
import Footer from "./components/Footer";
import { type Metadata } from 'next'
import './globals.css'

import {
  ClerkProvider,
} from '@clerk/nextjs'
import { Inter, Roboto_Mono } from 'next/font/google'
import BackToTop from "./components/BackToTopButton";

const geistSans = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Roboto_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
        <body className="h-full">
          <CartProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <ShoppingCartModal />
              <main className="flex-grow"> 
                {children}
              </main>
              <Footer />
              <BackToTop />
            </div>
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}