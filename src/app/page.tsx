export const dynamic = 'force-dynamic'

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SubscribeSection from "@/components/SubscribeSection";
import MembershipSection from "@/components/MembershipSection";
import VideoPreviewSection from "@/components/VideoPreviewSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <SubscribeSection />
      <MembershipSection />
      <VideoPreviewSection />
      <AboutSection />
      <ExperienceSection />
      <BlogSection />
      <Footer />
    </main>
  );
}
