import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

const AUTH_API = '/auth/'; // Maps to the Nginx reverse proxy

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<any>(this.getUserFromStorage());
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    const payload = new URLSearchParams();
    payload.set('username', credentials.username);
    payload.set('password', credentials.password);

    return this.http.post(AUTH_API + 'login', payload.toString(), {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    }).pipe(tap((res: any) => {
      this.saveToken(res.access_token);
      this.fetchUser();
    }));
  }

  register(user: any): Observable<any> {
    return this.http.post(AUTH_API + 'register', {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }

  logout(): void {
    window.sessionStorage.clear();
    this.userSubject.next(null);
  }

  saveToken(token: string): void {
    window.sessionStorage.removeItem('auth-token');
    window.sessionStorage.setItem('auth-token', token);
  }

  getToken(): string | null {
    return window.sessionStorage.getItem('auth-token');
  }

  private fetchUser(): void {
    const token = this.getToken();
    if (token) {
      this.http.get(AUTH_API + 'users/me', {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`
        })
      }).subscribe(
        user => this.saveUser(user),
        err => this.logout()
      );
    }
  }

  saveUser(user: any): void {
    window.sessionStorage.removeItem('auth-user');
    window.sessionStorage.setItem('auth-user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  getUserFromStorage(): any {
    const user = window.sessionStorage.getItem('auth-user');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }
}
