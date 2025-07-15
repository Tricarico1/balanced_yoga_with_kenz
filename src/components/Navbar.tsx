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

  return (
    <nav
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container-custom flex justify-between items-center py-4">
        <Link 
          href="/" 
          className={`text-lg md:text-xl font-medium uppercase tracking-wider transition-colors duration-300 ${
            scrolled ? "text-black" : "text-white"
          }`}
        >
          Balanced Yoga with Kenz
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            href="/" 
            className={`nav-link transition-colors duration-300 ${
              scrolled ? "text-black hover:text-gray-600" : "text-white hover:text-gray-300"
            }`}
          >
            Home
          </Link>
          <Link 
            href="/about" 
            className={`nav-link transition-colors duration-300 ${
              scrolled ? "text-black hover:text-gray-600" : "text-white hover:text-gray-300"
            }`}
          >
            About
          </Link>
          <Link 
            href="/contact" 
            className={`nav-link transition-colors duration-300 ${
              scrolled ? "text-black hover:text-gray-600" : "text-white hover:text-gray-300"
            }`}
          >
            Contact
          </Link>
          <Link
            href="/membership"
            className="bg-black text-white px-4 py-2 ml-2 uppercase text-sm tracking-wider hover:bg-neutral-800 transition-colors"
          >
            Membership
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden transition-colors duration-300 ${
            scrolled ? "text-black" : "text-white"
          }`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white w-full py-4 shadow-lg">
          <div className="container-custom flex flex-col space-y-4">
            <Link href="/" className="nav-link text-black hover:text-gray-600" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link href="/about" className="nav-link text-black hover:text-gray-600" onClick={() => setMobileMenuOpen(false)}>
              About
            </Link>
            <Link href="/contact" className="nav-link text-black hover:text-gray-600" onClick={() => setMobileMenuOpen(false)}>
              Contact
            </Link>
            <Link
              href="/membership"
              className="bg-black text-white px-4 py-2 uppercase text-sm tracking-wider hover:bg-neutral-800 transition-colors w-fit"
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
