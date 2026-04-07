import Link from 'next/link';
import type { Metadata } from 'next';
import { PLANS } from '@/lib/stripe';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Simple, transparent pricing for AI-powered resume building.',
};

export default function PricingPage() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h1>
          <p className="text-xl text-gray-600">Start free, upgrade when you need more.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-1">{PLANS.free.name}</h2>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold text-gray-900">$0</span>
              <span className="text-gray-500">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              {PLANS.free.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              href="/signup"
              className="block text-center bg-gray-100 text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
            >
              Get started free
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="bg-indigo-600 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
              POPULAR
            </div>
            <h2 className="text-xl font-bold text-white mb-1">{PLANS.pro.name}</h2>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold text-white">${PLANS.pro.price}</span>
              <span className="text-indigo-200">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              {PLANS.pro.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-indigo-100">
                  <svg className="w-4 h-4 text-indigo-200 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              href="/signup?plan=pro"
              className="block text-center bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition-colors"
            >
              Start Pro trial
            </Link>
          </div>
        </div>

        <div className="mt-12 text-center text-sm text-gray-500">
          All plans include a 14-day money-back guarantee.{' '}
          <Link href="/terms" className="text-indigo-600 hover:underline">Terms apply</Link>.
        </div>
      </div>
    </div>
  );
}
