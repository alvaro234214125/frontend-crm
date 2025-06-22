import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RoleService {
  constructor(private http: HttpClient) {}

  getRoles(page: number = 0, size: number = 10) {
    return this.http.get<any>(`http://localhost:8080/roles?page=${page}&size=${size}`);
  }

  createRole(data: any) {
    return this.http.post(`http://localhost:8080/roles`, data);
  }

  updateRole(id: number, data: any) {
    return this.http.put(`http://localhost:8080/roles/${id}`, data);
  }

  deleteRole(id: number) {
    return this.http.delete(`http://localhost:8080/roles/${id}`);
  }
}
