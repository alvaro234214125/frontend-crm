import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(page: number = 0, size: number = 10) {
    return this.http.get<any>(`http://localhost:8080/users?page=${page}&size=${size}`);
  }

  getUserStats() {
    return this.http.get<any>('http://localhost:8080/users/stats');
  }

  getRoles() {
    return this.http.get<any[]>('http://localhost:8080/roles');
  }

  createUser(data: any) {
    return this.http.post('http://localhost:8080/users', data);
  }

  updateUser(id: number, data: any) {
    return this.http.put(`http://localhost:8080/users/${id}`, data);
  }

  deleteUser(id: number) {
    return this.http.delete(`http://localhost:8080/users/${id}`);
  }
}