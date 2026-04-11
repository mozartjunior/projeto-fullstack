import { NomeSetor } from "../types/NomeSetor.js";

export interface CreateSetorDTO {
  nome: NomeSetor;
  descricao?: string;
}