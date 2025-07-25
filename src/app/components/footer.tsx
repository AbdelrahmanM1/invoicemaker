export default function Footer() {
  return (
    <footer className="w-full bg-blue-800 text-white py-6 mt-auto">
      <div className="max-w-screen-xl mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Invoice Generator. All rights reserved. Made by Abdelrahman Moharram.
        </p>
      </div>
    </footer>
  );
}
