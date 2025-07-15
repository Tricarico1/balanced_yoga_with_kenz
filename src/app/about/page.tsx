import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main>
      <Navbar />

      <div className="pt-28 pb-16 bg-black text-white">
        <div className="container-custom">
          <h1 className="text-3xl md:text-5xl uppercase font-medium mb-8">about</h1>
        </div>
      </div>

      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left side - Image */}
            <div className="relative aspect-[3/4] w-full">
              <Image
                src="https://ext.same-assets.com/448708338/4147323916.jpeg"
                alt="Mackenzie Homan"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Right side - Bio */}
            <div>
              <h2 className="text-xl mb-4">Hi!</h2>

              <div className="space-y-4">
                <p>
                  My name is Francesca ("Chicca"), I am a professional ballet dancer, certified yoga instructor and a mother of two.
                </p>

                <p>
                  Some years back, I graduated from both Milan and Royal Ballet School in London. From the age of 17,
                  I danced full time at Royal Ballet (London), Zurich Opera House and Den Norske Opera & Ballett
                  and throughout my career I enjoyed the chance to perform on stages all around the world.
                </p>

                <p>
                  My interest toward yoga started in 2007, as a hobby, to keep my body healthy and to release
                  physical and mental tensions created from the strenuous ballet regime. It was through an
                  injury that yoga became my healing resource and my passion.
                </p>

                <p>
                  I completed the Ashtanga 500hr RYT TT, 100hr RYT TT Vinyasa, 80hrs Dharma yoga wheel TT
                  and 100hrs Pregnancy Yoga RYT TT. In 2017 I received an official authorization to teach
                  the Primary and Intermediate series of Ashtanga yoga from Manju Jois.
                </p>

                <p>
                  I have taught sevaral Teacher Trainings and Yoga retreats.
                </p>

                <p>
                  Yoga has quickly given me many new dimensions to the already extensive experience
                  with physical and mental exercises. Practicing and teaching yoga has been a life
                  changer for me and become my lifestyle.
                </p>

                <p>
                  My passion is sharing my experience and knowledge, as well as continuously learning more.
                  I love bringing the balance of discipline and positive energy to students and colleagues
                  in the yoga community.
                </p>

                <p>
                  I teach daily classes as well as festivals such as the Yoga Games.
                </p>

                <p>
                  Since 2023 you can practice with me Online in my Online Studio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
