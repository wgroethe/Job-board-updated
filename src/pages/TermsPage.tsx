import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function TermsPage() {
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms & Conditions</h1>
        
        <div className="prose prose-rose max-w-none">
          <p className="text-gray-600 mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Agreement to Terms</h2>
            <p className="text-gray-600">
              By accessing and using InjectorJobs, operated by WFG Ventures, LLC, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. User Accounts</h2>
            <ul className="list-disc pl-6 mb-4 text-gray-600">
              <li>You must be at least 18 years old to use our services</li>
              <li>You are responsible for maintaining the confidentiality of your account</li>
              <li>You must provide accurate and complete information</li>
              <li>You are responsible for all activities under your account</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Job Listings and Applications</h2>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">3.1 For Employers</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-600">
              <li>Job listings must be accurate and comply with all applicable laws</li>
              <li>You must have the authority to post jobs on behalf of your organization</li>
              <li>Payment is required for job postings according to selected plans</li>
              <li>We reserve the right to remove inappropriate listings</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">3.2 For Job Seekers</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-600">
              <li>Applications must contain accurate information</li>
              <li>You must be qualified for the positions you apply to</li>
              <li>You are responsible for the content of your applications</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Payment Terms</h2>
            <ul className="list-disc pl-6 mb-4 text-gray-600">
              <li>All fees are non-refundable unless otherwise stated</li>
              <li>Prices are subject to change with notice</li>
              <li>Payment must be made in full before services are provided</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Intellectual Property</h2>
            <p className="text-gray-600 mb-4">
              All content on InjectorJobs, including text, graphics, logos, and software, is the property of WFG Ventures, LLC and is protected by intellectual property laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Limitation of Liability</h2>
            <p className="text-gray-600 mb-4">
              WFG Ventures, LLC and InjectorJobs are not liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Changes to Terms</h2>
            <p className="text-gray-600 mb-4">
              We reserve the right to modify these terms at any time. We will notify users of any material changes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Contact Information</h2>
            <p className="text-gray-600">
              For questions about these Terms & Conditions, please contact us at:
              <br />
              Email: legal@injectorjobs.com
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