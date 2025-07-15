import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <main>
      <Navbar />

      <div className="pt-28 pb-16 bg-black text-white">
        <div className="container-custom">
          <h1 className="text-3xl md:text-5xl uppercase font-medium mb-8">Contact</h1>
        </div>
      </div>

      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left side - Contact Info */}
            <div>
              <h2 className="text-2xl font-medium mb-6">Get in Touch</h2>

              <div className="space-y-4 mb-8">
                <p>
                  For inquiries about classes, collaborations, or any questions,
                  please feel free to reach out.
                </p>

                <div>
                  <p className="font-medium">Email:</p>
                  <p>contact@francescagolfetto.com</p>
                </div>

                <div>
                  <p className="font-medium">Follow on Social Media:</p>
                  <div className="flex space-x-4 mt-2">
                    <a
                      href="https://www.instagram.com/francesca.golfetto"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black hover:text-gray-600 transition-colors"
                    >
                      Instagram
                    </a>
                    <a
                      href="https://www.youtube.com/channel/UCksNr5KboqGBEHzb1K8AGNg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black hover:text-gray-600 transition-colors"
                    >
                      YouTube
                    </a>
                    <a
                      href="https://www.facebook.com/francesca.golfetto.18"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black hover:text-gray-600 transition-colors"
                    >
                      Facebook
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-4">Online Studio</h3>
                <p className="mb-4">
                  Practice with me online through my virtual yoga studio. Access exclusive
                  classes and personalized instruction from the comfort of your home.
                </p>
                <a
                  href="https://studio.francescagolfetto.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-block mt-2"
                >
                  Visit Online Studio
                </a>
              </div>
            </div>

            {/* Right side - Contact Form */}
            <div>
              <h2 className="text-2xl font-medium mb-6">Send a Message</h2>

              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block mb-1">Name</label>
                  <Input id="name" type="text" required />
                </div>

                <div>
                  <label htmlFor="email" className="block mb-1">Email</label>
                  <Input id="email" type="email" required />
                </div>

                <div>
                  <label htmlFor="subject" className="block mb-1">Subject</label>
                  <Input id="subject" type="text" required />
                </div>

                <div>
                  <label htmlFor="message" className="block mb-1">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full border rounded-md p-3"
                    required
                  ></textarea>
                </div>

                <Button type="submit" className="btn-primary w-full">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
