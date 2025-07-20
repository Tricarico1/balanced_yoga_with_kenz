"use client";

import ImageSlider from "./ImageSlider";

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-16" style={{ backgroundColor: '#3D5019' }}>
      <div className="container-custom">
        <h2 className="text-2xl md:text-3xl lg:text-4xl uppercase font-medium text-center mb-8" style={{ color: '#F2E8DE' }}>
          EXPERIENCE:
        </h2>
        
        {/* Two Image Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Left Image Slider */}
          <ImageSlider
            images={[
              "/images/exp_left/Image 1 (1).png",
              "/images/exp_left/Image 2 (1).png",
              "/images/exp_left/Image 3 (1).png",
              "/images/exp_left/Image 4 (1).png",
              "/images/exp_left/Image 5 (1).png"
            ]}
            alt="Experience Left"
            height="h-64"
            objectFit="cover"
            objectPosition="center"
          />
          
          {/* Right Image Slider */}
          <ImageSlider
            images={[
              "/images/exp_right/Image 1 (2).png",
              "/images/exp_right/Image 2 (2).png",
              "/images/exp_right/Image 3 (2).png",
              "/images/exp_right/Image 4 (2).png",
              "/images/exp_right/Image 5 (2).png"
            ]}
            alt="Experience Right"
            height="h-64"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
        
        {/* Text Content */}
        <div className="max-w-4xl mx-auto space-y-6">
          <p className="leading-relaxed" style={{ color: '#F2E8DE' }}>
            I've been dancing since I was born and competitively danced in my teen years. I began teaching dance around the same time, and still love to guest teach when possible. In college, I was president of an amazing dance club, which opened my eyes to the nuances of dance as artistry.
          </p>
          
          <p className="leading-relaxed" style={{ color: '#F2E8DE' }}>
            While I have practiced Yoga and Pilates throughout most of those teen years, I completed my 200YRT Yoga Teacher Training while in graduate school and began studying and practicing yoga in earnest. From my yoga studies, teaching classes in PA and NY, and my lovely yoga mentors, I feel very excited to share what I have learned with you.{" "}
            <span className="block text-center text-lg font-medium mt-4">
              Forever a student, blessed to be a teacher.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection; 