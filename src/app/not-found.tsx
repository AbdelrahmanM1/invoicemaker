import Link from 'next/link';
import Navbar from './navbar';
import Footer from './components/footer';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-amber-300 text-gray-800 flex flex-col">
      <Navbar />
      <section className="flex flex-1 flex-col items-center justify-center text-center px-4">
        <h1 className="text-6xl font-extrabold mb-4 text-blue-700">404</h1>
        <p className="text-xl mb-6">Page Not Found</p>
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-700 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
        >
          Go back to Home
        </Link>
      </section>
      <Footer />
    </main>
  );
}
