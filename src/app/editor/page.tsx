'use client';

import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../navbar';
import Footer from '../components/footer';
import ClassicTemplate from '../components/templates/classic_template';
import MinimalTemplate from '../components/templates/minimal_template';
import ModernTemplate from '../components/templates/modern_template';
import { useReactToPrint } from 'react-to-print';
import type { InvoiceData, InvoiceItem } from '../types/invoices.ts';

export default function EditorPage() {
  const [templateId, setTemplateId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<InvoiceData>({
    invoiceNumber: 'INV-001',
    companyName: 'Your Company LLC',
    companyAddress: '123 Business St, Cairo, Egypt',
    companyEmail: 'info@yourcompany.com',
    companyPhone: '+20 123 456 7890',
    customerName: 'Your Customer Name',
    customerEmail: 'customer@email.com',
    customerPhone: '+20 987 654 3210',
    customerAddress: '456 Customer Ave, Alexandria',
    invoiceDate: '2025-07-30',
    dueDate: '2025-08-15',
    items: [
      { id: '1', description: 'Website Design', quantity: 1, unitPrice: 1500 },
      { id: '2', description: 'Hosting (1 year)', quantity: 1, unitPrice: 120 },
    ],
    currency: 'USD',
    notes: 'Payment is due within 15 days.',
  });

  const totalAmount = formData.items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );

  useEffect(() => {
    const selected = localStorage.getItem('selectedTemplate');
    setTemplateId(selected);
  }, []);

  const handleItemChange = (
    index: number,
    field: keyof InvoiceItem,
    value: string | number
  ) => {
    const updatedItems = [...formData.items];
    const item = { ...updatedItems[index] };

    if (field === 'quantity' || field === 'unitPrice') {
      item[field] = parseFloat(value as string);
    } else {
      item[field] = value as string;
    }

    updatedItems[index] = item;
    setFormData({ ...formData, items: updatedItems });
  };

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        { id: Date.now().toString(), description: '', quantity: 1, unitPrice: 0 },
      ],
    });
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: updatedItems });
  };

  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef, 
    documentTitle: formData.invoiceNumber,
  });

  const renderTemplate = () => {
    switch (templateId) {
      case 'classic':
        return (
          <ClassicTemplate
            {...formData}
            items={formData.items}
            totalAmount={totalAmount}
            ref={componentRef}
          />
        );
      case 'minimal':
        return(
          <MinimalTemplate
            {...formData}
            items={formData.items}
            totalAmount={totalAmount}
            ref={componentRef}
          />
        );
      case 'modern':
        return(
          <ModernTemplate
            {...formData}
            items={formData.items}
            totalAmount={totalAmount}
            ref={componentRef}
          />
        )
      default:
        return (
          <div className="flex items-center justify-center h-64 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-xl border-2 border-dashed border-red-300 dark:border-red-700">
            <p className="text-red-600 dark:text-red-400 text-lg font-medium">No template selected.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Navbar />
      <main className="flex-grow px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Invoice Editor
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Create professional invoices with our intuitive editor. Fill in your details and watch the preview update in real-time.
            </p>
          </div>

          {!templateId ? (
            <div className="max-w-md mx-auto">
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">No Template Selected</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  Please choose a template to start creating your invoice.
                </p>
                <a 
                  href="/templates" 
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Choose Template
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Form Section */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700">
                <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </div>
                    Invoice Details
                  </h2>
                </div>
                
                <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto space-y-8">
                  {/* Invoice Number */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Invoice Number
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
                      placeholder="INV-001"
                      value={formData.invoiceNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, invoiceNumber: e.target.value })
                      }
                    />
                  </div>

                  {/* Company Information */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Company Information</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-400">Company Name</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-slate-800 dark:text-white"
                          placeholder="Your Company LLC"
                          value={formData.companyName}
                          onChange={(e) =>
                            setFormData({ ...formData, companyName: e.target.value })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-400">Company Email</label>
                        <input
                          type="email"
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-slate-800 dark:text-white"
                          placeholder="info@yourcompany.com"
                          value={formData.companyEmail}
                          onChange={(e) =>
                            setFormData({ ...formData, companyEmail: e.target.value })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-400">Company Phone</label>
                        <input
                          type="tel"
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-slate-800 dark:text-white"
                          placeholder="+20 123 456 7890"
                          value={formData.companyPhone}
                          onChange={(e) =>
                            setFormData({ ...formData, companyPhone: e.target.value })
                          }
                        />
                      </div>

                      <div className="space-y-2 sm:col-span-2">
                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-400">Company Address</label>
                        <textarea
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-slate-800 dark:text-white resize-none"
                          rows={3}
                          placeholder="123 Business St, Cairo, Egypt"
                          value={formData.companyAddress}
                          onChange={(e) =>
                            setFormData({ ...formData, companyAddress: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Customer Information */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Customer Information</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-400">Customer Name</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-slate-800 dark:text-white"
                          placeholder="Customer Name"
                          value={formData.customerName || ''}
                          onChange={(e) =>
                            setFormData({ ...formData, customerName: e.target.value })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-400">Customer Email</label>
                        <input
                          type="email"
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-slate-800 dark:text-white"
                          placeholder="customer@email.com"
                          value={formData.customerEmail || ''}
                          onChange={(e) =>
                            setFormData({ ...formData, customerEmail: e.target.value })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-400">Customer Phone</label>
                        <input
                          type="tel"
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-slate-800 dark:text-white"
                          placeholder="+20 987 654 3210"
                          value={formData.customerPhone || ''}
                          onChange={(e) =>
                            setFormData({ ...formData, customerPhone: e.target.value })
                          }
                        />
                      </div>

                      <div className="space-y-2 sm:col-span-2">
                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-400">Customer Address</label>
                        <textarea
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-slate-800 dark:text-white resize-none"
                          rows={3}
                          placeholder="456 Customer Ave, Alexandria"
                          value={formData.customerAddress || ''}
                          onChange={(e) =>
                            setFormData({ ...formData, customerAddress: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Invoice Dates & Currency */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Dates & Currency</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-400">Invoice Date</label>
                        <input
                          type="date"
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-slate-800 dark:text-white"
                          value={formData.invoiceDate}
                          onChange={(e) =>
                            setFormData({ ...formData, invoiceDate: e.target.value })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-400">Due Date</label>
                        <input
                          type="date"
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-slate-800 dark:text-white"
                          value={formData.dueDate}
                          onChange={(e) =>
                            setFormData({ ...formData, dueDate: e.target.value })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-400">Currency</label>
                        <select
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-slate-800 dark:text-white"
                          value={formData.currency}
                          onChange={(e) =>
                            setFormData({ ...formData, currency: e.target.value })
                          }
                        >
                          <option value="USD">USD ($)</option>
                          <option value="EGP">EGP (£)</option>
                          <option value="EUR">EUR (€)</option>
                          <option value="GBP">GBP (£)</option>
                          <option value="CAD">CAD ($)</option>
                          <option value="AUD">AUD ($)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Invoice Items</h3>
                      </div>
                      <button
                        onClick={handleAddItem}
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add Item
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {formData.items.map((item, index) => (
                        <div key={item.id} className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-600 rounded-xl p-4 border border-slate-200 dark:border-slate-600">
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 px-3 py-1 rounded-full">
                              Item {index + 1}
                            </span>
                            <button
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg transition-all duration-200"
                              onClick={() => handleRemoveItem(index)}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                          
                          <div className="space-y-3">
                            <div>
                              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Description</label>
                              <input
                                type="text"
                                className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-slate-800 dark:text-white text-sm"
                                placeholder="Item description"
                                value={item.description}
                                onChange={(e) =>
                                  handleItemChange(index, 'description', e.target.value)
                                }
                              />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Quantity</label>
                                <input
                                  type="number"
                                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-slate-800 dark:text-white text-sm"
                                  placeholder="1"
                                  value={item.quantity}
                                  onChange={(e) =>
                                    handleItemChange(index, 'quantity', e.target.value)
                                  }
                                />
                              </div>
                              
                              <div>
                                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Unit Price</label>
                                <input
                                  type="number"
                                  step="0.01"
                                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-slate-800 dark:text-white text-sm"
                                  placeholder="0.00"
                                  value={item.unitPrice}
                                  onChange={(e) =>
                                    handleItemChange(index, 'unitPrice', e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 px-3 py-1 rounded-full">
                                Total: {formData.currency} {(item.quantity * item.unitPrice).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Additional Notes</label>
                    <textarea
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-slate-800 dark:text-white resize-none"
                      rows={4}
                      placeholder="Payment terms, additional notes, or special instructions..."
                      value={formData.notes || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                    />
                  </div>

                  {/* Total */}
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium">Total Amount</span>
                      <span className="text-2xl font-bold">{formData.currency} {totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preview Section */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700">
                <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                      Live Preview
                    </h2>
                    <button
                      onClick={handlePrint}
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                      </svg>
                      Export PDF
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-4 min-h-[600px] max-h-[calc(100vh-300px)] overflow-auto">
                    {renderTemplate()}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}