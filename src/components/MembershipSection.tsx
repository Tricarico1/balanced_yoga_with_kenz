"use client";

import { useState, useEffect } from "react";
import ContactPopup from "./ContactPopup";

const MembershipSection = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Auto-open popup after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPopupOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <section id="membership" className="py-8" style={{ backgroundColor: '#92A07F' }}>
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl lg:text-4xl uppercase font-medium mb-4" style={{ color: '#F2E8DE' }}>
            Membership
          </h3>
          <p className="leading-relaxed" style={{ color: '#F2E8DE' }}>
            No membership platform yet! But that is the goal as I grow and discover more yogis that want to join the journey. Please click{" "}
            <button
              onClick={() => setIsPopupOpen(true)}
              className="inline-block px-3 py-1 text-sm font-medium rounded-md border-2 border-current hover:bg-white hover:bg-opacity-20 transition-all duration-200 cursor-pointer"
              style={{ color: '#F2E8DE', borderColor: '#F2E8DE' }}
            >
              here
            </button>
            {" "}if you would like to be notified when a members-only platform is up and running for premium content and first dibs at yoga retreats with Kenz.
          </p>
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