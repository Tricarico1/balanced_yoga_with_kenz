"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToYogaOfferings = () => {
    const element = document.getElementById('yoga-offerings');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-sm" : "bg-transparent"
      }`}
      style={{ 
        backgroundColor: scrolled ? '#F2E8DE' : 'transparent',
        borderBottom: scrolled ? '1px solid #BB7458' : 'none'
      }}
    >
      <div className="container-custom flex justify-between items-center py-4">
        <Link 
          href="/" 
          className={`text-lg md:text-xl font-medium uppercase tracking-wider transition-colors duration-300`}
          style={{ color: scrolled ? '#153F55' : '#F2E8DE' }}
        >
          Balanced Yoga with Kenz
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            href="/" 
            className="nav-link transition-colors duration-300 hover:opacity-80"
            style={{ color: scrolled ? '#153F55' : '#F2E8DE' }}
          >
            Home
          </Link>
          <button
            onClick={scrollToYogaOfferings}
            className="nav-link transition-colors duration-300 cursor-pointer hover:opacity-80"
            style={{ color: scrolled ? '#153F55' : '#F2E8DE' }}
          >
            Yoga Offerings
          </button>
          <Link 
            href="/about" 
            className="nav-link transition-colors duration-300 hover:opacity-80"
            style={{ color: scrolled ? '#153F55' : '#F2E8DE' }}
          >
            About
          </Link>
          <Link 
            href="/contact" 
            className="nav-link transition-colors duration-300 hover:opacity-80"
            style={{ color: scrolled ? '#153F55' : '#F2E8DE' }}
          >
            Contact
          </Link>
          <Link
            href="/membership"
            className="px-4 py-2 ml-2 uppercase text-sm tracking-wider transition-colors hover:opacity-80"
            style={{ 
              backgroundColor: '#B97230', 
              color: '#F2E8DE'
            }}
          >
            Membership
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden transition-colors duration-300"
          style={{ color: scrolled ? '#153F55' : '#F2E8DE' }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden w-full py-4 shadow-lg"
          style={{ backgroundColor: '#F2E8DE' }}
        >
          <div className="container-custom flex flex-col space-y-4">
            <Link 
              href="/" 
              className="nav-link hover:opacity-80" 
              style={{ color: '#153F55' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <button
              onClick={scrollToYogaOfferings}
              className="nav-link text-left hover:opacity-80"
              style={{ color: '#153F55' }}
            >
              Yoga Offerings
            </button>
            <Link 
              href="/about" 
              className="nav-link hover:opacity-80" 
              style={{ color: '#153F55' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="nav-link hover:opacity-80" 
              style={{ color: '#153F55' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/membership"
              className="px-4 py-2 uppercase text-sm tracking-wider transition-colors w-fit hover:opacity-80"
              style={{ 
                backgroundColor: '#B97230', 
                color: '#F2E8DE'
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Membership
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
