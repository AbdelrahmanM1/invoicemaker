import Footer from "./components/footer";
import Navbar from "./navbar";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-amber-300 w-full">
          <header className="flex flex-col items-center justify-center text-center px-6 py-24">
            <h1 className="text-5xl font-extrabold text-blue-900 mb-4">
              Generate Your Invoices in Seconds
            </h1>
            <p className="text-lg text-blue-800 max-w-xl font-medium">
              A free and easy-to-use tool to create, customize, and export professional invoices in moments.
            </p>
            <a
              href="/editor"
              className="mt-8 inline-block bg-blue-900 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-blue-800 transition-all duration-300"
            >
              Get Started
            </a>
          </header>
        </section>

        {/* Features Section */}
        <section className="bg-white py-20 px-6 text-center flex-grow" id="features">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">Why Choose Us?</h2>
            <p className="text-lg text-gray-700 font-medium mb-12">
              We offer the best invoice generation tool on the market — fast, reliable, and totally free.
            </p>

            <div className="grid gap-6 md:grid-cols-2">
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
                <div
                  key={i}
                  className="p-6 bg-blue-100 rounded-xl shadow-sm hover:shadow-lg hover:bg-blue-200 transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold text-blue-800 mb-2">{item.title}</h3>
                  <p className="text-gray-700">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
{/* About Us Section */}
<section className="bg-gray-100 py-20 px-6 text-center" id="about">
  <div className="max-w-4xl mx-auto">
    {/* About Us Title */}
    <h2 className="text-4xl font-bold text-blue-900 mb-8">About Us</h2>

    {/* Our Mission */}
    <div className="mb-16">
      <h3 className="text-2xl font-semibold text-blue-800 mb-4">Our Mission</h3>
      <p className="text-lg text-gray-700 font-medium leading-relaxed">
        Our mission is to simplify the invoicing process for freelancers, small businesses,
        and growing teams. We believe creating professional invoices should be quick,
        intuitive, and accessible to everyone.
      </p>
    </div>

    {/* Our Team */}
    <div>
      <h3 className="text-2xl font-semibold text-blue-800 mb-6">Our Team</h3>
      <div className="flex flex-col items-center justify-center">
        <Image
          src="/abdelrahman-avatar.jpg"
          alt="Abdelrahman Moharram"
          width={128}
          height={128}
          className="rounded-full mb-4 shadow-md object-cover"
        />
        <h4 className="text-xl font-semibold text-blue-800">Abdelrahman Moharram</h4>
        <p className="text-gray-700">Founder & Lead Developer of Invoice Maker</p>
      </div>
    </div>
  </div>
</section>
{/* FAQ Section */}
<section className="bg-white py-20 px-6" id="faq">
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="text-4xl font-bold text-blue-900 mb-8">Frequently Asked Questions</h2>
    <div className="space-y-6 text-left">
      {[
        {
          question: "Do I need to sign up to use this tool?",
          answer: "No! You can start generating invoices right away. No account or sign-in is required.",
        },
        {
          question: "Is this really free to use?",
          answer: "Yes, it's completely free. We believe everyone should have access to professional tools without barriers.",
        },
        {
          question: "Can I download my invoice as a PDF?",
          answer: "Absolutely. Once you're done editing, you can export your invoice as a high-quality PDF with one click.",
        },
        {
          question: "Will my data be saved?",
          answer: "No data is stored on our servers. Everything is local and secure on your browser.",
        },
      ].map((item, i) => (
        <div key={i} className="bg-blue-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
          <h4 className="text-lg font-semibold text-blue-800">{item.question}</h4>
          <p className="text-gray-700 mt-2">{item.answer}</p>
        </div>
      ))}
    </div>
  </div>
</section>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
