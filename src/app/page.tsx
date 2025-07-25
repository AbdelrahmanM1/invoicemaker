"use client";

import Footer from "./components/footer";
import Navbar from "./navbar";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-amber-300 w-full">
          <motion.header
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center text-center px-4 sm:px-6 py-20 sm:py-24"
          >
            <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-900 mb-4 tracking-tight leading-tight">
              Generate Your <br /> Invoices in Seconds
            </h1>
            <p className="text-base sm:text-lg text-blue-800 max-w-2xl font-medium">
              A free and easy-to-use tool to create, customize, and export professional invoices in moments.
            </p>
            <motion.a
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              href="/editor"
              className="mt-8 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-900 to-blue-700 text-white px-8 py-3 rounded-full font-semibold text-base sm:text-lg shadow-lg hover:from-blue-800 hover:to-blue-600 transition-all duration-300"
               >
              <span>🚀 Get Started</span>
           </motion.a>
          </motion.header>
        </section>

        {/* Features Section */}
        <section className="bg-white py-16 px-4 sm:px-6 text-center flex-grow" id="features">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.2 }}
            className="max-w-6xl mx-auto"
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4"
            >
              Why Choose Us?
            </motion.h2>
            <p className="text-base sm:text-lg text-gray-700 font-medium mb-12">
              We offer the best invoice generation tool on the market — fast, reliable, and totally free.
            </p>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
              {[
                {
                  title: "✅ No Sign Up Needed",
                  desc: "Start generating invoices instantly without creating an account.",
                },
                {
                  title: "✅ Real-Time Preview",
                  desc: "See your invoice update live as you type.",
                },
                {
                  title: "✅ Download as PDF",
                  desc: "Easily export your invoices as high-quality PDFs.",
                },
                {
                  title: "✅ Integrated Editor",
                  desc: "Easily customize your invoices with our built-in editor.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.03 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  viewport={{ once: true }}
                  className="p-6 bg-blue-100 rounded-xl shadow-sm hover:shadow-lg hover:bg-blue-200 transition-all duration-300"
                >
                  <h3 className="text-lg sm:text-xl font-semibold text-blue-800 mb-2">{item.title}</h3>
                  <p className="text-gray-700 text-sm sm:text-base">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* About Us Section */}
        <section className="bg-gray-100 py-20 px-4 sm:px-6 text-center" id="about">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-8">About Us</h2>

            <div className="mb-16">
              <h3 className="text-xl sm:text-2xl font-semibold text-blue-800 mb-4">Our Mission</h3>
              <p className="text-gray-700 font-medium leading-relaxed text-base sm:text-lg">
                Our mission is to simplify the invoicing process for freelancers, small businesses, and growing teams.
                We believe creating professional invoices should be quick, intuitive, and accessible to everyone.
              </p>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-blue-800 mb-6">Our Team</h3>
              <div className="flex flex-col items-center">
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Image
                    src="/abdelrahman-avatar.jpg"
                    alt="Abdelrahman Moharram"
                    width={128}
                    height={128}
                    className="rounded-full mb-4 shadow-md object-cover w-32 h-32"
                  />
                </motion.div>
                <h4 className="text-lg sm:text-xl font-semibold text-blue-800">
                  <a
                    href="https://abdelrahmanmoharram.vercel.app"
                    className="relative inline-block transition-all duration-300 text-blue-900 hover:text-blue-700 hover:underline hover:underline-offset-4"
                  >
                    Abdelrahman Moharram
                  </a>
                </h4>
                <p className="text-gray-700 text-sm sm:text-base">Founder & Lead Developer of Invoice Maker</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white py-20 px-4 sm:px-6" id="faq">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6 text-left">
              {[
                {
                  question: "Do I need to sign up to use this tool?",
                  answer: "No! You can start generating invoices right away. No account or sign-in is required.",
                },
                {
                  question: "Is this really free to use?",
                  answer:
                    "Yes, it's completely free. We believe everyone should have access to professional tools without barriers.",
                },
                {
                  question: "Can I download my invoice as a PDF?",
                  answer:
                    "Absolutely. Once you're done editing, you can export your invoice as a high-quality PDF with one click.",
                },
                {
                  question: "Will my data be saved?",
                  answer: "No data is stored on our servers. Everything is local and secure on your browser.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-blue-50 p-6 rounded-xl shadow-sm hover:shadow-md transition text-sm sm:text-base"
                >
                  <h4 className="font-semibold text-blue-800">{item.question}</h4>
                  <p className="text-gray-700 mt-2">{item.answer}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <Footer />
      </div>
    </>
  );
}
