'use client';

import React, { forwardRef } from 'react';

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface InvoiceData {
  invoiceNumber: string;
  companyName: string;
  companyAddress: string;
  companyEmail: string;
  companyPhone: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  customerAddress?: string;
  invoiceDate: string;
  dueDate: string;
  items: InvoiceItem[];
  currency: string;
  notes?: string;
}

const ModernTemplate = forwardRef<HTMLDivElement, InvoiceData>(({
  invoiceNumber,
  companyName,
  companyAddress,
  companyEmail,
  companyPhone,
  customerName,
  customerEmail,
  customerPhone,
  customerAddress,
  invoiceDate,
  dueDate,
  items,
  currency,
  notes,
}, ref) => {
  const total = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0).toFixed(2);

  return (
    <div
      ref={ref}
      className="print:bg-white print:text-black print:shadow-none print:rounded-none max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-md text-gray-900 font-sans text-sm"
    >
      {/* Header */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-blue-600 print:text-black">{companyName}</h1>
          <p>{companyAddress}</p>
          <p>{companyEmail}</p>
          <p>{companyPhone}</p>
        </div>
        <div className="text-right">
          <h2 className="text-lg font-semibold">Invoice</h2>
          <p className="text-gray-600">Invoice #: {invoiceNumber}</p>
          <p>Date: {invoiceDate}</p>
          <p>Due: {dueDate}</p>
        </div>
      </div>

      {/* Billed To */}
      <div className="mb-8">
        <h3 className="text-md font-semibold mb-1 text-gray-700">Bill To</h3>
        <div className="text-gray-800">
          <p>{customerName || 'Unnamed Customer'}</p>
          {customerAddress && <p>{customerAddress}</p>}
          {customerEmail && <p>{customerEmail}</p>}
          {customerPhone && <p>{customerPhone}</p>}
        </div>
      </div>

      {/* Table */}
      <table className="w-full mb-8 border border-gray-300">
        <thead className="bg-blue-50 text-blue-700 text-xs uppercase tracking-wider print:bg-gray-200 print:text-black">
          <tr>
            <th className="p-2 text-left border-b">Item</th>
            <th className="p-2 text-right border-b">Qty</th>
            <th className="p-2 text-right border-b">Unit Price</th>
            <th className="p-2 text-right border-b">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map(({ id, description, quantity, unitPrice }) => (
            <tr key={id} className="border-b">
              <td className="p-2">{description}</td>
              <td className="p-2 text-right">{quantity}</td>
              <td className="p-2 text-right">{currency} {unitPrice.toFixed(2)}</td>
              <td className="p-2 text-right">{currency} {(quantity * unitPrice).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Total */}
      <div className="flex justify-end mb-8">
        <div className="text-right">
          <p className="text-lg font-bold">Total: {currency} {total}</p>
        </div>
      </div>

      {/* Notes */}
      {notes && (
        <div className="border-t pt-4 text-sm text-gray-700">
          <h4 className="font-semibold mb-1">Notes</h4>
          <p>{notes}</p>
        </div>
      )}
    </div>
  );
});

ModernTemplate.displayName = 'ModernTemplate';
export default ModernTemplate;
