'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '../navbar';
import Footer from '../components/footer';

const templates = [
  {
    id: 'modern',
    title: 'Modern Template',
    description: 'Clean and bold layout for professional use.',
    previewImage: '/templates/ModernTemplate.png',
  },
  {
    id: 'classic',
    title: 'Classic Template',
    description: 'Traditional invoice format with clear lines.',
    previewImage: '/templates/ClassicTemplate.png',
  },
  {
    id: 'minimal',
    title: 'Minimal Template',
    description: 'Simple and minimal design with focus on clarity.',
    previewImage: '/templates/MinimalTemplate.png',
  },
];

export default function TemplatesPage() {
  const router = useRouter();

  const handleSelect = (id: string) => {
    localStorage.setItem('selectedTemplate', id);
    router.push('/editor');
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen px-6 py-16 text-blue-900 dark:text-white relative overflow-hidden">
        {/* Background Gradient Layer */}
        <div className="absolute inset-0 z-0 bg-amber-300" />
        
        {/* Content Layer */}
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-black">
              🎨 Choose an Invoice Template
            </h1>
            <p className="text-lg text-black font-light  ">
              Pick your favorite style to begin crafting beautiful invoices.
            </p>
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((template, i) => (
              <motion.div
                key={template.id}
                whileHover={{ scale: 1.04 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                viewport={{ once: true }}
                onClick={() => handleSelect(template.id)}
                className="bg-white dark:bg-zinc-800 hover:bg-blue-100 dark:hover:bg-zinc-700 border border-blue-200 dark:border-zinc-700 rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer p-5 group"
              >
                <Image
                  src={template.previewImage}
                  alt={template.title}
                  width={450}
                  height={250}
                  className="rounded-xl object-cover w-full h-48 mb-4 border border-blue-100 dark:border-zinc-600"
                  unoptimized
                />
                <h2 className="text-xl font-bold mb-1 group-hover:text-blue-700 transition-colors">
                  {template.title}
                </h2>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {template.description}
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(template.id);
                  }}
                  className="mt-4 inline-block px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition-all"
                >
                  Use Template
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
