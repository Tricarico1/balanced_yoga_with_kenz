"use client";

import Image from "next/image";

const AboutSection = () => {
  return (
    <section id="about" className="py-8" style={{ backgroundColor: '#F2E8DE' }}>
      <div className="container-custom">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl lg:text-4xl uppercase font-medium" style={{ color: '#153F55' }}>
            About
          </h2>
        </div>

        {/* Three columns: Yoga cert (left) | Girl image (center) | Balanced logo (right) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Left - RYT200 */}
          <div className="flex flex-col items-center">
            <div className="relative w-full aspect-square max-w-[15rem] flex justify-center">
              <Image
                src="/images/about/RYT200.png"
                alt="RYT 200 Yoga Alliance Certification"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Center - Uncropped girl image */}
          <div className="flex flex-col items-center">
            <div className="relative w-full aspect-square max-w-[21rem] overflow-hidden">
              <Image
                src="/images/about/about.png"
                alt="Yoga on the beach - That first step"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Right - Balanced Yoga logo */}
          <div className="flex flex-col items-center">
            <div className="relative w-full aspect-square max-w-[15rem] flex justify-center">
              <Image
                src="/images/about/Balanced Yoga with Kenz.-10.png"
                alt="Balanced Yoga with Kenz"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Text boxes underneath */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(21, 63, 85, 0.06)' }}>
            <p className="leading-relaxed text-sm md:text-base" style={{ color: '#153F55' }}>
              I love Mother Earth. And I believe the only way one can come even close to appreciating Nature's beauty is by listening, breathing, and creating. For me, yoga is an important extension of this worship. You will notice that I mainly practice yoga outside, and that I often draw nature into my yoga classes as a source of energy and inspiration.
            </p>
          </div>
          <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(21, 63, 85, 0.06)' }}>
            <p className="leading-relaxed text-sm md:text-base" style={{ color: '#153F55' }}>
              My history in dance is infused into my yoga practice and teachings. Whether it's an introductory class or something advanced, you will notice my yoga teaching is not purely academic or spiritual. It is freedom of movement. It is even training, strength, and endurance. Perhaps, at its core, my yoga is a way to express yourself, connecting with Nature and the Souls around you as you practice. I teach that movement should not be tortuous but rather something to enjoy and leverage as a deeper connection to your soul's identity, your divine power, and to earth.
            </p>
          </div>
          <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(21, 63, 85, 0.06)' }}>
            <p className="leading-relaxed text-sm md:text-base" style={{ color: '#153F55' }}>
              That is to say, I hope my yoga offers you something beyond just a "workout" or a "stretch." It is my dearest hope to welcome you to your yoga mat, provide you a space to open (not just clear) your mind, and tune in with the healing frequency that you desire. For many, this is stress release. For many, this is flexibility, strength, or balance. For all, it is some combination of everything that should lead you toward a more peaceful, purposeful, and joyful existence. I know Yoga did this for me. Which is why I am here to share it with <strong>YOU</strong>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
