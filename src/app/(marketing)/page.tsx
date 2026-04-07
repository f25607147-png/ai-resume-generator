import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI-Powered Resume Builder - Land Your Dream Job',
  description: 'Create professional, ATS-optimized resumes in minutes using AI. Choose from beautiful templates and export to PDF for free.',
};

const features = [
  {
    icon: '✨',
    title: 'AI-Powered Content',
    description: 'Generate compelling resume content tailored to any job description using advanced AI.',
  },
  {
    icon: '🎨',
    title: 'Beautiful Templates',
    description: 'Choose from Modern, Classic, and Minimal templates that stand out to recruiters.',
  },
  {
    icon: '📄',
    title: 'PDF Export',
    description: 'Export your resume as a high-quality PDF ready to send to employers.',
  },
  {
    icon: '⚡',
    title: 'Real-time Preview',
    description: 'See your changes reflected instantly with live preview as you type.',
  },
  {
    icon: '🎯',
    title: 'ATS Optimized',
    description: 'Templates designed to pass Applicant Tracking Systems used by top companies.',
  },
  {
    icon: '🔒',
    title: 'Secure & Private',
    description: 'Your data is encrypted and stored securely. Never shared with third parties.',
  },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Software Engineer at Google',
    text: 'ResumeAI helped me land my dream job! The AI-generated content was spot-on for the job description.',
    avatar: 'SJ',
  },
  {
    name: 'Marcus Chen',
    role: 'Product Manager at Meta',
    text: 'The templates are beautiful and the AI generation saved me hours. Highly recommended!',
    avatar: 'MC',
  },
  {
    name: 'Emma Rodriguez',
    role: 'UX Designer at Airbnb',
    text: 'Finally a resume builder that actually understands what hiring managers want to see.',
    avatar: 'ER',
  },
];

export default function LandingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-indigo-50 to-white pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <span>✨</span>
            <span>Powered by Groq AI (Llama 3)</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 tracking-tight mb-6 leading-tight">
            Build Your Perfect Resume{' '}
            <span className="text-indigo-600">with AI</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Create professional, ATS-optimized resumes in minutes. Let AI generate
            compelling content tailored to your target job.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-3.5 rounded-xl font-semibold text-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
            >
              Start for Free
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 px-8 py-3.5 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors border border-gray-200"
            >
              View Pricing
            </Link>
          </div>
          <p className="text-sm text-gray-500 mt-4">No credit card required · Free plan available</p>
        </div>

        {/* Hero preview */}
        <div className="max-w-5xl mx-auto mt-16 px-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            <div className="flex items-center gap-1.5 px-4 py-3 bg-gray-50 border-b border-gray-200">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="ml-2 text-xs text-gray-500 font-mono">resume-editor</span>
            </div>
            <div className="flex h-64 sm:h-80">
              <div className="w-1/2 border-r border-gray-100 p-4 space-y-3">
                <div className="h-4 bg-gray-100 rounded w-1/3" />
                <div className="space-y-2">
                  <div className="h-8 bg-gray-50 border border-gray-200 rounded-lg" />
                  <div className="h-8 bg-gray-50 border border-gray-200 rounded-lg" />
                  <div className="h-8 bg-gray-50 border border-gray-200 rounded-lg" />
                </div>
                <div className="flex gap-2 mt-4">
                  <div className="h-8 bg-indigo-100 rounded-lg w-24 flex items-center justify-center">
                    <span className="text-xs text-indigo-600 font-medium">✨ AI Generate</span>
                  </div>
                  <div className="h-8 bg-indigo-600 rounded-lg w-16 flex items-center justify-center">
                    <span className="text-xs text-white font-medium">Save</span>
                  </div>
                </div>
              </div>
              <div className="w-1/2 bg-gray-50">
                <div className="h-12 bg-indigo-700 w-full" />
                <div className="p-4 space-y-2">
                  <div className="h-2 bg-gray-200 rounded w-3/4" />
                  <div className="h-2 bg-gray-200 rounded w-1/2" />
                  <div className="mt-3 h-2 bg-gray-200 rounded" />
                  <div className="h-2 bg-gray-200 rounded w-5/6" />
                  <div className="h-2 bg-gray-200 rounded w-4/5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything you need to land the job</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Powerful features designed to make resume building fast, easy, and effective.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Loved by job seekers</h2>
            <p className="text-gray-600 text-lg">Join thousands who have already landed their dream jobs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <p className="text-gray-700 text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-indigo-600">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to build your resume?</h2>
          <p className="text-indigo-200 text-lg mb-8">Get started for free today. No credit card required.</p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-3.5 rounded-xl font-semibold text-lg hover:bg-indigo-50 transition-colors shadow-lg"
          >
            Create your resume
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
