// src/app/core/services/auth.service.ts

import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  usuario: {
    id_usuario: string;
    nome: string;
    email: string;
    perfil: string;
  };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API = 'http://localhost:6060';

  private _accessToken = signal<string | null>(localStorage.getItem('accessToken'));
  private _usuario = signal<AuthResponse['usuario'] | null>(this.loadUsuario());

  readonly isAuthenticated = computed(() => !!this._accessToken());
  readonly usuario = this._usuario.asReadonly();
  readonly perfil = computed(() => this._usuario()?.perfil ?? null);

  constructor(private http: HttpClient, private router: Router) {}

  login(payload: { email: string; password: string }) {
    return this.http.post<AuthResponse>(`${this.API}/auth/login`, payload).pipe(
      tap((res) => {
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        localStorage.setItem('usuario', JSON.stringify(res.usuario));
        this._accessToken.set(res.accessToken);
        this._usuario.set(res.usuario);
      })
    );
  }

  logout() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      this.http.post(`${this.API}/auth/logout`, { refreshToken }).subscribe();
    }
    this.clearSession();
    this.router.navigate(['/login']);
  }

  getAccessToken(): string | null {
    return this._accessToken();
  }

  clearSession() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('usuario');
    this._accessToken.set(null);
    this._usuario.set(null);
  }

  private loadUsuario(): AuthResponse['usuario'] | null {
    const raw = localStorage.getItem('usuario');
    return raw ? JSON.parse(raw) : null;
  }
}