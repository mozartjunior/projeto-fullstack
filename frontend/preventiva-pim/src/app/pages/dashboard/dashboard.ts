import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard-manutencao',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardManutencaoComponent implements OnInit {
  // Criamos um objeto para facilitar o uso no HTML
  resumo: any = {};
  manutencoesAtrasadas: any[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    this.dashboardService.getResumoDashboard().subscribe({
      next: (dados) => {
        // Mapeando exatamente as chaves do seu DashboardController
        this.resumo = {
          atrasos: dados.manutencoes_atrasadas,
          proximos: dados.previstos_7_dias,
          conformidadePercentual: dados.conformidade_mes?.percentual || 0,
          conformidadeRealizadas: dados.conformidade_mes?.realizadas || 0,
          conformidadeTotal: dados.conformidade_mes?.total || 0,
          execucoes: dados.execucoes_mes
        };
        
        this.manutencoesAtrasadas = dados.lista_atrasadas;
      },
      error: (err) => {
        console.error('Erro ao buscar dados da API', err);
      }
    });
  }
}