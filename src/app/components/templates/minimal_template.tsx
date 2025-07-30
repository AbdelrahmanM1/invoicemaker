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
  totalAmount: number;
  customerAddress?: string;
  invoiceDate: string;
  dueDate: string;
  items: InvoiceItem[];
  currency: string;
  notes?: string;
}

const MinimalTemplate = forwardRef<HTMLDivElement, InvoiceData>(({
  invoiceNumber,
  companyName,
  companyAddress,
  companyEmail,
  companyPhone,
  customerName,
  customerEmail,
  totalAmount,
  customerPhone,
  customerAddress,
  invoiceDate,
  dueDate,
  items,
  currency,
  notes,
}, ref) => {

  return (
    <div
      ref={ref}
      className="p-8 max-w-3xl mx-auto font-sans text-sm text-gray-800 bg-white border border-gray-300 rounded shadow-md"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{companyName}</h1>
          <p>{companyAddress}</p>
          <p>{companyEmail}</p>
          <p>{companyPhone}</p>
        </div>
        <div className="text-right text-sm">
          <p className="font-semibold text-gray-700">Invoice #{invoiceNumber}</p>
          <p>Date: {invoiceDate}</p>
          <p>Due: {dueDate}</p>
        </div>
      </div>

      {/* Billed To */}
      <div className="mb-6">
        <h2 className="text-base font-semibold text-gray-800 mb-1">Billed To:</h2>
        <p>{customerName || 'Unnamed Customer'}</p>
        {customerAddress && <p>{customerAddress}</p>}
        {customerEmail && <p>{customerEmail}</p>}
        {customerPhone && <p>{customerPhone}</p>}
      </div>

      {/* Table */}
      <table className="w-full text-left border-t border-b mb-6">
        <thead>
          <tr className="text-xs uppercase text-gray-600 border-b">
            <th className="py-2">Item</th>
            <th className="py-2 text-right">Qty</th>
            <th className="py-2 text-right">Unit Price</th>
            <th className="py-2 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map(({ id, description, quantity, unitPrice }) => (
            <tr key={id} className="border-b last:border-none">
              <td className="py-2">{description}</td>
              <td className="py-2 text-right">{quantity}</td>
              <td className="py-2 text-right">{currency} {unitPrice.toFixed(2)}</td>
              <td className="py-2 text-right">{currency} {(quantity * unitPrice).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Total */}
      <div className="text-right text-base font-bold mb-4">
        Total: {currency} {totalAmount}
      </div>

      {/* Notes */}
      {notes && (
        <div className="mt-6 border-t pt-4 text-gray-700 text-sm">
          <h3 className="font-semibold mb-1">Notes</h3>
          <p>{notes}</p>
        </div>
      )}
    </div>
  );
});

MinimalTemplate.displayName = 'MinimalTemplate';
export default MinimalTemplate;
