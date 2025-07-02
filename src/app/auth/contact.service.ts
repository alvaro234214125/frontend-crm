import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiUrl = 'http://localhost:8080/contacts';

  constructor(private http: HttpClient) {}

  getContacts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/client/1`);
  }

  createContact(contact: any): Observable<any> {
    contact.clientId = 1;
    return this.http.post<any>(`${this.apiUrl}`, contact);
  }

  updateContact(id: number, contact: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, contact);
  }

  deleteContact(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  getContactStats(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/stats`);
  }
}
