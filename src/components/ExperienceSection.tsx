"use client";

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-16" style={{ backgroundColor: '#3D5019' }}>
      <div className="container-custom">
        <h2 className="text-2xl md:text-3xl lg:text-4xl uppercase font-medium text-center mb-8" style={{ color: '#F2E8DE' }}>
          EXPERIENCE:
        </h2>
        
        {/* Two Image Placeholders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="w-full h-64 rounded-lg flex items-center justify-center border-2" style={{ backgroundColor: '#000000', borderColor: '#E5E7EB' }}>
            <p className="text-white text-center">Image/Video Placeholder</p>
          </div>
          <div className="w-full h-64 rounded-lg flex items-center justify-center border-2" style={{ backgroundColor: '#000000', borderColor: '#E5E7EB' }}>
            <p className="text-white text-center">Image/Video Placeholder</p>
          </div>
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