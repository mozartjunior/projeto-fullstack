import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EquipamentosService } from '../../services/equipamento.service';
import { Equipamento } from '../../models/equipamento.model';

@Component({
  selector: 'app-assets',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './assets.html',
  styleUrl: './assets.css'
})
export class Assets implements OnInit {
  equipamentos: Equipamento[] = [];
  loading: boolean = false;
  
  // 1. Variáveis de Filtro (Agora com Localização!)
  termoBusca: string = ''; 
  filtroStatus: string = 'TODOS';
  filtroTipo: string = 'TODOS';
  filtroLocalizacao: string = 'TODAS'; // <-- NOVO

  tiposDisponiveis: string[] = []; 
  localizacoesDisponiveis: string[] = []; // <-- NOVO

  totalEquipamentos: number = 0;
  equipamentosAtivos: number = 0;
  equipamentosInativos: number = 0;

  constructor(
    private equipamentosService: EquipamentosService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarEquipamentos();
  }

  carregarEquipamentos(): void {
    this.loading = true;
    this.equipamentosService.listarTodos().subscribe({
      next: (data) => {
        this.equipamentos = data;
        this.totalEquipamentos = this.equipamentos.length;
        
        this.equipamentosAtivos = this.equipamentos.filter(eq => eq.ativo === true).length;
        this.equipamentosInativos = this.totalEquipamentos - this.equipamentosAtivos;

        // 2. Extraindo Tipos e Localizações dinamicamente do banco
        this.tiposDisponiveis = [...new Set(data.map(eq => eq.tipo))].sort();
        this.localizacoesDisponiveis = [...new Set(data.map(eq => eq.setor?.nome).filter(n => !!n))].sort() as string[]; // <-- NOVO

        this.loading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao carregar equipamentos:', err);
        this.loading = false;
      }
    });
  }

  // 3. A filtragem aprimorada
  get equipamentosFiltrados() {
    let filtrados = this.equipamentos;

    if (this.termoBusca) {
      const termo = this.termoBusca.toLowerCase();
      filtrados = filtrados.filter(eq => 
        eq.nome.toLowerCase().includes(termo) || 
        eq.codigo.toLowerCase().includes(termo)
      );
    }

    if (this.filtroStatus !== 'TODOS') {
      const isAtivo = this.filtroStatus === 'ATIVO';
      filtrados = filtrados.filter(eq => eq.ativo === isAtivo);
    }

    if (this.filtroTipo !== 'TODOS') {
      filtrados = filtrados.filter(eq => eq.tipo === this.filtroTipo);
    }

    if (this.filtroLocalizacao !== 'TODAS') {
      filtrados = filtrados.filter(eq => eq.setor?.nome === this.filtroLocalizacao);
    }

    return filtrados;
  }
}