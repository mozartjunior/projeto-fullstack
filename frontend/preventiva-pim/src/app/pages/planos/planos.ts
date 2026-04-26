import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanoManutencaoService } from '../../services/manutencao.service';
import { PlanoManutencao } from '../../models/plano-manutencao.model';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-planos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './planos.html',
  styleUrls: ['./planos.css']
})
export class PlanosComponent implements OnInit {
  planos: PlanoManutencao[] = [];
  
  // Simulando o usuário logado (no mundo real, vem do AuthService)
  usuarioLogado: Usuario = {
    id: 1,
    nome: 'João Silva',
    email: 'joao@empresa.com',
    role: 'GESTOR' // Teste mudar para 'GESTOR' para ver o botão aparecer!
  };

  constructor(private planoService: PlanoManutencaoService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.carregarPlanos();
  }

  carregarPlanos(): void {
    this.planoService.listarPlanos().subscribe({
      next: (dados) => {
        this.planos = dados;
        this.cdr.detectChanges();
      },
      error: (erro) => console.error(erro)
    });
  }

  // Verifica se o usuário tem permissão para criar planos
  podeCriarPlano(): boolean {
    return this.usuarioLogado.role === 'ADMIN' || this.usuarioLogado.role === 'GESTOR';
  }

  // Deixa o número de dias mais amigável (ex: 30 dias -> 1 mês)
  formatarPeriodicidade(dias: number): string {
    if (dias === 7) return '1 semana';
    if (dias === 14) return '2 semanas';
    if (dias === 30) return '1 mês';
    if (dias === 60) return '2 meses';
    if (dias === 90) return '3 meses';
    if (dias === 180) return '6 meses';
    if (dias === 365) return '1 ano';
    return `${dias} dias`;
  }

  abrirModalNovoPlano(): void {
    console.log('Abrir modal de criação...');
    // Lógica do modal entra aqui no futuro
  }

  verDetalhes(id?: number): void {
    console.log('Ver detalhes do plano', id);
  }
}