

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://backend/api/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string, credentials: { email: string; password: string; }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  signup(email: string, password: string, name: string, userdata: { name: string; email: string; password: string; }): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userdata);
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
