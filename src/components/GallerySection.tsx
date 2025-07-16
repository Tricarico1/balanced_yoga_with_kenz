"use client";

import Image from "next/image";

const GallerySection = () => {
  const images = [
    {
      src: "https://ext.same-assets.com/448708338/3045942430.jpeg",
      alt: "Yoga pose - Back bend"
    },
    {
      src: "https://ext.same-assets.com/448708338/2458853436.jpeg",
      alt: "Yoga pose - Bridge"
    },
    {
      src: "https://ext.same-assets.com/448708338/3045942430.jpeg",
      alt: "Yoga pose - Handstand"
    },
    {
      src: "https://ext.same-assets.com/448708338/4060489712.jpeg",
      alt: "Yoga pose - Split"
    }
  ];

  return (
    <section className="py-8" style={{ backgroundColor: '#3D5019' }}>
      <div className="grid grid-cols-2 md:grid-cols-4">
        {images.map((image, index) => (
          <div key={index} className="relative aspect-square w-full overflow-hidden">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default GallerySection;
