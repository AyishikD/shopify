import Image from "next/image";
import Hero from "./components/Hero";
import Newest from "./components/Newest";
import Footer from "./components/Footer";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <div className="bg-white pb-6 sm:pb-8 lg:pb-12">
        <div className="container mx-auto px-4 overflow-hidden">
          <Hero />
          <Newest />
        </div>
      </div>
    </>
  );
}