import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Manutencao {
  id: number;
  plano: string;
  equipamento: string;
  dataPrevista: string;
  diasAtraso: number;
}

@Injectable({
  providedIn: 'root',
})
export class Manutencao {}
