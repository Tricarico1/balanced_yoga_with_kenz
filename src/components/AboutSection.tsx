"use client";

import Link from "next/link";
import Image from "next/image";

const AboutSection = () => {
  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Column - About Text on Dark Background */}
          <div className="bg-black text-white p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl uppercase font-medium mb-6">
              ABOUT
            </h2>
            <p className="mb-6 text-sm md:text-base">
              I am a professional ballet dancer, certified yoga and pilates instructor and a mom.
              Practicing and teaching yoga has changed my life and my passion is sharing my
              experience and knowledge, as well as continuously learning more. I always aim to
              bring the balance of discipline and positive energy to students and colleagues in the
              yoga community.
            </p>
            <Link
              href="/about"
              className="uppercase text-sm tracking-wider px-6 py-2 bg-[#866c67] hover:bg-[#60463e] inline-block transition-colors"
            >
              READ MORE
            </Link>
          </div>

          {/* Right Column - Image */}
          <div className="relative aspect-square w-full overflow-hidden">
            <Image
              src="https://ext.same-assets.com/448708338/4272513722.jpeg"
              alt="Mackenzie Homan"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
