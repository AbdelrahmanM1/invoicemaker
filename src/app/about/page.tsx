"use client";

import Navbar from "../navbar";
import Footer from "../components/footer";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen bg-white">
        <main className="flex-grow px-6 py-16 bg-amber-50 text-slate-800">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto space-y-16"
          >
            {/* Title */}
            <div className="text-center">
              <motion.h1
                className="text-5xl font-bold text-blue-900 mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                About Us
              </motion.h1>
              <p className="text-lg text-slate-600">
                We simplify invoicing for freelancers, businesses, and companies. Your work deserves professional billing.
              </p>
            </div>

            {/* Our Story */}
            <motion.section
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-semibold text-blue-900 mb-4">Our Story</h2>
              <p className="text-slate-700 leading-relaxed text-lg">
                Invoice Maker was born out of a simple idea: invoicing should not be complicated.
                As developers and freelancers ourselves, we know the frustration of clunky systems,
                confusing pricing, and poor designs. That is why we built Invoice Maker — a platform that
                combines elegance with functionality. Whether you are a solo freelancer or managing 500+ invoices,
                we are here to help you work smarter.
              </p>
            </motion.section>

            {/* Mission & Vision */}
            <motion.section
              className="grid md:grid-cols-2 gap-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.2 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-semibold text-blue-900 mb-2">Our Mission</h3>
                <p className="text-slate-700 text-lg">
                  To empower every business — small or large — with a fast, beautiful, and powerful invoice generator.
                  No clutter. No confusion. Just clean design and real results.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h3 className="text-2xl font-semibold text-blue-900 mb-2">Our Vision</h3>
                <p className="text-slate-700 text-lg">
                  To be the go-to invoicing solution globally for professionals who value simplicity, control, and design.
                </p>
              </motion.div>
            </motion.section>

            {/* Features */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-semibold text-blue-900 mb-4">What Makes Us Different</h2>
              <ul className="space-y-4 text-slate-700 text-lg list-disc list-inside">
                <li>✨ Real-time invoice editing and live preview</li>
                <li>💾 Create and manage multiple templates easily</li>
                <li>🎨 Clean, modern, and responsive UI</li>
              </ul>
            </motion.section>

            {/* Team */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-semibold text-blue-900 mb-4">Meet the Creator</h2>
              <div className="flex flex-col items-center text-center">
                <motion.div whileHover={{ scale: 1.05 }} className="transition">
                  <Image
                    src="/abdelrahman-avatar.jpg"
                    alt="Abdelrahman Moharram"
                    width={128}
                    height={128}
                    className="rounded-full shadow-md mb-4 object-cover"
                  />
                </motion.div>
                <h3 className="text-xl font-bold text-blue-900">
                  <a
                    href="https://abdelrahmanmoharram.vercel.app"
                    className="relative inline-block transition-all duration-300 text-blue-900 hover:text-blue-700 hover:underline hover:underline-offset-4"
                  >
                    Abdelrahman Moharram
                  </a>
                </h3>
                <p className="text-slate-700 text-lg">Founder & Full-Stack Developer</p>
                <p className="text-slate-600 max-w-xl mt-2">
                  Passionate about building tools that help real people. Abdelrahman built Invoice Maker to make invoicing easier for everyone.
                </p>
              </div>
            </motion.section>

            {/* Call to Action */}
            <motion.section
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-blue-900 mb-2">Ready to simplify your invoicing?</h2>
              <p className="text-slate-700 text-lg mb-4">
                Join thousands of professionals using Invoice Maker every day.
              </p>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/editor"
                className="inline-block bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
              >
                Get Started
              </motion.a>
            </motion.section>
          </motion.div>
        </main>
        <Footer />
      </div>
    </>
  );
}
