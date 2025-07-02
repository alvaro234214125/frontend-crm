import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';
import { PageResponse } from '../model/page-response.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/products';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  getAll(page: number = 0, size: number = 100): Observable<PageResponse<Product>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);

    return this.http.get<PageResponse<Product>>(this.apiUrl, {
      headers: this.getAuthHeaders(),
      params,
    });
  }

  getProducts(page: number = 0, size: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);

    return this.http.get<any>(`${this.apiUrl}`, {
      headers: this.getAuthHeaders(),
      params,
    });
  }

  getProductStats(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/stats`, {
      headers: this.getAuthHeaders(),
    });
  }

  createProduct(product: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, product, {
      headers: this.getAuthHeaders(),
    });
  }

  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, product, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  searchProducts(filters: any, page: number = 0, size: number = 10): Observable<any> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    if (filters.name) params = params.set('name', filters.name);
    if (filters.type) params = params.set('type', filters.type);

    return this.http.get<any>(`${this.apiUrl}/search`, {
      headers: this.getAuthHeaders(),
      params,
    });
  }
}
