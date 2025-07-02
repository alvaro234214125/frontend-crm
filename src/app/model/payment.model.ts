export interface Payment {
    id: number;
    invoiceId: number;
    amount: number;
    paymentDate: string;
    paymentMethod: 'Cash' | 'Bank' | 'Transfer' | 'Card';
  }
  
  export interface PaymentStats {
    totalPayments: number;
    totalAmount: number;
    byCash: number;
    byCard: number;
    byTransfer: number;
    byBank: number;
  }
  
  export interface PageResponse<T> {
    content: T[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    last: boolean;
  }