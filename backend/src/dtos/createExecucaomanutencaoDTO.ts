// =============================================================
// 📦 DTO: createExecucaoManutencaoDTO
// Arquivo: src/dtos/createExecucaoManutencaoDTO.ts
//
// O DTO define o "contrato" dos dados que chegam pela requisição.
// Ele fica em src/dtos/ — igual ao seu createUserSchemaDTO.ts.
// =============================================================

export interface CreateExecucaoManutencaoDTO {
  plano_id: number;       // FK obrigatória → plano_manutencao
  tecnico_id?: number;    // FK opcional    → usuario
  data_execucao: string;  // Formato: 'YYYY-MM-DD'  (NOT NULL)
  status: 'realizada' | 'parcial' | 'nao_realizada'; // ENUM
  observacoes?: string;   // Texto livre, opcional
  conformidade: boolean;  // NOT NULL — true ou false
}