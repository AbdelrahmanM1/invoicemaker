"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [aboutClickTime, setAboutClickTime] = useState<number | null>(null);
  const aboutClickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleAboutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const now = Date.now();

    if (aboutClickTime && now - aboutClickTime < 600) {
      // Double click within 600ms — redirect to full /about page
      if (aboutClickTimeoutRef.current) {
        clearTimeout(aboutClickTimeoutRef.current);
      }
      router.push("/about");
      setAboutClickTime(null);
    } else {
      // First click — scroll to #about section
      setAboutClickTime(now);

      aboutClickTimeoutRef.current = setTimeout(() => {
        const section = document.getElementById("about");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
        setAboutClickTime(null);
      }, 500);
    }

    setIsOpen(false); // Close menu on mobile
  };

  const navLinkClass = "text-blue-800 hover:text-blue-600 transition font-medium";

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-900">
          InvoiceMaker
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className={navLinkClass}>Home</Link>
          <Link href="#features" className={navLinkClass}>Features</Link>
          <a href="#about" className={navLinkClass} onClick={handleAboutClick}>About</a>
          <Link href="#faq" className={navLinkClass}>FAQ</Link>
          <Link
            href="/editor"
            className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition font-semibold"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-blue-900 text-2xl">
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-6 py-4 space-y-4 shadow-inner">
          <Link href="/" className="block text-blue-800 font-medium">Home</Link>
          <Link href="#features" className="block text-blue-800 font-medium">Features</Link>
          <a href="#about" className="block text-blue-800 font-medium" onClick={handleAboutClick}>About</a>
          <Link href="#faq" className="block text-blue-800 font-medium">FAQ</Link>
          <Link
            href="/editor"
            className="block bg-blue-900 text-white px-4 py-2 rounded-lg text-center font-semibold hover:bg-blue-800"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
