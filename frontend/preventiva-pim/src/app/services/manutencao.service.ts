import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// 1. Importamos o Model oficial para não precisar repetir código aqui
import { PlanoManutencao } from '../models/plano-manutencao.model'; 

@Injectable({
  providedIn: 'root',
})
export class PlanoManutencaoService {
  // 2. Usei a porta 6060 que apareceu no seu print do Postman
  private readonly API = 'http://localhost:6060/planos'; 

  constructor(private http: HttpClient) {}

  // 3. O método que o seu componente 'planos.ts' está procurando desesperadamente:
  listarPlanos(): Observable<PlanoManutencao[]> {
    return this.http.get<PlanoManutencao[]>(this.API);
  }

  // Já deixei o buscar por ID pronto caso precise depois
  buscarPorId(id: number): Observable<PlanoManutencao> {
    return this.http.get<PlanoManutencao>(`${this.API}/${id}`);
  }
}