import Navbar from "../navbar";
import Footer from "../components/footer";
import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen bg-white">
        <main className="flex-grow px-6 py-16 bg-amber-50 text-slate-800">
          <div className="max-w-5xl mx-auto space-y-16">
            {/* Title */}
            <div className="text-center">
              <h1 className="text-5xl font-bold text-blue-900 mb-4">About Us</h1>
              <p className="text-lg text-slate-600">
                We simplify invoicing for freelancers, businesses, and companies. Your work deserves professional billing.
              </p>
            </div>

            {/* Our Story */}
            <section>
              <h2 className="text-3xl font-semibold text-blue-900 mb-4">Our Story</h2>
              <p className="text-slate-700 leading-relaxed text-lg">
                Invoice Maker was born out of a simple idea: invoicing shouldn't be complicated. 
                As developers and freelancers ourselves, we know the frustration of clunky systems, 
                confusing pricing, and poor designs. That’s why we built Invoice Maker — a platform that 
                combines elegance with functionality. Whether you're a solo freelancer or managing 500+ invoices 
                for a company, we’re here to help you work smarter.
              </p>
            </section>

            {/* Mission & Vision */}
            <section className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold text-blue-900 mb-2">Our Mission</h3>
                <p className="text-slate-700 text-lg">
                  To empower every business — small or large — with a fast, beautiful, and powerful invoice generator.
                  No clutter. No confusion. Just clean design and real results.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-blue-900 mb-2">Our Vision</h3>
                <p className="text-slate-700 text-lg">
                  To be the go-to invoicing solution globally for professionals who value simplicity, control, and design.
                </p>
              </div>
            </section>

            {/* Features */}
            <section>
              <h2 className="text-3xl font-semibold text-blue-900 mb-4">What Makes Us Different</h2>
              <ul className="space-y-4 text-slate-700 text-lg list-disc list-inside">
                <li>✨ Real-time invoice editing and live preview</li>
                <li>💾 Create and manage multiple templates easily</li>
                <li>🎨 Clean, modern, and responsive UI</li>
              </ul>
            </section>

            {/* Team */}
            <section>
              <h2 className="text-3xl font-semibold text-blue-900 mb-4">Meet the Creator</h2>
              <div className="flex flex-col items-center text-center">
                <Image
                  src="/abdelrahman-avatar.jpg"
                  alt="Abdelrahman Moharram"
                  width={128}
                  height={128}
                  className="rounded-full shadow-md mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-blue-900">Abdelrahman Moharram</h3>
                <p className="text-slate-700 text-lg">Founder & Full-Stack Developer</p>
                <p className="text-slate-600 max-w-xl mt-2">
                  Passionate about building tools that help real people. Abdelrahman built Invoice Maker to make invoicing easier for everyone.
                </p>
              </div>
            </section>

            {/* Call to Action */}
            <section className="text-center">
              <h2 className="text-2xl font-bold text-blue-900 mb-2">Ready to simplify your invoicing?</h2>
              <p className="text-slate-700 text-lg mb-4">Join thousands of professionals using Invoice Maker every day.</p>
              <a
                href="/editor"
                className="inline-block bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
              >
                Get Started
              </a>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
