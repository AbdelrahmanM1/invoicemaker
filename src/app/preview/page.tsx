import Footer from "../components/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Invoice Preview – Invoice Maker",
  description: "Preview your invoice and see a real-time preview. This page is currently under construction.",
};

export default function PreviewPage() {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          This page is under Development 🛠️
        </h1>
        <p className="text-lg text-gray-600">
          We're currently building this feature. Please check back soon!
        </p>
      </div>

      <Footer />
    </main>
  );
}
