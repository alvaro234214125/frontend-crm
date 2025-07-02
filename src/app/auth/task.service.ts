import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task, TaskStatus } from '../model/task.model'; // Ajusta la ruta según tu estructura

export interface PaginatedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  private baseUrl = 'http://localhost:8080/tasks';

  constructor(private http: HttpClient) {}

  getTasks(page = 0, size = 10): Observable<PaginatedResponse<Task>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);
    return this.http.get<PaginatedResponse<Task>>(this.baseUrl, { params });
  }

  searchTasks(
    filters: {
      title?: string;
      status?: TaskStatus;
      userId?: number;
      clientId?: number;
    },
    page = 0,
    size = 10
  ): Observable<PaginatedResponse<Task>> {
    let params = new HttpParams().set('page', page).set('size', size);

    if (filters.title) params = params.set('title', filters.title.trim());
    if (filters.status) params = params.set('status', filters.status);
    if (filters.userId !== undefined) params = params.set('userId', filters.userId.toString());
    if (filters.clientId !== undefined) params = params.set('clientId', filters.clientId.toString());

    return this.http.get<PaginatedResponse<Task>>(`${this.baseUrl}/search`, { params });
  }

  getTaskStats(): Observable<{ total: number; completadas: number; pendientes: number }> {
    return this.http.get<{ total: number; completadas: number; pendientes: number }>(`${this.baseUrl}/stats`);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, task);
  }

  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/${id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/users', {
      params: new HttpParams().set('page', 0).set('size', 100)
    });
  }

  getCurrentUser(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/auth/me');
  }
}