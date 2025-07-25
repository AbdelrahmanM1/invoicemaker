import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-blue-800 text-white py-6 mt-auto border-t border-blue-700">
      <div className="max-w-screen-xl mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Invoice Generator. All rights reserved. Made by Abdelrahman Moharram.
        </p>
        <div className="flex justify-center gap-4 mt-2 text-sm">
          <Link
            href="/terms"
            className="text-white hover:text-blue-300 transition-colors duration-200 hover:underline"
          >
            Terms of Service
          </Link>
          <Link
            href="/privacy"
            className="text-white hover:text-blue-300 transition-colors duration-200 hover:underline"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
