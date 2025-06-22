import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, switchMap, tap, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();
  private token: string | null = localStorage.getItem('token');

  constructor(private http: HttpClient) {
    if (this.token) this.fetchUser().subscribe();
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:8080/auth/login', { email, password }).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        this.token = res.token;
      }),
      switchMap(() => this.fetchUser()),
      catchError(err => {
        this.logout();
        return throwError(() => err);
      })
    );
  }

 fetchUser(): Observable<any> {
  return this.http.get<any>('http://localhost:8080/auth/me').pipe(
    tap(user => this.userSubject.next(user)),
    catchError(err => {
      console.warn('Error al obtener usuario:', err);
      this.userSubject.next(null);
      return of(null);
    })
  );
}

  logout(): void {
    localStorage.removeItem('token');
    this.userSubject.next(null);
    this.token = null;
  }

  getToken(): string | null {
    return this.token;
  }

  isAuthenticated$(): Observable<boolean> {
    if (!this.token) return of(false);
    if (!this.userSubject.value) {
      return this.fetchUser().pipe(map(user => !!user));
    }
    return of(true);
  }

  getCurrentUser(): any {
    return this.userSubject.value;
  }
}
