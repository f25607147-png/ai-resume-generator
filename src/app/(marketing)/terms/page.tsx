import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service for ResumeAI.',
};

export default function TermsPage() {
  return (
    <div className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-gray-500 text-sm mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p className="leading-relaxed">By accessing or using ResumeAI, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Use of Service</h2>
            <p className="leading-relaxed">You may use ResumeAI for personal, non-commercial purposes. You agree not to misuse the service, attempt to access unauthorized areas, or use AI generation for deceptive purposes.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Account Responsibilities</h2>
            <p className="leading-relaxed">You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Subscription and Billing</h2>
            <p className="leading-relaxed">Pro subscriptions are billed monthly. You may cancel at any time. Refunds are provided within 14 days of purchase if you are unsatisfied with the service.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Intellectual Property</h2>
            <p className="leading-relaxed">You own all content you create with ResumeAI. We claim no rights to your resume content. Our service, templates, and branding are our intellectual property.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Limitation of Liability</h2>
            <p className="leading-relaxed">ResumeAI is provided &quot;as is&quot; without warranties. We are not responsible for employment outcomes. Our liability is limited to the amount paid for the service in the past 12 months.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Contact</h2>
            <p className="leading-relaxed">For questions about these Terms, contact us at legal@resumeai.app</p>
          </section>
        </div>
      </div>
    </div>
  );
}
