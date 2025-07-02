export interface Client {
    id: number;
    name: string;
    email?: string;
    phone?: string;
  }
  
  export interface Product {
    id: number;
    name: string;
    price: number;
    stock?: number;
  }
  
  export interface QuotationDetail {
    id?: number;
    quotationId?: number;
    productId: number;
    quantity: number;
    unitPrice: number;
  }
  
  export interface Quotation {
    id: number;
    clientId: number;
    issueDate: string;
    status: 'Sent' | 'Accepted' | 'Rejected';
    total: number;
    details?: QuotationDetail[];
  }
  
  export interface QuotationStats {
    total: number;
    accepted: number;
    rejected: number;
}
  
  export interface PageResponse<T> {
    content: T[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    last: boolean;
  }