"use client";

import Link from "next/link";

const SubscribeSection = () => {
  return (
    <section className="py-16 bg-[#f2e6e5]">
      <div className="container-custom">
        <h2 className="text-2xl md:text-3xl lg:text-4xl uppercase font-medium text-center mb-4">
          SUBSCRIBE TO GET ACCESS NOW.
        </h2>
        <p className="text-center text-gray-700 mb-12">
          start your movement practice to enhance your life and land back into your body.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Column - Video */}
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/videos/Website.mov" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Right Column - Text */}
          <div className="flex flex-col">
            <p className="text-gray-700 mb-6 leading-relaxed">
              Welcome to my online yoga studio, your sanctuary for dynamic practice and mindful exploration.
              As a member, dive into fluid movements and active engagement, enhancing flexibility and
              strength. Join me on your mat to deepen your practice and cultivate well-being. Welcome home
            </p>
            <div className="mt-4">
              <Link
                href="/membership"
                className="btn-primary inline-block"
              >
                JOIN
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscribeSection;
