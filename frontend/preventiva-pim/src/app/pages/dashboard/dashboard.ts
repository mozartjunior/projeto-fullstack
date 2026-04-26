import { Component, Inject, OnInit, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard-manutencao',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardManutencaoComponent implements OnInit {
  resumo: any = {};
  manutencoesAtrasadas: any[] = [];

  constructor(
    private dashboardService: DashboardService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)){
      this.carregarDados();
    }  
  }

  carregarDados(): void {
    this.dashboardService.getResumoDashboard().subscribe({
      next: (dados) => {
        this.resumo = {
          atrasos: dados.manutencoes_atrasadas,
          proximos: dados.previstos_7_dias,
          conformidadePercentual: dados.conformidade_mes?.percentual || 0,
          conformidadeRealizadas: dados.conformidade_mes?.realizadas || 0,
          conformidadeTotal: dados.conformidade_mes?.total || 0,
          execucoes: dados.execucoes_mes
        };
        
        this.manutencoesAtrasadas = dados.lista_atrasadas;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao buscar dados da API', err);
      }
    });
  }
}