"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageSliderProps {
  images: string[];
  alt: string;
  className?: string;
  height?: string; // e.g., "h-64", "h-80", "h-96"
  objectFit?: "cover" | "contain" | "fill" | "scale-down";
  objectPosition?: string; // e.g., "center", "top", "bottom", "left", "right"
}

const ImageSlider = ({ 
  images, 
  alt, 
  className = "", 
  height = "h-64 lg:h-80",
  objectFit = "cover",
  objectPosition = "center"
}: ImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  if (images.length === 0) {
    return (
      <div className={`w-full ${height} rounded-lg flex items-center justify-center ${className}`} style={{ backgroundColor: '#000000' }}>
        <p className="text-white text-center">No images available</p>
      </div>
    );
  }

  return (
    <div className={`relative w-full ${height} rounded-lg overflow-hidden ${className}`}>
      <Image
        src={images[currentIndex]}
        alt={`${alt} ${currentIndex + 1}`}
        fill
        className={`object-${objectFit}`}
        style={{ objectPosition }}
      />
      
      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          {/* Previous Button */}
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all duration-200"
            aria-label="Previous image"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {/* Next Button */}
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all duration-200"
            aria-label="Next image"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Image Counter */}
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageSlider; 