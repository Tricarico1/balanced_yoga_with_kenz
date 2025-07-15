import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MembershipPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-rose-100">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 flex items-center justify-center min-h-screen relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-rose-200 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-24 h-24 bg-rose-300 rounded-full opacity-40 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-rose-100 rounded-full opacity-50"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-rose-400 rounded-full opacity-20 animate-pulse"></div>
        
        <div className="container-custom text-center relative z-10">
          {/* Main Content */}
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-gray-800 mb-8 tracking-wider">
              COMING
            </h1>
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-extralight text-rose-500 mb-12 tracking-widest">
              SOON
            </h2>
            
            {/* Decorative Line */}
            <div className="flex items-center justify-center mb-12">
              <div className="h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent w-32"></div>
              <div className="mx-4 w-2 h-2 bg-rose-400 rounded-full"></div>
              <div className="h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent w-32"></div>
            </div>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              We're crafting something beautiful for your yoga journey. 
              A sanctuary where movement meets mindfulness, 
              where community grows, and where your practice deepens.
            </p>
            
            <p className="text-base md:text-lg text-gray-500 mb-12 font-light">
              Be the first to know when we launch our exclusive membership experience.
            </p>
            
            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="mailto:mackenziephoman@gmail.com?subject=Membership Interest"
                className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Get Notified
              </a>
              <a
                href="/contact"
                className="border-2 border-rose-400 text-rose-600 hover:bg-rose-400 hover:text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300"
              >
                Learn More
              </a>
            </div>
          </div>
          
          {/* Artistic Elements */}
          <div className="mt-20 relative">
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="w-1 h-16 bg-gradient-to-b from-rose-300 to-transparent"></div>
              <div className="w-1 h-24 bg-gradient-to-b from-rose-400 to-transparent"></div>
              <div className="w-1 h-20 bg-gradient-to-b from-rose-300 to-transparent"></div>
              <div className="w-1 h-32 bg-gradient-to-b from-rose-500 to-transparent"></div>
              <div className="w-1 h-20 bg-gradient-to-b from-rose-300 to-transparent"></div>
              <div className="w-1 h-24 bg-gradient-to-b from-rose-400 to-transparent"></div>
              <div className="w-1 h-16 bg-gradient-to-b from-rose-300 to-transparent"></div>
            </div>
          </div>
        </div>
        
        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg className="relative block w-full h-20" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,60 C200,100 400,20 600,60 C800,100 1000,20 1200,60 L1200,120 L0,120 Z" fill="rgba(251, 207, 232, 0.3)"></path>
          </svg>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 