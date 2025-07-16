import Link from "next/link";

export default function PrivateSmallGroups() {
  return (
    <div style={{ backgroundColor: '#F2E8DE', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl lg:text-6xl uppercase font-medium text-center mb-6" style={{ color: '#153F55' }}>
            Private Small Groups
          </h1>
          <p className="text-center text-lg mb-8" style={{ color: '#486668' }}>
            Intimate yoga sessions designed for deeper connection and personalized guidance
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-medium uppercase mb-6" style={{ color: '#153F55' }}>
                Why Choose Private Small Groups?
              </h2>
              <div className="space-y-4">
                <div className="p-4 rounded-lg" style={{ backgroundColor: '#BB7458' }}>
                  <h3 className="font-medium text-white mb-2">Personalized Attention</h3>
                  <p className="text-white text-sm">Receive focused guidance tailored to your specific needs and goals.</p>
                </div>
                <div className="p-4 rounded-lg" style={{ backgroundColor: '#904913' }}>
                  <h3 className="font-medium text-white mb-2">Intimate Setting</h3>
                  <p className="text-white text-sm">Practice in a comfortable, supportive environment with like-minded individuals.</p>
                </div>
                <div className="p-4 rounded-lg" style={{ backgroundColor: '#92A07F' }}>
                  <h3 className="font-medium text-white mb-2">Flexible Scheduling</h3>
                  <p className="text-white text-sm">Choose times that work best for your schedule and lifestyle.</p>
                </div>
              </div>
            </div>
            
            <div className="p-8 rounded-lg" style={{ backgroundColor: '#D7AE9C' }}>
              <h3 className="text-2xl font-medium uppercase mb-4 text-white">Session Details</h3>
              <ul className="space-y-3 text-white">
                <li>• 60-90 minute sessions</li>
                <li>• Groups of 2-6 participants</li>
                <li>• All skill levels welcome</li>
                <li>• Customized sequences</li>
                <li>• Mindful breathing techniques</li>
                <li>• Meditation integration</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-medium uppercase mb-6" style={{ color: '#153F55' }}>
            Ready to Begin?
          </h2>
          <p className="mb-8" style={{ color: '#486668' }}>
            Contact us to schedule your private small group session
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