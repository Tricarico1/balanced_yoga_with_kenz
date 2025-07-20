import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SubscribeSection from "@/components/SubscribeSection";
import MembershipSection from "@/components/MembershipSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <SubscribeSection />
      <MembershipSection />
      <AboutSection />
      <ExperienceSection />
      <Footer />
    </main>
  );
}
