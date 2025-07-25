import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy – Invoice Maker",
  description:
    "Learn how Invoice Maker collects, uses, and protects your data in our Privacy Policy.",
};

export default function PrivacyPage() {
  return (
    <main className="flex flex-col min-h-screen bg-white text-slate-800 px-6 py-16">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center text-amber-600">
          Privacy Policy
        </h1>
        <p className="text-center text-sm text-gray-500 mt-2">
  Last updated: July 25, 2025
</p>
        <p className="text-lg">
          This Privacy Policy explains how Invoice Maker (“we,” “us,” or “our”)
          collects, uses, and protects your personal information when you use
          our services.
        </p>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            1. Information We Collect
          </h2>
          <p>
            We may collect the following types of information:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Personal information such as your name and email address</li>
            <li>Account credentials and settings</li>
            <li>Usage data and analytics (e.g., pages visited, actions taken)</li>
            <li>Technical information such as IP address and browser type</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">2. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Provide and maintain the service</li>
            <li>Improve and optimize user experience</li>
            <li>Communicate with you about your account or updates</li>
            <li>Ensure security and prevent fraud or misuse</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            3. Sharing and Disclosure
          </h2>
          <p>
            We do not sell or rent your personal information to third parties.
            We may share data with:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Trusted service providers under confidentiality agreements</li>
            <li>Authorities if required by law or legal process</li>
            <li>Other parties with your explicit consent</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">4. Cookies and Tracking</h2>
          <p>
            We use cookies and similar technologies to enhance your experience,
            remember your preferences, and analyze traffic. You can manage cookie
            preferences in your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">5. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your
            personal data. However, no method of transmission over the Internet
            is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            6. Your Rights and Choices
          </h2>
          <p>
            You may access, correct, or delete your personal information at any
            time by contacting us. You can also opt out of marketing
            communications and request data portability where applicable.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">7. Data Retention</h2>
          <p>
            We retain your information only as long as necessary to provide the
            service and fulfill legal obligations. Afterward, we securely delete
            or anonymize your data.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">8. International Users</h2>
          <p>
            If you access our services from outside Egypt, please note that your
            data may be transferred to and processed in Egypt or other
            jurisdictions where our servers are located.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any significant
            changes will be communicated via our website or email. Your
            continued use of the Service after updates means you accept the new
            policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">10. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at{" "}
            <a
              href="mailto:abdelrahmanmoharram.dev@gmail.com"
              className="text-blue-600 underline"
            >
              abdelrahmanmoharram.dev@gmail.com
            </a>
            .
          </p>
        </section>

        {/* Go Back Button */}
        <div className="pt-8 text-center">
          <Link
            href="/"
            className="inline-block bg-amber-500 text-white px-6 py-2 rounded-xl shadow-md hover:bg-amber-600 transition"
          >
            ← Go Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
