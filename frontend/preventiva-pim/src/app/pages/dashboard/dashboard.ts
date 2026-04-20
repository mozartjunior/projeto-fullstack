import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Definindo interfaces para organizar os dados
interface ResumoCard {
  titulo: string;
  valor: string | number;
  subtexto: string;
  corBorder: string;
  trend?: string;
  isDark?: boolean;
}

interface ManutencaoAtrasada {
  id: string;
  plano: string;
  equipamento: string;
  status: 'MUITO CRÍTICO' | 'URGENTE' | 'PENDENTE';
  dataPrevista: string;
  diasAtraso: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  
  // Dados que virão do Backend futuramente
  cardsResumo: ResumoCard[] = [
    { titulo: 'Atrasadas', valor: 12, subtexto: '+4 desde ontem', corBorder: 'border-red-500', trend: 'text-red-500' },
    { titulo: 'Próximos 7 Dias', valor: 48, subtexto: '24 manutenções preventivas', corBorder: 'border-blue-500' },
    { titulo: 'Conformidade', valor: '94%', subtexto: 'Meta mensal: 98%', corBorder: 'border-green-500' },
    { titulo: 'Execuções no Mês', valor: 312, subtexto: '+15% em relação ao mês anterior', corBorder: 'border-slate-800', isDark: true },
  ];

  atrasosCriticos: ManutencaoAtrasada[] = [
    { id: '#MNT-2024-089', plano: 'Preventiva Semestral - Turbina T12', equipamento: 'Compressor Industrial Alpha', status: 'MUITO CRÍTICO', dataPrevista: '12 Out 2023', diasAtraso: 14 },
    { id: '#MNT-2024-102', plano: 'Lubrificação Automática - Setor C', equipamento: 'Braço Robótico KUKA v3', status: 'URGENTE', dataPrevista: '18 Out 2023', diasAtraso: 8 },
    { id: '#MNT-2024-115', plano: 'Calibração de Sensores de Pressão', equipamento: 'Caldeira de Alta Pressão H2', status: 'URGENTE', dataPrevista: '22 Out 2023', diasAtraso: 4 },
    { id: '#MNT-2024-121', plano: 'Inspeção de Segurança Elétrica', equipamento: 'Subestação Norte - Bloco 02', status: 'PENDENTE', dataPrevista: '25 Out 2023', diasAtraso: 1 },
  ];

  constructor() {}

  ngOnInit(): void {
    // Aqui você chamará o serviço: this.service.getDashboardData().subscribe(...)
  }

  getSeverityClass(status: string) {
    switch (status) {
      case 'MUITO CRÍTICO': return 'bg-red-100 text-red-600 border-red-200';
      case 'URGENTE': return 'bg-orange-100 text-orange-600 border-orange-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  }
}