import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Usuario, CredenciaisLogin, RespostaLogin } from '../models/usuario.model';


@Injectable({ providedIn: 'root' })
export class AuthService {

    private readonly apiUrl = 'https://sua-api.com/api';
    private http = inject(HttpClient);
    private router = inject(Router);

// Signal privado com os dados do usuário
// null significa que não há usuário logado

    private _usuarioLogado = signal<Usuario | null>(
        this.carregarUsuarioDoStorage()
);
// Signal privado com o token JWT
    private _token = signal<string | null>(
        localStorage.getItem('taskflow_token')
);
// Expostos como readonly para que outros serviços e
// componentes possam ler mas não modificar diretamente
    readonly usuarioLogado = this._usuarioLogado.asReadonly();
    readonly token = this._token.asReadonly();
// Computed: true se há um usuário logado
    readonly estaAutenticado = computed(() =>
        this._token() !== null
);
async login(credenciais: CredenciaisLogin): Promise<void> {
    const resposta = await firstValueFrom(
        this.http.post<RespostaLogin>(
        `${this.apiUrl}/auth/login`,
            credenciais
)
);
    // Salva o token e o usuário no localStorage
    // para sobreviver ao recarregamento da página  
    localStorage.setItem('taskflow_token', resposta.token);
    localStorage.setItem('taskflow_usuario',
JSON.stringify(resposta.usuario));
    // Atualiza os Signals
    this._token.set(resposta.token);
    this._usuarioLogado.set(resposta.usuario);
    // Navega para o dashboard
    this.router.navigate(['/dashboard']);
}
logout(): void {
    // Remove do localStorage
    localStorage.removeItem('taskflow_token');
    localStorage.removeItem('taskflow_usuario');
    // Limpa os Signals
    this._token.set(null);
    this._usuarioLogado.set(null);
    // Redireciona para login
    this.router.navigate(['/login']);
}
getToken(): string | null {
    return this._token();
}
// Método privado: tenta recuperar o usuário salvo no localStorage
private carregarUsuarioDoStorage(): Usuario | null {
    const json = localStorage.getItem('taskflow_usuario');

    if (!json) return null;
        try {
        return JSON.parse(json) as Usuario;
    } catch {
            return null;
        }
    }
}