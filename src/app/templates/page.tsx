import Footer from "../components/footer";




export const metadata = {
  title: "Templates – Invoice Maker",
  description: "Templates for your invoice and see real-time preview.",
};


export default function templates() {
  return (
     <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
      <h1 className="text-4xl font-bold text-gray-900">
        Hi World
      </h1>
      <Footer />
     </main>
  );
}
