import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Setor } from '../models/setor.model'; // Ajuste o caminho se necessário

@Injectable({
  providedIn: 'root'
})
export class SetorService {
  
  // Substitua pela porta e URL correta da sua API Node.js
  // Se você usa o environment.ts, pode importar a URL base dele.
  private apiUrl = 'http://localhost:6060/setores'; 

  constructor(private http: HttpClient) { }

  /**
   * Busca todos os setores cadastrados no banco de dados
   */
  listar(): Observable<Setor[]> {
    return this.http.get<Setor[]>(this.apiUrl);
  }
}