"use client";

import Link from "next/link";
import Image from "next/image";

const AboutSection = () => {
  return (
    <section className="py-16" style={{ backgroundColor: '#F2E8DE' }}>
      <div className="container-custom">
        <h2 className="text-2xl md:text-3xl lg:text-4xl uppercase font-medium text-center mb-4" style={{ color: '#153F55' }}>
          ABOUT ME
        </h2>
        <p className="text-center mb-12" style={{ color: '#3D5019' }}>
          start your movement practice to enhance your life and land back into your body.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Column - About Text */}
          <div className="p-8 md:p-12 rounded-lg" style={{ backgroundColor: '#153F55' }}>
            <p className="mb-6 text-sm md:text-base" style={{ color: '#F2E8DE' }}>
              I am a professional ballet dancer, certified yoga and pilates instructor and a mom.
              Practicing and teaching yoga has changed my life and my passion is sharing my
              experience and knowledge, as well as continuously learning more. I always aim to
              bring the balance of discipline and positive energy to students and colleagues in the
              yoga community.
            </p>
            <Link
              href="/about"
              className="uppercase text-sm tracking-wider px-6 py-2 inline-block transition-colors hover:opacity-80"
              style={{ backgroundColor: '#B97230', color: '#F2E8DE' }}
            >
              READ MORE
            </Link>
          </div>

          {/* Right Column - Image */}
          <div className="relative aspect-square w-full overflow-hidden rounded-lg">
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
