import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quotation, QuotationStats, PageResponse } from '../model/quotation.model';

@Injectable({
  providedIn: 'root'
})
export class QuotationService {
  private baseUrl = 'http://localhost:8080/quotations';

  constructor(private http: HttpClient) {}

  getQuotations(page: number = 0, size: number = 10, sortBy: string = 'id', direction: string = 'asc'): Observable<PageResponse<Quotation>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('direction', direction);
    
    return this.http.get<PageResponse<Quotation>>(this.baseUrl, { params });
  }

  getQuotationById(id: number): Observable<Quotation> {
    return this.http.get<Quotation>(`${this.baseUrl}/${id}`);
  }

  createQuotation(quotation: Omit<Quotation, 'id'>): Observable<Quotation> {
    return this.http.post<Quotation>(this.baseUrl, quotation);
  }

  deleteQuotation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getQuotationStats(): Observable<QuotationStats> {
    return this.http.get<QuotationStats>(`${this.baseUrl}/stats`);
  }
}