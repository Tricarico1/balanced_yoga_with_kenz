import Navbar from '@/components/Navbar'
import Link from 'next/link'

export const metadata = {
  title: 'Terms of Service — Balanced Yoga with Kenz',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F2E8DE' }}>
      <Navbar forceScrolled />
      <div className="max-w-2xl mx-auto px-6 pt-28 pb-20">
        <p className="text-xs uppercase tracking-widest mb-2 font-medium" style={{ color: '#92A07F' }}>Legal</p>
        <h1 className="text-3xl font-medium mb-2" style={{ color: '#153F55' }}>Terms of Service</h1>
        <p className="text-sm mb-10" style={{ color: '#92A07F' }}>Last updated: March 2026</p>

        <div className="space-y-8 text-sm leading-relaxed" style={{ color: '#486668' }}>

          <section>
            <h2 className="text-base font-medium mb-3" style={{ color: '#153F55' }}>Acceptance of terms</h2>
            <p>By accessing or using Balanced Yoga with Kenz ("the platform"), you agree to be bound by these terms. If you do not agree, please do not use the platform.</p>
          </section>

          <section>
            <h2 className="text-base font-medium mb-3" style={{ color: '#153F55' }}>Use of the platform</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>You must be at least 18 years old to create an account.</li>
              <li>You are responsible for keeping your account credentials secure.</li>
              <li>One account per person. Sharing account access is not permitted.</li>
              <li>You agree not to reproduce, distribute, or publicly display any content from the platform without written permission.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-medium mb-3" style={{ color: '#153F55' }}>Content and membership</h2>
            <p>Access to video classes and member content requires a valid account. We reserve the right to update, modify, or remove content at any time. Membership access is personal and non-transferable.</p>
          </section>

          <section>
            <h2 className="text-base font-medium mb-3" style={{ color: '#153F55' }}>Health disclaimer</h2>
            <p>All yoga and fitness content on this platform is for informational and educational purposes only. Consult a qualified healthcare professional before beginning any exercise program. Balanced Yoga with Kenz is not responsible for any injury or health issue resulting from participation in classes.</p>
          </section>

          <section>
            <h2 className="text-base font-medium mb-3" style={{ color: '#153F55' }}>Intellectual property</h2>
            <p>All content on this platform — including videos, images, text, and branding — is owned by Mackenzie Homan / Balanced Yoga with Kenz and protected by copyright. Unauthorized use is prohibited.</p>
          </section>

          <section>
            <h2 className="text-base font-medium mb-3" style={{ color: '#153F55' }}>Termination</h2>
            <p>We reserve the right to suspend or terminate accounts that violate these terms, at our sole discretion.</p>
          </section>

          <section>
            <h2 className="text-base font-medium mb-3" style={{ color: '#153F55' }}>Limitation of liability</h2>
            <p>To the fullest extent permitted by law, Balanced Yoga with Kenz shall not be liable for any indirect, incidental, or consequential damages arising from use of the platform.</p>
          </section>

          <section>
            <h2 className="text-base font-medium mb-3" style={{ color: '#153F55' }}>Changes to these terms</h2>
            <p>We may update these terms from time to time. Continued use of the platform after changes constitutes your acceptance of the revised terms.</p>
          </section>

          <section>
            <h2 className="text-base font-medium mb-3" style={{ color: '#153F55' }}>Contact</h2>
            <p>Questions about these terms? Email us at <a href="mailto:nathanieltricarico@gmail.com" className="underline hover:opacity-70" style={{ color: '#B97230' }}>nathanieltricarico@gmail.com</a>.</p>
          </section>

        </div>

        <div className="mt-12 pt-8" style={{ borderTop: '1px solid #E8DDD5' }}>
          <Link href="/" className="text-sm hover:opacity-70 transition-opacity" style={{ color: '#92A07F' }}>← Back to home</Link>
        </div>
      </div>
    </div>
  )
}
