import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of, Observable } from 'rxjs'; // Importe o 'of' para criar um Observable fake

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:6060';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    // Lógica do Superusuário
    if (credentials.email === 'admin@empresa.com' && credentials.password === 'admin123') {
      const mockResponse = {
        token: 'token-de-bypass-estatico',
        user: { name: 'Administrador Mestre', role: 'ADMIN' }
      };
      
      // Salva no localStorage para o Guard não barrar
      localStorage.setItem('access_token', mockResponse.token);
      return of(mockResponse); // Retorna sucesso sem ir no backend
    }

    // Se não for o admin, faz a chamada real
    return this.http.post(`${this.apiUrl}/auth/Login`, credentials).pipe(
      tap({
        next: (res: any) => {
          if (res.accessToken) {
            localStorage.setItem('access_token', res.accessToken);
            localStorage.setItem('user', JSON.stringify(res.usuario));
          }
        },
        error: (err) => {
          console.error('Erro de login:', err);
        }
      })
    );
  }
  
  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}