"use client";

import Link from "next/link";
import Image from "next/image";

const AboutSection = () => {
  return (
    <section id="about" className="py-16" style={{ backgroundColor: '#F2E8DE' }}>
      <div className="container-custom">
        {/* About Title with Bubble */}
        <div className="text-center mb-12">
          <div className="inline-block px-8 py-3 rounded-lg" style={{ backgroundColor: '#B97230' }}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl uppercase font-medium" style={{ color: '#153F55' }}>
              ABOUT
            </h2>
          </div>
        </div>
        
        {/* First Row: Text | Picture */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          {/* Left Column - First Text */}
          <div>
            <p className="leading-relaxed" style={{ color: '#153F55' }}>
              I love Mother Earth. And I believe the only way one can come even close to appreciating Nature's beauty is by listening, breathing, and creating. For me, yoga is an important extension of this worship. You will notice that I mainly practice yoga outside, and that I often draw nature into my yoga classes as a source of energy and inspiration.
            </p>
          </div>

          {/* Right Column - RYT200 Logo */}
          <div className="flex justify-center">
            <div className="relative w-48 h-48">
              <Image
                src="/images/about/RYT200.png"
                alt="RYT 200 Yoga Alliance Certification"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Second Row: Picture | Text */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          {/* Left Column - Beach Yoga Image */}
          <div className="flex justify-center">
            <div className="relative w-96 h-72 rounded-lg overflow-hidden">
              <Image
                src="/images/about/about.png"
                alt="Yoga on the beach - That first step"
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4">

              </div>
            </div>
          </div>

          {/* Right Column - Second Text */}
          <div>
            <p className="leading-relaxed" style={{ color: '#153F55' }}>
              My history in dance is infused into my yoga practice and teachings. Whether it's an introductory class or something advanced, you will notice my yoga teaching is not purely academic or spiritual. It is freedom of movement. It is even training, strength, and endurance. Perhaps, at its core, my yoga is a way to express yourself, connecting with Nature and the Souls around you as you practice. I teach that movement should not be tortuous but rather something to enjoy and leverage as a deeper connection to your soul's identity, your divine power, and to earth.
            </p>
          </div>
        </div>

        {/* Third Row: Text | Picture */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Third Text */}
          <div>
            <p className="leading-relaxed" style={{ color: '#153F55' }}>
              That is to say, I hope my yoga offers you something beyond just a "workout" or a "stretch." It is my dearest hope to welcome you to your yoga mat, provide you a space to open (not just clear) your mind, and tune in with the healing frequency that you desire. For many, this is stress release. For many, this is flexibility, strength, or balance. For all, it is some combination of everything that should lead you toward a more peaceful, purposeful, and joyful existence. I know Yoga did this for me. Which is why I am here to share it with <strong>YOU</strong>.
            </p>
          </div>

          {/* Right Column - Balanced Yoga Logo */}
          <div className="flex justify-center">
            <div className="relative md:w-[56rem] md:h-[28rem] w-[28rem] h-56">
              <Image
                src="/images/about/Balanced Yoga with Kenz.-10.png"
                alt="Balanced Yoga with Kenz"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
