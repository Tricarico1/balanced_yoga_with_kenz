"use client";

import Link from "next/link";

const Hero = () => {

  const scrollToYogaOfferings = () => {
    const element = document.getElementById('yoga-offerings');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section" style={{ backgroundColor: '#153F55' }}>
      {/* Desktop Background Video */}
      <video
        className="hero-video-desktop absolute inset-0 w-full h-full"
        autoPlay
        loop
        muted
        playsInline
        style={{ 
          filter: "brightness(0.6)"
        }}
      >
        <source src="/videos/Website.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* Mobile Background Video */}
      <video
        className="hero-video-mobile absolute inset-0 w-full h-full"
        autoPlay
        loop
        muted
        playsInline
        style={{ 
          filter: "brightness(0.6)"
        }}
      >
        <source src="/videos/mobile_movie.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium uppercase tracking-wider mb-12" style={{ color: '#F2E8DE' }}>
          Join the journey
        </h1>
        <button
          onClick={scrollToYogaOfferings}
          className="px-8 py-3 uppercase text-sm tracking-wider transition-colors hover:opacity-80"
          style={{ backgroundColor: '#B97230', color: '#F2E8DE' }}
        >
          Yoga Offerings
        </button>
      </div>
    </section>
  );
};

export default Hero;
