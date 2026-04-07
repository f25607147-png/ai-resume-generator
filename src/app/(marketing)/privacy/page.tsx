import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for ResumeAI - how we collect, use and protect your data.',
};

export default function PrivacyPage() {
  return (
    <div className="py-16 px-4">
      <div className="max-w-3xl mx-auto prose">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-500 text-sm mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Information We Collect</h2>
            <p className="leading-relaxed">We collect information you provide directly to us, such as when you create an account, build a resume, or contact us. This includes name, email address, and resume content.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. How We Use Your Information</h2>
            <p className="leading-relaxed">We use the information we collect to provide, maintain, and improve our services, process transactions, and send you technical notices and support messages.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Data Security</h2>
            <p className="leading-relaxed">We implement appropriate technical and organizational security measures to protect your personal information against unauthorized or unlawful processing, accidental loss, destruction, or damage.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Third-Party Services</h2>
            <p className="leading-relaxed">We use trusted third-party services including Supabase (database), Stripe (payments), and Groq (AI). Each of these services has their own privacy policy and data handling practices.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Your Rights</h2>
            <p className="leading-relaxed">You have the right to access, correct, or delete your personal data at any time. You can do this through your account settings or by contacting us directly.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Contact Us</h2>
            <p className="leading-relaxed">If you have any questions about this Privacy Policy, please contact us at privacy@resumeai.app</p>
          </section>
        </div>
      </div>
    </div>
  );
}
