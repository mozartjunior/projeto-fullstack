export interface CreateEquipamentoDTO {
  codigo: string;       // unique, obrigatório
  nome: string;         // obrigatório
  tipo: string;         // obrigatório
  id_setor: string;  // obrigatório
  fabricante?: string;  // opcional
  modelo?: string;      // opcional
  ativo?: boolean;      // opcional → default true
}
