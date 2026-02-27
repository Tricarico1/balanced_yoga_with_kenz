"use client";

import Link from "next/link";
import ImageSlider from "./ImageSlider";
import { youtubeVideoIds } from "@/lib/youtube";

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

        {/* In-Person Offerings — 3 columns */}
        <div className="mb-16">
          <h3 className="text-2xl font-medium uppercase text-center mb-10" style={{ color: '#153F55' }}>
            In-Person Yoga
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Blossom Yoga Studio */}
            <div>
              <h4 className="text-lg font-medium uppercase mb-3" style={{ color: '#153F55' }}>
                Blossom Yoga Studio
              </h4>
              <p className="leading-relaxed mb-6 text-sm" style={{ color: '#3D5019' }}>
                Join me at a local studio in downtown Ithaca, my favorite community in the Finger Lakes region of NY. My schedule is always shifting, so please check my socials and the studio website! Blossom Yoga is a lovely place and divides their classes between "open level" and "advanced" yoga practice.
              </p>
              <ImageSlider
                images={[
                  "/images/yoga_offering/Image 1.webp",
                  "/images/yoga_offering/Image 2.jpg"
                ]}
                alt="Blossom Yoga Studio"
                height="h-64"
                objectFit="cover"
                objectPosition="center"
              />
            </div>

            {/* Cornell */}
            <div>
              <h4 className="text-lg font-medium uppercase mb-3" style={{ color: '#153F55' }}>
                Cornell
              </h4>
              <p className="leading-relaxed mb-6 text-sm" style={{ color: '#3D5019' }}>
                Coming soon. Stay tuned for yoga classes at Cornell University.
              </p>
              <img
                src="https://images.unsplash.com/photo-1760960553755-0f355491749e?fm=jpg&q=80&w=800&auto=format&fit=crop"
                alt="Cornell University campus"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>

            {/* 1:1 / Small Group / Private Event */}
            <div>
              <h4 className="text-lg font-medium uppercase mb-3" style={{ color: '#153F55' }}>
                1:1 / Small Group / Private Event
              </h4>
              <p className="leading-relaxed mb-6 text-sm" style={{ color: '#3D5019' }}>
                Meet me at our beautiful home in Ithaca, NY — The Lakehouse — for private yoga classes. Set in the solarium Yoga Room or on the deck, I will customize the class for you and/or your friends. We can do yoga of any style while soaking in the beauty of the forest and lake.
              </p>
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
                alt="1:1 and Small Group Yoga"
                height="h-64"
                objectFit="cover"
                objectPosition="center"
              />
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
            {youtubeVideoIds.map((id, index) => (
              <div
                key={id}
                className={`${index >= 2 ? "hidden md:block" : ""} aspect-video bg-black rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105`}
                onClick={() => window.open(`https://www.youtube.com/watch?v=${id}`, "_blank")}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${id}?modestbranding=1&showinfo=0&rel=0`}
                  title={`Yoga Video ${index + 1}`}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ))}
          </div>
        </div>


      </div>
    </section>
  );
};

export default SubscribeSection;
