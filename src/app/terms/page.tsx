import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service – Invoice Maker",
  description:
    "Read our terms of service to understand your rights and responsibilities when using Invoice Maker.",
};

export default function TermsPage() {
  return (
    <main className="flex flex-col min-h-screen bg-white text-slate-800 px-6 py-16">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center text-amber-600">
          Terms of Service
        </h1>
        <p className="text-center text-sm text-gray-500 mt-2">
  Last updated: July 25, 2025
</p>
        <p className="text-lg">
          These Terms of Service (“Terms”) govern your use of the Invoice Maker
          platform, including all related services, features, and applications
          (“Service”) operated by Abdelrahman Moharram. By accessing or using
          the Service, you agree to be bound by these Terms.
        </p>

        <section>
          <h2 className="text-2xl font-semibold mb-2">1. Eligibility</h2>
          <p>
            You must be at least 13 years old to use this Service. By using the
            Service, you represent and warrant that you meet this requirement
            and that the information you provide is accurate and complete.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            2. Account Registration
          </h2>
          <p>
            To access certain features of the Service, you may need to register
            for an account. You are responsible for maintaining the
            confidentiality of your login credentials and for all activities
            that occur under your account.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            3. Use of the Service
          </h2>
          <p>
            You agree not to use the Service for any unlawful or prohibited
            purpose. You may not attempt to gain unauthorized access to any part
            of the platform, or interfere with its normal operation or
            performance.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            4. Intellectual Property
          </h2>
          <p>
            All content and materials within the Service — including but not
            limited to software, design, text, and logos — are the intellectual
            property of Invoice Maker and may not be copied, reproduced, or
            redistributed without prior written consent.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            5. Termination & Suspension
          </h2>
          <p>
            We reserve the right to suspend or terminate your access to the
            Service at any time, without notice, if you violate these Terms or
            engage in behavior that could harm the platform or its users.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">6. Disclaimers</h2>
          <p>
            The Service is provided “as is” and “as available” without warranties
            of any kind, either express or implied. We do not guarantee that the
            Service will be uninterrupted, error-free, or secure.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">7. Limitation of Liability</h2>
          <p>
            In no event shall Invoice Maker or its developer be liable for any
            indirect, incidental, special, consequential, or punitive damages
            arising from your use of the Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            8. Modifications to Terms
          </h2>
          <p>
            We may update these Terms at any time. If material changes are made,
            we will notify you via email or by posting a prominent notice on the
            platform. Your continued use of the Service constitutes acceptance of
            the revised Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">9. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with
            the laws of the Arab Republic of Egypt, without regard to its
            conflict of law principles.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">10. Contact</h2>
          <p>
            For any questions or concerns regarding these Terms, please contact
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
