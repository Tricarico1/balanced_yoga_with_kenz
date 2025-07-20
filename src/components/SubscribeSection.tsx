"use client";

import Link from "next/link";
import ImageSlider from "./ImageSlider";

const SubscribeSection = () => {
  return (
    <section id="yoga-offerings" className="py-16" style={{ backgroundColor: '#F2E8DE' }}>
      <div className="container-custom">
        <h2 className="text-2xl md:text-3xl lg:text-4xl uppercase font-medium text-center mb-4" style={{ color: '#153F55' }}>
          YOGA OFFERINGS
        </h2>
        
        {/* Welcome Banner */}
        <div className="mb-12 p-6 rounded-lg text-center" style={{ backgroundColor: '#486668' }}>
          <p className="text-white leading-relaxed">
            I am so happy you are here. Explore my offerings, don't hesitate to reach out, and let the beauty of this world fill your cup. From my heart to yours, welcome to YOGA. Welcome to SO. MUCH. MORE.
          </p>
        </div>

        {/* In-Person Yoga Section */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <h3 className="text-2xl font-medium uppercase mb-2" style={{ color: '#153F55' }}>
                In-Person Yoga
              </h3>
              <h4 className="text-lg font-medium mb-4" style={{ color: '#486668' }}>
                1-on-1 and Small Group
              </h4>
              <p className="leading-relaxed" style={{ color: '#3D5019' }}>
                Meet me at our beautiful home in Ithaca, NY--The Lakehouse--for private yoga classes. Set in the solarium Yoga Room or on the deck, I will customize the class for you and/or your friends. We can do yoga of any style while soaking in the beauty of the forest and lake. 1-on-1 and small group is my favorite to offer you personalized instruction and growth.
              </p>
            </div>
            
            {/* In-Person Yoga Image Slider */}
            <ImageSlider
              images={[
                "/images/In-person/Image 1.png",
                "/images/In-person/Image 2.png",
                "/images/In-person/Image 3.png",
                "/images/In-person/Image 4.png",
                "/images/In-person/Image 5.png",
                "/images/In-person/Image 6.png",
                "/images/In-person/Image 7.png"
              ]}
              alt="In-Person Yoga"
              height="h-80 lg:h-96"
              objectFit="cover"
              objectPosition="center"
            />
          </div>
        </div>

        {/* Blossom Yoga Studio Section */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Blossom Yoga Studio Image Slider */}
            <ImageSlider
              images={[
                "/images/yoga_offering/Image 1.webp",
                "/images/yoga_offering/Image 2.jpg"
              ]}
              alt="Blossom Yoga Studio"
              height="h-80 lg:h-96"
              objectFit="cover"
              objectPosition="center"
            />
            
            <div className="space-y-4">
              <h3 className="text-2xl font-medium uppercase mb-2" style={{ color: '#153F55' }}>
                Blossom Yoga Studio
              </h3>
              <p className="leading-relaxed" style={{ color: '#3D5019' }}>
                Join me at a local studio in downtown Ithaca, my favorite community in the Finger Lakes region of NY. My schedule is always shifting, so please check my socials and the studio website! Blossom yoga is a lovely place and divides their classes between "open level" and "advanced" yoga practice.
              </p>
            </div>
          </div>
        </div>

        {/* Online Yoga Section */}
        <div id="online-yoga" className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-medium uppercase mb-2" style={{ color: '#153F55' }}>
              Online Yoga
            </h3>
            <h4 className="text-lg font-medium mb-4" style={{ color: '#486668' }}>
              YouTube
            </h4>
            <p className="leading-relaxed max-w-4xl mx-auto" style={{ color: '#3D5019' }}>
              Subscribe to my YouTube Channel for a variety of free classes. Most of my YouTube classes are quick (10-30min) yoga stretches, workouts, or Pilates based videos filmed during my travels. These Yoga classes are great on their own, as an addition to your favorite workout, or as a beautiful way to squeeze a little peace (or sweaty workout) into your day!
            </p>
          </div>
          
          {/* YouTube Videos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* First 2 videos - always visible */}
            <div 
              className="aspect-video bg-black rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105"
              onClick={() => window.open('https://www.youtube.com/watch?v=sUu2Gf8fmd8', '_blank')}
            >
              <iframe
                src="https://www.youtube.com/embed/sUu2Gf8fmd8?modestbranding=1&showinfo=0&rel=0"
                title="Yoga Video 1"
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            
            <div 
              className="aspect-video bg-black rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105"
              onClick={() => window.open('https://www.youtube.com/watch?v=iZUUuXeCJQM', '_blank')}
            >
              <iframe
                src="https://www.youtube.com/embed/iZUUuXeCJQM?modestbranding=1&showinfo=0&rel=0"
                title="Yoga Video 2"
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            
            {/* Videos 3-6 - hidden on mobile, visible on md+ */}
            <div 
              className="hidden md:block aspect-video bg-black rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105"
              onClick={() => window.open('https://www.youtube.com/watch?v=rZcvvlKwwog', '_blank')}
            >
              <iframe
                src="https://www.youtube.com/embed/rZcvvlKwwog?modestbranding=1&showinfo=0&rel=0"
                title="Yoga Video 3"
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            
            <div 
              className="hidden md:block aspect-video bg-black rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105"
              onClick={() => window.open('https://www.youtube.com/watch?v=uN7hpBBMVxw', '_blank')}
            >
              <iframe
                src="https://www.youtube.com/embed/uN7hpBBMVxw?modestbranding=1&showinfo=0&rel=0"
                title="Yoga Video 4"
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            
            <div 
              className="hidden md:block aspect-video bg-black rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105"
              onClick={() => window.open('https://www.youtube.com/watch?v=h3-nD9t3Hig', '_blank')}
            >
              <iframe
                src="https://www.youtube.com/embed/h3-nD9t3Hig?modestbranding=1&showinfo=0&rel=0"
                title="Yoga Video 5"
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            
            <div 
              className="hidden md:block aspect-video bg-black rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105"
              onClick={() => window.open('https://www.youtube.com/watch?v=mg_eFtaVTP4', '_blank')}
            >
              <iframe
                src="https://www.youtube.com/embed/mg_eFtaVTP4?modestbranding=1&showinfo=0&rel=0"
                title="Yoga Video 6"
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
};

export default SubscribeSection;
