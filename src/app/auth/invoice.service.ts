import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice, InvoiceStats } from '../model/invoice.model';
import { PageResponse } from '../model/page-response.model';

@Injectable({ providedIn: 'root' })
export class InvoiceService {
  private apiUrl = 'http://localhost:8080/invoices';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getAll(page = 0, size = 10, sortBy = 'id', direction = 'asc'): Observable<PageResponse<Invoice>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sortBy', sortBy)
      .set('direction', direction);

    return this.http.get<PageResponse<Invoice>>(this.apiUrl, {
      headers: this.getAuthHeaders(),
      params
    });
  }

  getById(id: number): Observable<Invoice> {
    return this.http.get<Invoice>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  create(invoice: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>(this.apiUrl, invoice, {
      headers: this.getAuthHeaders()
    });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  getStats(): Observable<InvoiceStats> {
    return this.http.get<InvoiceStats>(`${this.apiUrl}/stats`, {
      headers: this.getAuthHeaders()
    });
  }

  downloadPdf(id: number): Observable<Blob> {
    return this.http.get(`http://localhost:8080/invoices/${id}/pdf`, {
      responseType: 'blob'
    });
  }   
}