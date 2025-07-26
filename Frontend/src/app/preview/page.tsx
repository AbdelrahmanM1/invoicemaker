'use client';

import Footer from "../components/footer";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

interface InvoiceData {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  companyName: string;
  companyAddress: string;
  companyEmail: string;
  companyPhone: string;
  clientName: string;
  clientAddress: string;
  clientEmail: string;
  items: InvoiceItem[];
  subtotal: string;
  taxRate: string;
  tax: string;
  discount: string;
  total: string;
  paymentTerms: string;
  notes: string;
}

interface InvoiceItem {
  description: string;
  quantity: string;
  rate: string;
  amount: string;
}

interface Template {
  id: string;
  name: string;
  category: string;
  html: string;
}

export default function PreviewPage() {
  const searchParams = useSearchParams();
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [template, setTemplate] = useState<Template | null>(null);
  const [previewId, setPreviewId] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState<'pdf' | 'png' | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string>('');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Load data on component mount
  useEffect(() => {
    const loadPreviewData = async () => {
      try {
        // Get data from localStorage or URL params
        const templateId = searchParams.get('template') || localStorage.getItem('selected_template');
        const savedInvoiceData = localStorage.getItem('current_invoice_data');
        
        if (!templateId || !savedInvoiceData) {
          setError('No invoice data found. Please create an invoice first.');
          setLoading(false);
          return;
        }

        const invoiceData: InvoiceData = JSON.parse(savedInvoiceData);
        setInvoiceData(invoiceData);

        // Fetch template
        const templateResponse = await fetch(`/api/templates/${templateId}`);
        if (!templateResponse.ok) {
          throw new Error('Failed to fetch template');
        }

        const templateData = await templateResponse.json();
        if (templateData.success) {
          setTemplate(templateData.template);
          
          // Create preview
          await createPreview(templateId, invoiceData);
        } else {
          throw new Error(templateData.message || 'Failed to load template');
        }

      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error loading preview:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPreviewData();
  }, [searchParams]);

  const createPreview = async (templateId: string, invoiceData: InvoiceData) => {
    try {
      const response = await fetch('/api/preview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          templateId,
          invoiceData
        }),
      });

      const data = await response.json();
      if (data.success) {
        setPreviewId(data.previewId);
        setPreviewUrl(data.previewUrl);
      } else {
        throw new Error(data.message || 'Failed to create preview');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create preview');
    }
  };

  const handleExport = async (format: 'pdf' | 'png') => {
    if (!previewId) return;
    
    setExporting(format);
    try {
      const response = await fetch(`/api/export/${format}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          previewId
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to export ${format.toUpperCase()}`);
      }

      // Download the file
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `invoice-${invoiceData?.invoiceNumber || 'preview'}.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

    } catch (err) {
      setError(err instanceof Error ? err.message : `Failed to export ${format.toUpperCase()}`);
    } finally {
      setExporting(null);
    }
  };

  const handleSave = async () => {
    if (!invoiceData || !template) return;

    setSaving(true);
    try {
      const invoiceId = `invoice-${Date.now()}`;
      
      const response = await fetch('/api/invoices/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          invoiceId,
          templateId: template.id,
          invoiceData
        }),
      });

      const data = await response.json();
      if (data.success) {
        // Save to localStorage as well
        const savedInvoices = JSON.parse(localStorage.getItem('saved_invoices') || '[]');
        savedInvoices.push({
          id: invoiceId,
          ...invoiceData,
          templateId: template.id,
          savedAt: new Date().toISOString()
        });
        localStorage.setItem('saved_invoices', JSON.stringify(savedInvoices));
        
        alert('Invoice saved successfully!');
      } else {
        throw new Error(data.message || 'Failed to save invoice');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save invoice');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = () => {
    const templateId = template?.id || localStorage.getItem('selected_template');
    window.location.href = `/editor?template=${templateId}`;
  };

  if (loading) {
    return (
      <main className="flex flex-col min-h-screen bg-gray-50">
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Loading Preview...</h2>
          <p className="text-gray-600">Please wait while we prepare your invoice preview</p>
        </div>
        <Footer />
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex flex-col min-h-screen bg-white">
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Preview Error</h1>
          <p className="text-lg text-gray-600 mb-6 max-w-xl">{error}</p>
          <div className="flex space-x-4">
            <Link
              href="/editor"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Back to Editor
            </Link>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition"
            >
              Go Home
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/editor"
                className="text-gray-600 hover:text-gray-900 transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Invoice Preview</h1>
                <p className="text-sm text-gray-600">
                  {template?.name} • Invoice #{invoiceData?.invoiceNumber}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleEdit}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition"
              >
                Edit
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
              <div className="relative">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition flex items-center space-x-2"
                  onClick={() => document.getElementById('export-menu')?.classList.toggle('hidden')}
                >
                  <span>Export</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div id="export-menu" className="hidden absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                  <button
                    onClick={() => handleExport('pdf')}
                    disabled={exporting === 'pdf'}
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2 disabled:opacity-50"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                    </svg>
                    <span>{exporting === 'pdf' ? 'Exporting PDF...' : 'Export as PDF'}</span>
                  </button>
                  <button
                    onClick={() => handleExport('png')}
                    disabled={exporting === 'png'}
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2 disabled:opacity-50 border-t border-gray-100"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                    <span>{exporting === 'png' ? 'Exporting PNG...' : 'Export as PNG'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Preview Content */}
      <main className="flex-1 flex">
        {/* Sidebar - Invoice Details */}
        <div className="w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Invoice Details</h2>
          
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Basic Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Number:</span>
                  <span className="font-medium">{invoiceData?.invoiceNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span>{invoiceData?.invoiceDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Due Date:</span>
                  <span>{invoiceData?.dueDate}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">From</h3>
              <div className="text-sm space-y-1">
                <p className="font-medium">{invoiceData?.companyName}</p>
                <p className="text-gray-600">{invoiceData?.companyAddress}</p>
                <p className="text-gray-600">{invoiceData?.companyEmail}</p>
                {invoiceData?.companyPhone && (
                  <p className="text-gray-600">{invoiceData.companyPhone}</p>
                )}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">To</h3>
              <div className="text-sm space-y-1">
                <p className="font-medium">{invoiceData?.clientName}</p>
                <p className="text-gray-600">{invoiceData?.clientAddress}</p>
                <p className="text-gray-600">{invoiceData?.clientEmail}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Items:</span>
                  <span>{invoiceData?.items.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span>${invoiceData?.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax ({invoiceData?.taxRate}%):</span>
                  <span>${invoiceData?.tax}</span>
                </div>
                <div className="flex justify-between font-semibold border-t border-gray-200 pt-2">
                  <span>Total:</span>
                  <span>${invoiceData?.total}</span>
                </div>
              </div>
            </div>

            {invoiceData?.notes && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Notes</h3>
                <p className="text-sm text-gray-600">{invoiceData.notes}</p>
              </div>
            )}
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full">
            {previewUrl ? (
              <iframe
                ref={iframeRef}
                src={previewUrl}
                className="w-full h-full rounded-lg"
                title="Invoice Preview"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading preview...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}