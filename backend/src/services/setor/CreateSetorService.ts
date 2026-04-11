import type { CreateSetorDTO } from "../../dtos/createSetorDTO.js";
import { NomeSetor } from "../../types/NomeSetor.js";

export class CreateSetorService {

  constructor(private setorRepository: any) {}

  async execute(data: CreateSetorDTO) {

    if (!data.nome) {
      throw new Error("O campo nome é obrigatório.");
    }

    // Valida se o nome é um valor válido do enum
    const nomesValidos = Object.values(NomeSetor);
    if (!nomesValidos.includes(data.nome)) {
      throw new Error(
        `Setor inválido: "${data.nome}". Use: ${nomesValidos.join(", ")}.`
      );
    }

    // Impede cadastro duplicado de setor
    const exists = await this.setorRepository.findByNome(data.nome);
    if (exists) {
      throw new Error(`Setor "${data.nome}" já está cadastrado.`);
    }

    return this.setorRepository.create({
      nome: data.nome,
      descricao: data.descricao || null,
      ativo: true,
    });
  }
}