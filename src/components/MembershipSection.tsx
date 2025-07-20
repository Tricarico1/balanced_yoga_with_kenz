"use client";

import { useState } from "react";
import ContactPopup from "./ContactPopup";

const MembershipSection = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  return (
    <section id="membership" className="pt-8 pb-8" style={{ backgroundColor: '#92A07F' }}>
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Membership Title with Bubble */}
          <div className="text-center mb-8">
            <div className="inline-block px-8 py-3 rounded-lg" style={{ backgroundColor: '#B97230' }}>
              <h3 className="text-2xl md:text-3xl lg:text-4xl uppercase font-medium" style={{ color: '#153F55' }}>
                MEMBERSHIP
              </h3>
            </div>
          </div>
          
          <div className="p-8 rounded-lg" style={{ backgroundColor: '#92A07F' }}>
            <p className="leading-relaxed text-center" style={{ color: '#F2E8DE' }}>
              No membership platform yet! But that is the goal as I grow and discover more yogis that want to join the journey. Please click{" "}
              <button 
                onClick={() => setIsPopupOpen(true)}
                className="underline hover:opacity-80 transition-opacity cursor-pointer"
                style={{ color: '#F2E8DE' }}
              >
                here
              </button>
              {" "}if you would like to be notified when a members-only platform is up and running for premium content and first dibs at yoga retreats with Kenz.
            </p>
          </div>
        </div>
      </div>
      
      {/* Contact Popup */}
      <ContactPopup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
      />
    </section>
  );
};

export default MembershipSection; 