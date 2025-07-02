import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Interaction } from '../model/interaction.model';
import { PageResponse } from '../model/page-response.model';

@Injectable({ providedIn: 'root' })
export class InteractionService {
  private apiUrl = 'http://localhost:8080/interactions';

  constructor(private http: HttpClient) {}

  getAll(page = 0, size = 10, sortBy = 'id', direction = 'asc'): Observable<PageResponse<Interaction>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('direction', direction);

    return this.http.get<PageResponse<Interaction>>(this.apiUrl, { params });
  }

  getById(id: number): Observable<Interaction> {
    return this.http.get<Interaction>(`${this.apiUrl}/${id}`);
  }

  create(interaction: Interaction): Observable<Interaction> {
    return this.http.post<Interaction>(this.apiUrl, interaction);
  }

  update(id: number, interaction: Interaction): Observable<Interaction> {
    return this.http.put<Interaction>(`${this.apiUrl}/${id}`, interaction);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getStats(): Observable<{ total: number; tiposUnicos: number; clientesConInteraccion: number }> {
    return this.http.get<{ total: number; tiposUnicos: number; clientesConInteraccion: number }>(`${this.apiUrl}/stats`);
  }
}
