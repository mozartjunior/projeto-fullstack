import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Equipamento } from '../models/equipamento.model';

@Injectable({
  providedIn: 'root'
})
export class EquipamentosService {
  private readonly API = 'http://localhost:6060/equipamentos'; // URL do seu Docker
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Equipamento[]> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Equipamento[]>(this.API, { headers });
  }

  buscarPorId(id: number): Observable<Equipamento> {
    return this.http.get<Equipamento>(`${this.API}/${id}`);
  }

  salvar(equipamento: Equipamento): Observable<Equipamento> {
    if (equipamento.id) {
      return this.http.put<Equipamento>(`${this.API}/${equipamento.id}`, equipamento);
    }
    return this.http.post<Equipamento>(this.API, equipamento);
  }

  // Busca para o filtro da tabela
  pesquisar(termo: string): Observable<Equipamento[]> {
    return this.http.get<Equipamento[]>(`${this.API}/search?q=${termo}`);
  }
}