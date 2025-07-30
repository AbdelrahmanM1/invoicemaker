'use client';
import React, { forwardRef } from 'react';

type InvoiceItem = {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
};

type ClassicTemplateProps = {
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
  totalAmount: number;
  currency: string;
  notes?: string;
};

const ClassicTemplate = forwardRef<HTMLDivElement, ClassicTemplateProps>(({
  invoiceNumber,
  companyName,
  companyAddress,
  companyEmail,
  companyPhone,
  customerEmail,
  customerPhone,
  customerName,
  customerAddress,
  invoiceDate,
  dueDate,
  items,
  totalAmount,
  currency,
  notes
}, ref) => {
  return (
    <div ref={ref} className="p-8 bg-white text-gray-800 font-sans rounded-md shadow max-w-4xl mx-auto">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Invoice #{invoiceNumber}</h1>
        <div className="text-sm leading-5">
          <p>{companyName}</p>
          <p>{companyAddress}</p>
          <p>Email: {companyEmail}</p>
          <p>Phone: {companyPhone}</p>
        </div>
      </header>

      {/* Customer */}
      {customerName && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold">Bill To:</h2>
          <div className="text-sm">
            <p>{customerName}</p>
            {customerAddress && <p>{customerAddress}</p>}
            {customerEmail && <p>Email: {customerEmail}</p>}
            {customerPhone && <p>Phone: {customerPhone}</p>}
          </div>
        </section>
      )}

      {/* Dates */}
      <section className="mb-6 text-sm">
        <div className="flex justify-between flex-wrap gap-y-1">
          <p><strong>Invoice Date:</strong> {invoiceDate}</p>
          <p><strong>Due Date:</strong> {dueDate}</p>
        </div>
      </section>

      {/* Items Table */}
      <table className="w-full border-collapse mb-8 text-sm">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">Unit Price</th>
            <th className="border px-4 py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td className="border px-4 py-2">{item.description}</td>
              <td className="border px-4 py-2">{item.quantity}</td>
              <td className="border px-4 py-2">{item.unitPrice.toFixed(2)} {currency}</td>
              <td className="border px-4 py-2">
                {(item.quantity * item.unitPrice).toFixed(2)} {currency}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Notes */}
      {notes && (
        <section className="mb-6 text-sm">
          <h3 className="font-semibold mb-1">Notes</h3>
          <p>{notes}</p>
        </section>
      )}

      {/* Total */}
      <footer className="text-right mt-6">
        <h2 className="text-xl font-bold">Total: {totalAmount.toFixed(2)} {currency}</h2>
      </footer>
    </div>
  );
});

ClassicTemplate.displayName = 'ClassicTemplate';
export default ClassicTemplate;
