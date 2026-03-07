"use client";

import { useState } from "react";
import Image from "next/image";

interface ContactPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactPopup = ({ isOpen, onClose }: ContactPopupProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, newsletterOptIn: true }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send');
      }

      setSubmitStatus("success");
      setName("");
      setEmail("");

      setTimeout(() => {
        onClose();
        setSubmitStatus("idle");
      }, 2500);

    } catch (error) {
      console.error('Submit error:', error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className="relative w-full overflow-hidden rounded-xl"
        style={{
          maxWidth: '780px',
          backgroundColor: '#F5EFE8',
          border: '1.5px dashed #C4B5A8',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col sm:flex-row">

          {/* Image — top banner on mobile, right column on desktop */}
          <div className="relative h-40 sm:h-auto sm:w-72 sm:flex-shrink-0 order-first sm:order-last">
            <Image
              src="/images/carry-on-flow.png"
              alt="Yoga on the beach"
              fill
              className="object-cover"
              style={{ objectPosition: 'center 53%' }}
            />
          </div>

          {/* Text + form */}
          <div className="flex-1 p-5 sm:p-10 flex flex-col justify-center order-last sm:order-first">
            <h2
              className="text-xl sm:text-5xl mb-1 sm:mb-4 leading-tight"
              style={{ color: '#3D5019', fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: 400 }}
            >
              The Carry-on Flow
            </h2>

            <p className="text-xs mb-1 sm:mb-4 sm:text-sm" style={{ color: '#486668' }}>
              This 5-minute reset is your &ldquo;secret weapon.&rdquo;
            </p>

            <p className="hidden sm:block text-sm italic mb-3 leading-relaxed" style={{ color: '#486668' }}>
              You know that stiff, achy feeling after a flight? As a fellow traveler, I know how you feel.
            </p>

            <p className="text-xs sm:text-sm italic mb-2 sm:mb-6 leading-snug" style={{ color: '#486668' }}>
              The perfect reset for body and mind, available wherever you and your passport land.
            </p>

            <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3" suppressHydrationWarning>
              <p className="text-xs px-2 py-1.5 sm:px-3 sm:py-3 rounded-md sm:text-sm" style={{ backgroundColor: '#E8D9C4', color: '#3D5019' }}>
                Enter your email and I will send this <span style={{ fontWeight: 700 }}>exclusive</span> 5min Yoga class straight to your inbox, not posted anywhere else!
              </p>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your.email@example.com"
                autoComplete="email"
                suppressHydrationWarning
                className="w-full px-3 py-2 text-sm rounded-md border outline-none focus:ring-2 focus:ring-amber-300 transition-shadow"
                style={{ borderColor: '#C4B5A8', color: '#153F55', backgroundColor: 'white' }}
              />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Your name"
                autoComplete="name"
                suppressHydrationWarning
                className="w-full px-3 py-2 text-sm rounded-md border outline-none focus:ring-2 focus:ring-amber-300 transition-shadow"
                style={{ borderColor: '#C4B5A8', color: '#153F55', backgroundColor: 'white' }}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 sm:py-2.5 text-sm font-medium rounded-md transition-opacity hover:opacity-85 disabled:opacity-50"
                style={{ backgroundColor: '#153F55', color: 'white' }}
              >
                {isSubmitting ? 'Sending…' : 'Send me the class'}
              </button>

              {submitStatus === "success" && (
                <p className="text-xs sm:text-sm text-center pt-1" style={{ color: '#3D5019' }}>
                  Check your inbox — your class is on its way!
                </p>
              )}
              {submitStatus === "error" && (
                <p className="text-xs sm:text-sm text-center pt-1" style={{ color: '#B97230' }}>
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPopup;
