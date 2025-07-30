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