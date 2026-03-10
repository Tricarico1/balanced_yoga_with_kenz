import Navbar from '@/components/Navbar'
import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy — Balanced Yoga with Kenz',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F2E8DE' }}>
      <Navbar forceScrolled />
      <div className="max-w-2xl mx-auto px-6 pt-28 pb-20">
        <p className="text-xs uppercase tracking-widest mb-2 font-medium" style={{ color: '#92A07F' }}>Legal</p>
        <h1 className="text-3xl font-medium mb-2" style={{ color: '#153F55' }}>Privacy Policy</h1>
        <p className="text-sm mb-10" style={{ color: '#92A07F' }}>Last updated: March 2026</p>

        <div className="space-y-8 text-sm leading-relaxed" style={{ color: '#486668' }}>

          <section>
            <h2 className="text-base font-medium mb-3" style={{ color: '#153F55' }}>Who we are</h2>
            <p>Balanced Yoga with Kenz is an online yoga platform operated by Mackenzie Homan. You can reach us at <a href="mailto:nathanieltricarico@gmail.com" className="underline hover:opacity-70" style={{ color: '#B97230' }}>nathanieltricarico@gmail.com</a>.</p>
          </section>

          <section>
            <h2 className="text-base font-medium mb-3" style={{ color: '#153F55' }}>What information we collect</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li><strong>Account information</strong> — your name and email address when you create an account or sign in with Google.</li>
              <li><strong>Usage data</strong> — pages visited and classes watched, used to improve the experience.</li>
              <li><strong>Communications</strong> — your email if you sign up for membership updates.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-medium mb-3" style={{ color: '#153F55' }}>How we use your information</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>To provide access to your yoga classes and member content.</li>
              <li>To send occasional updates about new classes or site changes.</li>
              <li>We do not sell your data to third parties.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-medium mb-3" style={{ color: '#153F55' }}>Third-party services</h2>
            <p>We use the following services to operate the platform:</p>
            <ul className="space-y-2 list-disc list-inside mt-2">
              <li><strong>Supabase</strong> — authentication and data storage</li>
              <li><strong>Bunny.net</strong> — video hosting and delivery</li>
              <li><strong>Google Sign In</strong> — optional OAuth login</li>
              <li><strong>Brevo</strong> — email communications</li>
            </ul>
            <p className="mt-3">Each service has its own privacy policy governing how they handle data.</p>
          </section>

          <section>
            <h2 className="text-base font-medium mb-3" style={{ color: '#153F55' }}>Data retention</h2>
            <p>We retain your account information for as long as your account is active. You can request deletion of your data at any time by emailing us.</p>
          </section>

          <section>
            <h2 className="text-base font-medium mb-3" style={{ color: '#153F55' }}>Your rights</h2>
            <p>You have the right to access, correct, or delete your personal data. To make a request, contact us at <a href="mailto:nathanieltricarico@gmail.com" className="underline hover:opacity-70" style={{ color: '#B97230' }}>nathanieltricarico@gmail.com</a>.</p>
          </section>

          <section>
            <h2 className="text-base font-medium mb-3" style={{ color: '#153F55' }}>Cookies</h2>
            <p>We use cookies only for authentication (keeping you signed in). We do not use tracking or advertising cookies.</p>
          </section>

          <section>
            <h2 className="text-base font-medium mb-3" style={{ color: '#153F55' }}>Changes to this policy</h2>
            <p>We may update this policy occasionally. Continued use of the site after changes constitutes acceptance of the updated policy.</p>
          </section>

          <section>
            <h2 className="text-base font-medium mb-3" style={{ color: '#153F55' }}>Contact</h2>
            <p>Questions? Email us at <a href="mailto:nathanieltricarico@gmail.com" className="underline hover:opacity-70" style={{ color: '#B97230' }}>nathanieltricarico@gmail.com</a>.</p>
          </section>
        </div>

        <div className="mt-12 pt-8" style={{ borderTop: '1px solid #E8DDD5' }}>
          <Link href="/" className="text-sm hover:opacity-70 transition-opacity" style={{ color: '#92A07F' }}>← Back to home</Link>
        </div>
      </div>
    </div>
  )
}
