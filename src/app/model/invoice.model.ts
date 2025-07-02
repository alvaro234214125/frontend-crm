export interface Invoice {
  id?: number;
  clientId: number;
  issueDate: string;
  total: number;
  details: InvoiceDetail[];
  status?: 'Pending' | 'Paid' | 'Cancelled' | string;
}

export interface InvoiceDetail {
  productId: number;
  quantity: number;
  unitPrice: number;
}

export interface InvoiceStats {
  totalIncome: number;
  totalInvoices: number;
  clientsWithInvoices: number;
}