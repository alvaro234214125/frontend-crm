import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment, PaymentStats, PageResponse } from '../model/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseUrl = 'http://localhost:8080/payments';

  constructor(private http: HttpClient) {}

  getPayments(page: number = 0, size: number = 10): Observable<PageResponse<Payment>> {
    return this.http.get<PageResponse<Payment>>(`${this.baseUrl}?page=${page}&size=${size}`);
  }

  getPaymentById(id: number): Observable<Payment> {
    return this.http.get<Payment>(`${this.baseUrl}/${id}`);
  }

  createPayment(payment: Omit<Payment, 'id'>): Observable<Payment> {
    return this.http.post<Payment>(this.baseUrl, payment);
  }

  deletePayment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getPaymentStats(): Observable<PaymentStats> {
    return this.http.get<PaymentStats>(`${this.baseUrl}/stats`);
  }
}