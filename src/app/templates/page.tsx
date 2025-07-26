'use client';

import Footer from "../components/footer";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";


interface Template {
  id: string;
  name: string;
  category: string;
  preview: string;
}

interface TemplateCardProps {
  template: Template;
  onSelect: (templateId: string) => void;
  isSelected: boolean;
}

const TemplateCard = ({ template, onSelect, isSelected }: TemplateCardProps) => {
  return (
    <div 
      className={`relative group cursor-pointer transition-all duration-300 hover:scale-105 ${
        isSelected ? 'ring-4 ring-blue-500 ring-opacity-60' : ''
      }`}
      onClick={() => onSelect(template.id)}
    >
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
        {/* Preview Image */}
        <div className="relative h-64 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
          {/* Placeholder for template preview */}
          <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
            <div className="text-6xl text-blue-300">📄</div>
          </div>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
            <button className="opacity-0 group-hover:opacity-100 bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-opacity duration-300 hover:bg-blue-700">
              Preview
            </button>
          </div>
          
          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="inline-block px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full capitalize">
              {template.category}
            </span>
          </div>
          
          {/* Selected Badge */}
          {isSelected && (
            <div className="absolute top-3 right-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          )}
        </div>
        
        {/* Template Info */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h3>
          <p className="text-sm text-gray-600 mb-3">Professional invoice template perfect for {template.category} businesses</p>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-green-600">Free</span>
            <button 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                isSelected 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(template.id);
              }}
            >
              {isSelected ? 'Selected' : 'Select'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 animate-pulse">
    <div className="h-64 bg-gray-200"></div>
    <div className="p-4">
      <div className="h-6 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded mb-3"></div>
      <div className="flex items-center justify-between">
        <div className="h-4 bg-gray-200 rounded w-16"></div>
        <div className="h-8 bg-gray-200 rounded w-20"></div>
      </div>
    </div>
  </div>
);

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [filter, setFilter] = useState<string>('all');

  // Fetch templates from API
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        // First check localStorage for cached templates
        const cachedTemplates = localStorage.getItem('invoice_templates');
        const cacheTimestamp = localStorage.getItem('templates_cache_timestamp');
        const now = Date.now();
        const cacheAge = now - (parseInt(cacheTimestamp || '0'));
        const cacheExpiry = 24 * 60 * 60 * 1000; // 24 hours

        if (cachedTemplates && cacheAge < cacheExpiry) {
          setTemplates(JSON.parse(cachedTemplates));
          setLoading(false);
          return;
        }

        // Fetch from API
        const response = await fetch('/api/templates');
        if (!response.ok) {
          throw new Error('Failed to fetch templates');
        }

        const data = await response.json();
        if (data.success) {
          setTemplates(data.templates);
          // Cache templates in localStorage
          localStorage.setItem('invoice_templates', JSON.stringify(data.templates));
          localStorage.setItem('templates_cache_timestamp', now.toString());
        } else {
          throw new Error(data.message || 'Failed to load templates');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching templates:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(templates.map(t => t.category)))];

  // Filter templates
  const filteredTemplates = filter === 'all' 
    ? templates 
    : templates.filter(t => t.category === filter);

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    // Save selected template to localStorage
    localStorage.setItem('selected_template', templateId);
  };

  const handleUseTemplate = () => {
    if (selectedTemplate) {
      // Navigate to editor with selected template
      window.location.href = `/editor?template=${selectedTemplate}`;
    }
  };

  const handlePreviewTemplate = async (templateId: string) => {
    try {
      // Create a sample preview
      const sampleData = {
        invoiceNumber: 'INV-001',
        invoiceDate: new Date().toLocaleDateString(),
        companyName: 'Your Company',
        companyAddress: '123 Business St, City, State 12345',
        companyEmail: 'contact@company.com',
        clientName: 'Client Name',
        clientAddress: '456 Client Ave, City, State 67890',
        clientEmail: 'client@email.com',
        items: [
          { description: 'Sample Service', quantity: '1', rate: '100.00', amount: '100.00' }
        ],
        subtotal: '100.00',
        taxRate: '10',
        tax: '10.00',
        total: '110.00',
        paymentTerms: 'Net 30'
      };

      const response = await fetch('/api/preview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          templateId,
          invoiceData: sampleData
        }),
      });

      const data = await response.json();
      if (data.success) {
        // Open preview in new tab
        window.open(data.previewUrl, '_blank');
      }
    } catch (err) {
      console.error('Error creating preview:', err);
    }
  };

  if (error) {
    return (
      <main className="flex flex-col min-h-screen bg-white">
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Unable to Load Templates</h1>
          <p className="text-lg text-gray-600 mb-6 max-w-xl">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Choose Your Invoice Template
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select from our professionally designed templates to create stunning invoices that reflect your brand
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 capitalize ${
                filter === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              {category === 'all' ? 'All Templates' : category}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <LoadingSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {filteredTemplates.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onSelect={handleTemplateSelect}
                  isSelected={selectedTemplate === template.id}
                />
              ))}
            </div>

            {filteredTemplates.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📄</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No templates found</h3>
                <p className="text-gray-600">Try selecting a different category</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Fixed Bottom Bar */}
      {selectedTemplate && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">
                    {templates.find(t => t.id === selectedTemplate)?.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {templates.find(t => t.id === selectedTemplate)?.name}
                  </h4>
                  <p className="text-sm text-gray-600">Template selected</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handlePreviewTemplate(selectedTemplate)}
                  className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg font-medium hover:bg-blue-50 transition"
                >
                  Preview
                </button>
                <button
                  onClick={handleUseTemplate}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  Use This Template
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}