"use client";

import Link from "next/link";

const Hero = () => {
  return (
    <section className="hero-section">
      {/* Background Video with Overlay */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        style={{ filter: "brightness(0.8)" }}
      >
        <source src="/videos/Website.mov" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium uppercase tracking-wider mb-12">
          Join the journey
        </h1>
        <Link
          href="/membership"
          className="btn-primary inline-block"
        >
          Yoga Offerings
        </Link>
      </div>
    </section>
  );
};

export default Hero;
