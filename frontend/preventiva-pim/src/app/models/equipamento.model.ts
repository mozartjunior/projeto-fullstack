export interface Equipamento {
  id?: number;
  codigo: string;       // TAG do equipamento (Ex: CNC-102)
  nome: string;         // Nome amigável (Ex: Torno CNC G-Series)
  tipo: string;         // Categoria (Ex: Hidráulico, Elétrico, Robótico)
  // localizacao: string;  // Setor/Planta (Ex: Setor A1 - Planta Manaus)
  fabricante?: string;  // Opcional
  modelo?: string;      // Opcional
  ativo: boolean;
  setor?: {
    id_setor: string;
    nome: string;
  };
}