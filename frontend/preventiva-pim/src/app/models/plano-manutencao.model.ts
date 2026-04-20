import { Equipamento } from './equipamento.model';
import { Usuario } from './usuario.model';

export interface PlanoManutencao {
  id?: number; // Opcional porque no cadastro o ID ainda não existe
  titulo: string;
  descricao?: string | null;
  periodicidade_dias: number;
  proxima_em: Date | string; // Aceita Date ou a String que vem do JSON (YYYY-MM-DD)
  ativo: boolean;
  
  // No Angular, podemos receber o objeto completo ou apenas o ID
  equipamento?: Equipamento; 
  equipamento_id?: number; 

  tecnico?: Usuario | null;
  tecnico_id?: number | null;
}