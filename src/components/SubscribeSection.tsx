"use client";

import Link from "next/link";

const SubscribeSection = () => {
  return (
    <section id="yoga-offerings" className="py-16" style={{ backgroundColor: '#F2E8DE' }}>
      <div className="container-custom">
        <h2 className="text-2xl md:text-3xl lg:text-4xl uppercase font-medium text-center mb-4" style={{ color: '#153F55' }}>
          YOGA OFFERINGS
        </h2>
        <p className="text-center mb-12" style={{ color: '#3D5019' }}>
          start your movement practice to enhance your life and land back into your body.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Section - In Person */}
          <div className="space-y-6 flex flex-col h-full">
            <h3 className="text-2xl font-medium uppercase mb-6" style={{ color: '#153F55' }}>
              In Person
            </h3>
            
            {/* Two buttons side by side */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Link
                href="/private-small-groups"
                className="p-6 rounded-lg text-center transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{ backgroundColor: '#B97230', color: '#F2E8DE' }}
              >
                <h4 className="font-medium text-lg uppercase">Private small groups</h4>
              </Link>
              <Link
                href="/local-classes"
                className="p-6 rounded-lg text-center transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{ backgroundColor: '#B97230', color: '#F2E8DE' }}
              >
                <h4 className="font-medium text-lg uppercase">Local classes</h4>
              </Link>
            </div>
            
            {/* Large text box */}
            <div 
              className="p-6 rounded-lg flex-grow"
              style={{ backgroundColor: '#92A07F' }}
            >
              <p className="text-white leading-relaxed">
                Experience the transformative power of in-person yoga sessions. Whether you prefer the intimacy of private small group sessions or the energy of local community classes, each practice is designed to deepen your connection to body, mind, and spirit. Join us on the mat for authentic, guided movement and mindful exploration.
              </p>
            </div>
          </div>

          {/* Right Section - Youtube */}
          <div className="space-y-6 flex flex-col h-full">
            <h3 className="text-2xl font-medium uppercase mb-6" style={{ color: '#153F55' }}>
              Youtube
            </h3>
            
            {/* Two YouTube preview boxes */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div 
                className="p-4 rounded-lg text-center transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
                onClick={() => window.open('https://www.youtube.com/watch?v=sUu2Gf8fmd8', '_blank')}
              >
                <div className="aspect-video mb-3 bg-black rounded overflow-hidden relative">
                  <iframe
                    src="https://www.youtube.com/embed/sUu2Gf8fmd8?modestbranding=1&showinfo=0&rel=0"
                    title="Yoga Video 1"
                    className="w-full h-full video-scale-desktop"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <h4 className="font-medium text-sm uppercase" style={{ color: '#153F55' }}>Video</h4>
              </div>
              <div 
                className="p-4 rounded-lg text-center transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
                onClick={() => window.open('https://www.youtube.com/watch?v=iZUUuXeCJQM', '_blank')}
              >
                <div className="aspect-video mb-3 bg-black rounded overflow-hidden relative">
                  <iframe
                    src="https://www.youtube.com/embed/iZUUuXeCJQM?modestbranding=1&showinfo=0&rel=0"
                    title="Yoga Video 2"
                    className="w-full h-full video-scale-desktop"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <h4 className="font-medium text-sm uppercase" style={{ color: '#153F55' }}>Video</h4>
              </div>
            </div>
            
            {/* Empty space to match the height of the left section */}
            <div className="flex-grow"></div>
          </div>
        </div>


        {/* Call to Action */}

      </div>
    </section>
  );
};

export default SubscribeSection;
