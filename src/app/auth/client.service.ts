import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ClientService {
  private baseUrl = 'http://localhost:8080/clients';

  constructor(private http: HttpClient) {}

getAllUsers() {
  return this.http.get<any>('http://localhost:8080/users?page=0&size=100');
}

  getClients(page = 0, size = 10) {
    return this.http.get<any>(`${this.baseUrl}?page=${page}&size=${size}`);
  }

  createClient(data: any) {
    return this.http.post(`${this.baseUrl}`, data);
  }

  updateClient(id: number, data: any) {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  deleteClient(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getClientStats() {
    return this.http.get<any>(`${this.baseUrl}/stats`);
  }

  getCurrentUser() {
  return this.http.get<any>('http://localhost:8080/auth/me');
}

searchClients(filters: any, page = 0, size = 10) {
  const params = new URLSearchParams();

  if (filters.name) params.append('name', filters.name);
  if (filters.email) params.append('email', filters.email);
  if (filters.type) params.append('type', filters.type);
  if (filters.status) params.append('status', filters.status);

  params.append('page', String(page));
  params.append('size', String(size));

  return this.http.get<any>(`http://localhost:8080/clients/search?${params.toString()}`);
}

getLastClients() {
  return this.http.get<any>(`${this.baseUrl}?page=0&size=3`);
}

} 