"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      if (typeof window !== 'undefined') {
        const mobile = window.innerWidth < 768;
        setIsMobile(mobile);
      }
    };

    // Check on mount
    checkDevice();

    // Check on resize
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', checkDevice);
      return () => window.removeEventListener('resize', checkDevice);
    }
  }, []);

  const scrollToYogaOfferings = () => {
    const element = document.getElementById('yoga-offerings');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section" style={{ backgroundColor: '#153F55' }}>
      {/* Background Video with Overlay */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        style={{ 
          filter: "brightness(0.6)",
          ...(isMobile && { 
            objectPosition: 'center top' // Position to show top of video on mobile
          })
        }}
      >
        <source src={isMobile ? "/videos/mobile_movie.webm" : "/videos/Website.webm"} type="video/webm" />
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
