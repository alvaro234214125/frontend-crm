import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivityLog } from '../model/activity-log.model';

export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ActivityLogService {
  private readonly apiUrl = 'http://localhost:8080/logs';

  constructor(private http: HttpClient) {}

  getRecentActivities(page: number = 0, size: number = 5): Observable<PageResponse<ActivityLog>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);

    return this.http.get<PageResponse<ActivityLog>>(this.apiUrl, { params });
  }
}
