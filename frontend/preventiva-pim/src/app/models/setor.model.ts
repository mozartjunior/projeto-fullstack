export interface Setor {
  id_setor: string; // Como vimos no erro do Postgres, é um UUID (texto)
  nome: string; // O nome do setor que vai aparecer no Dropdown
  descricao?: string;
  ativo?: boolean;
  created_at?: string; // Opcional, caso você tenha isso no banco
}