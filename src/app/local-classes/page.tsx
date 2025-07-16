import Link from "next/link";

export default function LocalClasses() {
  return (
    <div style={{ backgroundColor: '#F2E8DE', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl lg:text-6xl uppercase font-medium text-center mb-6" style={{ color: '#153F55' }}>
            Local Classes
          </h1>
          <p className="text-center text-lg mb-8" style={{ color: '#486668' }}>
            Join our vibrant community for energizing group yoga sessions
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-medium uppercase mb-6" style={{ color: '#153F55' }}>
                Community Yoga Experience
              </h2>
              <div className="space-y-4">
                <div className="p-4 rounded-lg" style={{ backgroundColor: '#B97230' }}>
                  <h3 className="font-medium text-white mb-2">Community Energy</h3>
                  <p className="text-white text-sm">Practice alongside fellow yogis in a supportive, uplifting atmosphere.</p>
                </div>
                <div className="p-4 rounded-lg" style={{ backgroundColor: '#3D5019' }}>
                  <h3 className="font-medium text-white mb-2">Regular Schedule</h3>
                  <p className="text-white text-sm">Consistent class times to help you build a sustainable practice routine.</p>
                </div>
                <div className="p-4 rounded-lg" style={{ backgroundColor: '#92A07F' }}>
                  <h3 className="font-medium text-white mb-2">Variety of Styles</h3>
                  <p className="text-white text-sm">From gentle flow to power yoga, find the style that resonates with you.</p>
                </div>
              </div>
            </div>
            
            <div className="p-8 rounded-lg" style={{ backgroundColor: '#D7AE9C' }}>
              <h3 className="text-2xl font-medium uppercase mb-4 text-white">Class Information</h3>
              <ul className="space-y-3 text-white">
                <li>• 75-minute sessions</li>
                <li>• All experience levels</li>
                <li>• Mats and props provided</li>
                <li>• Drop-in or membership options</li>
                <li>• Early morning and evening classes</li>
                <li>• Weekend workshops available</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-16" style={{ backgroundColor: '#BB7458' }}>
        <div className="container-custom">
          <h2 className="text-3xl font-medium uppercase mb-8 text-center text-white">
            Weekly Schedule
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg" style={{ backgroundColor: '#F2E8DE' }}>
              <h3 className="font-medium mb-3" style={{ color: '#153F55' }}>Monday</h3>
              <p className="text-sm mb-2" style={{ color: '#486668' }}>6:00 AM - Morning Flow</p>
              <p className="text-sm mb-2" style={{ color: '#486668' }}>6:00 PM - Power Yoga</p>
            </div>
            <div className="p-6 rounded-lg" style={{ backgroundColor: '#F2E8DE' }}>
              <h3 className="font-medium mb-3" style={{ color: '#153F55' }}>Wednesday</h3>
              <p className="text-sm mb-2" style={{ color: '#486668' }}>6:00 AM - Gentle Flow</p>
              <p className="text-sm mb-2" style={{ color: '#486668' }}>6:00 PM - Vinyasa</p>
            </div>
            <div className="p-6 rounded-lg" style={{ backgroundColor: '#F2E8DE' }}>
              <h3 className="font-medium mb-3" style={{ color: '#153F55' }}>Friday</h3>
              <p className="text-sm mb-2" style={{ color: '#486668' }}>6:00 AM - Sunrise Flow</p>
              <p className="text-sm mb-2" style={{ color: '#486668' }}>6:00 PM - Restorative</p>
            </div>
            <div className="p-6 rounded-lg" style={{ backgroundColor: '#F2E8DE' }}>
              <h3 className="font-medium mb-3" style={{ color: '#153F55' }}>Saturday</h3>
              <p className="text-sm mb-2" style={{ color: '#486668' }}>9:00 AM - Weekend Flow</p>
              <p className="text-sm mb-2" style={{ color: '#486668' }}>11:00 AM - Beginner's</p>
            </div>
            <div className="p-6 rounded-lg" style={{ backgroundColor: '#F2E8DE' }}>
              <h3 className="font-medium mb-3" style={{ color: '#153F55' }}>Sunday</h3>
              <p className="text-sm mb-2" style={{ color: '#486668' }}>9:00 AM - Sunday Slow Flow</p>
              <p className="text-sm mb-2" style={{ color: '#486668' }}>4:00 PM - Meditation & Flow</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-medium uppercase mb-6" style={{ color: '#153F55' }}>
            Join Our Community
          </h2>
          <p className="mb-8" style={{ color: '#486668' }}>
            Start your yoga journey with our welcoming local classes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-3 uppercase text-sm tracking-wider transition-colors"
              style={{ backgroundColor: '#486668', color: '#F2E8DE' }}
            >
              Contact Us
            </Link>
            <Link
              href="/"
              className="px-8 py-3 uppercase text-sm tracking-wider transition-colors"
              style={{ backgroundColor: '#153F55', color: '#F2E8DE' }}
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 