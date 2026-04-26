import { Equipamento } from './equipamento.model';
import { Usuario } from './usuario.model';

// Se você já tiver um arquivo equipamento.model.ts, importe-o aqui.
// Caso contrário, podemos definir a estrutura básica necessária.
export interface EquipamentoResumido {
  id: number;
  codigo: string;
  nome: string;
  tipo: string;
  fabricante?: string;
  modelo?: string;
  ativo: boolean;
}

export interface PlanoManutencao {
  id?: number;
  titulo: string;
  descricao: string | null;
  periodicidade_dias: number;
  proxima_em: string | Date;
  ativo: boolean;

  // IDs das chaves estrangeiras (essenciais para formulários/POST)
  equipamento_id: number;
  tecnico_id: number | string | null; // Ajustado conforme o tipo do ID do seu Usuario

  // Objetos completos (essenciais para listagens/tabelas)
  // O backend envia esses dados quando usamos o relations: ["equipamento", "tecnico"]
  equipamento: EquipamentoResumido; 
  tecnico: Usuario | null;
}