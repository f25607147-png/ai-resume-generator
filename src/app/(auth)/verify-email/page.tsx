import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Verify Your Email',
};

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-2xl mb-6">
          <svg className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Check your email</h1>
        <p className="text-gray-600 mb-8">
          We&apos;ve sent you a verification link. Please check your inbox and click the link to activate your account.
        </p>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-left mb-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">What to do next:</h2>
          <ol className="space-y-2">
            <li className="flex gap-3 text-sm text-gray-600">
              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
              Open your email inbox
            </li>
            <li className="flex gap-3 text-sm text-gray-600">
              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
              Find the email from ResumeAI
            </li>
            <li className="flex gap-3 text-sm text-gray-600">
              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
              Click the verification link
            </li>
          </ol>
        </div>

        <p className="text-sm text-gray-600">
          Didn&apos;t receive an email?{' '}
          <Link href="/signup" className="text-indigo-600 font-medium hover:underline">
            Try again
          </Link>
        </p>
      </div>
    </div>
  );
}
