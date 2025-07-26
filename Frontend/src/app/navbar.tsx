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
      if (aboutClickTimeoutRef.current) {
        clearTimeout(aboutClickTimeoutRef.current);
      }
      router.push("/about");
      setAboutClickTime(null);
    } else {
      setAboutClickTime(now);
      aboutClickTimeoutRef.current = setTimeout(() => {
        const section = document.getElementById("about");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
        setAboutClickTime(null);
      }, 500);
    }

    setIsOpen(false);
  };

  // Fancy animated underline hover
  const navLinkClass =
    "relative text-blue-800 font-medium transition duration-300 hover:text-blue-600 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full";

  // Modern Get Started button styles
  const getStartedBtn =
    "bg-blue-900 text-white px-5 py-2.5 rounded-full shadow-md hover:bg-blue-800 hover:shadow-lg transition-all duration-300 font-semibold";

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-900 hover:text-blue-700 transition-all duration-300">
          InvoiceMaker
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className={navLinkClass}>Home</Link>
          <Link href="#features" className={navLinkClass}>Features</Link>
          <a href="#about" className={navLinkClass} onClick={handleAboutClick}>About</a>
          <Link href="#faq" className={navLinkClass}>FAQ</Link>
          <Link href="/templates" className={getStartedBtn}>
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
          <Link href="/" className="block text-blue-800 font-medium transition hover:text-blue-600">Home</Link>
          <Link href="#features" className="block text-blue-800 font-medium transition hover:text-blue-600">Features</Link>
          <a href="#about" onClick={handleAboutClick} className="block text-blue-800 font-medium transition hover:text-blue-600">About</a>
          <Link href="#faq" className="block text-blue-800 font-medium transition hover:text-blue-600">FAQ</Link>
          <Link href="/templates" className={getStartedBtn + " block text-center"}>
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
