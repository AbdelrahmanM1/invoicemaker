import Footer from "../components/footer";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Invoice Editor – Invoice Maker",
  description: "Edit your invoice and see a real-time preview. This page is currently under construction.",
};

export default function PreviewPage() {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      {/* content*/}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          🚧 This Page is Under Development
        </h1>
        <p className="text-lg text-gray-600 mb-6 max-w-xl">
          We are currently building this feature to serve you better. Please check back soon!
        </p>

        <Link
          href="/"
          className="inline-block px-6 py-3 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800 transition"
        >
          Go back to Home
        </Link>
      </div>

      <Footer />
    </main>
  );
}
