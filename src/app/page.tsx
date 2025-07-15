import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SubscribeSection from "@/components/SubscribeSection";
import AboutSection from "@/components/AboutSection";
import GallerySection from "@/components/GallerySection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <SubscribeSection />
      <AboutSection />
      <GallerySection />
      <Footer />
    </main>
  );
}
