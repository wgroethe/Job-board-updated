import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function PrivacyPolicyPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to home
      </Link>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="prose prose-rose max-w-none">
          <p className="text-gray-600 mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-600">
              InjectorJobs, operated by WFG Ventures, LLC ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">2.1 Personal Information</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-600">
              <li>Name and contact information</li>
              <li>Professional credentials and work history</li>
              <li>Account login information</li>
              <li>Payment information</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">2.2 Usage Information</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-600">
              <li>Browser and device information</li>
              <li>IP address and location data</li>
              <li>Website activity and interactions</li>
              <li>Cookie and tracking technology data</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">We use the collected information for:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-600">
              <li>Providing and improving our services</li>
              <li>Processing job applications and payments</li>
              <li>Communicating with users</li>
              <li>Analyzing website performance</li>
              <li>Marketing and promotional purposes</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Information Sharing</h2>
            <p className="text-gray-600 mb-4">We may share your information with:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-600">
              <li>Employers (for job applications)</li>
              <li>Service providers and partners</li>
              <li>Legal authorities when required</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Your Rights</h2>
            <p className="text-gray-600 mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-600">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Contact Us</h2>
            <p className="text-gray-600">
              If you have questions about this Privacy Policy, please contact us at:
              <br />
              Email: privacy@injectorjobs.com
              <br />
              WFG Ventures, LLC
              <br />
              570 Franklin St, Mountain View, CA 94041
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}