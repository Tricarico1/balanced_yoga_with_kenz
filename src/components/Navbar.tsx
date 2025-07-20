"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [yogaDropdownOpen, setYogaDropdownOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  const scrollToYogaOfferings = () => {
    const element = document.getElementById('yoga-offerings');
    if (element) {
      const offset = 100; // Adjust this value to control the top spacing
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
    setYogaDropdownOpen(false);
  };

  const scrollToOnlineYoga = () => {
    const element = document.getElementById('online-yoga');
    if (element) {
      const offset = 100; // Adjust this value to control the top spacing
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
    setYogaDropdownOpen(false);
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
          {/* Yoga Dropdown */}
          <div className="relative group">
            <button
              onClick={() => setYogaDropdownOpen(!yogaDropdownOpen)}
              onMouseEnter={() => setYogaDropdownOpen(true)}
              onMouseLeave={() => setYogaDropdownOpen(false)}
              className="nav-link transition-colors duration-300 cursor-pointer hover:opacity-80 flex items-center"
              style={{ color: scrolled ? '#153F55' : '#F2E8DE' }}
            >
              Yoga
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div 
              className={`absolute top-full left-0 mt-2 w-48 rounded-md shadow-lg py-1 z-50 transition-all duration-200 ${yogaDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
              style={{ backgroundColor: '#F2E8DE' }}
              onMouseEnter={() => setYogaDropdownOpen(true)}
              onMouseLeave={() => setYogaDropdownOpen(false)}
            >
              <button
                onClick={scrollToYogaOfferings}
                className="block w-full text-left px-4 py-2 text-sm transition-colors hover:opacity-80"
                style={{ color: '#153F55' }}
              >
                In-Person Offerings
              </button>
              <button
                onClick={scrollToOnlineYoga}
                className="block w-full text-left px-4 py-2 text-sm transition-colors hover:opacity-80"
                style={{ color: '#153F55' }}
              >
                Online Offerings
              </button>
            </div>
          </div>

          {/* Membership */}
          <button
            onClick={() => {
              const element = document.getElementById('membership');
              if (element) {
                const offset = 100;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth'
                });
              }
            }}
            className="nav-link transition-colors duration-300 cursor-pointer hover:opacity-80"
            style={{ color: scrolled ? '#153F55' : '#F2E8DE' }}
          >
            Membership
          </button>

          {/* About Dropdown */}
          <div className="relative group">
            <button
              onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
              onMouseEnter={() => setAboutDropdownOpen(true)}
              onMouseLeave={() => setAboutDropdownOpen(false)}
              className="nav-link transition-colors duration-300 cursor-pointer hover:opacity-80 flex items-center"
              style={{ color: scrolled ? '#153F55' : '#F2E8DE' }}
            >
              About
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div 
              className={`absolute top-full left-0 mt-2 w-48 rounded-md shadow-lg py-1 z-50 transition-all duration-200 ${aboutDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
              style={{ backgroundColor: '#F2E8DE' }}
              onMouseEnter={() => setAboutDropdownOpen(true)}
              onMouseLeave={() => setAboutDropdownOpen(false)}
            >
              <button
                onClick={() => {
                  const element = document.getElementById('about');
                  if (element) {
                    const offset = 100;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                  setAboutDropdownOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm transition-colors hover:opacity-80"
                style={{ color: '#153F55' }}
              >
                The Inspiration
              </button>
              <button
                onClick={() => {
                  const element = document.getElementById('experience');
                  if (element) {
                    const offset = 100;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                  setAboutDropdownOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm transition-colors hover:opacity-80"
                style={{ color: '#153F55' }}
              >
                Experience
              </button>
            </div>
          </div>

          {/* Contact */}
          <button
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) {
                const offset = 100;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth'
                });
              }
            }}
            className="nav-link transition-colors duration-300 cursor-pointer hover:opacity-80"
            style={{ color: scrolled ? '#153F55' : '#F2E8DE' }}
          >
            Contact
          </button>
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
          ref={mobileMenuRef}
          className="md:hidden py-4 shadow-lg w-fit ml-auto fixed top-16 right-4 z-50"
          style={{ backgroundColor: '#F2E8DE' }}
        >
          <div className="flex flex-col space-y-4 px-4">
            {/* Yoga Mobile */}
            <div>
              <button
                onClick={() => setYogaDropdownOpen(!yogaDropdownOpen)}
                className="nav-link hover:opacity-80 flex items-center justify-end w-full"
                style={{ color: '#153F55' }}
              >
                <span className="text-right">Yoga</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {yogaDropdownOpen && (
                <div className="ml-4 mt-2 space-y-2">
                  <button
                    onClick={scrollToYogaOfferings}
                    className="block text-sm transition-colors hover:opacity-80 text-right w-full pr-4"
                    style={{ color: '#153F55' }}
                  >
                    In-Person Offerings
                  </button>
                  <button
                    onClick={scrollToOnlineYoga}
                    className="block text-sm transition-colors hover:opacity-80 text-right w-full pr-4"
                    style={{ color: '#153F55' }}
                  >
                    Online Offerings
                  </button>
                </div>
              )}
            </div>

            {/* Membership Mobile */}
            <button
              onClick={() => {
                const element = document.getElementById('membership');
                if (element) {
                  const offset = 100;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - offset;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                }
                setMobileMenuOpen(false);
              }}
              className="nav-link text-right hover:opacity-80" 
              style={{ color: '#153F55' }}
            >
              Membership
            </button>

            {/* About Mobile */}
            <div>
              <button
                onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                className="nav-link hover:opacity-80 flex items-center justify-end w-full"
                style={{ color: '#153F55' }}
              >
                <span className="text-right">About</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {aboutDropdownOpen && (
                <div className="ml-4 mt-2 space-y-2">
                  <Link
                    href="#about"
                    className="block text-sm transition-colors hover:opacity-80 text-right w-full pr-4"
                    style={{ color: '#153F55' }}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setAboutDropdownOpen(false);
                    }}
                  >
                    The Inspiration
                  </Link>
                  <Link
                    href="#experience"
                    className="block text-sm transition-colors hover:opacity-80 text-right w-full pr-4"
                    style={{ color: '#153F55' }}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setAboutDropdownOpen(false);
                    }}
                  >
                    Experience
                  </Link>
                </div>
              )}
            </div>

            {/* Contact Mobile */}
            <button
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) {
                  const offset = 100;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - offset;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                }
                setMobileMenuOpen(false);
              }}
              className="nav-link text-right hover:opacity-80" 
              style={{ color: '#153F55' }}
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
