// src/services/manutencao/UpdatePlanoManutencaoService.ts

import type { UpdatePlanoManutencaoDTO } from "../../dtos/createPlanoManutencaoDTO.js";

export class UpdatePlanoManutencaoService {

  constructor(private planoRepository: any) {}

  async execute(id: number, data: UpdatePlanoManutencaoDTO) {
    if (!id) {
      throw new Error("O campo id é obrigatório.");
    }

    const exists = await this.planoRepository.findById(id);
    if (!exists) {
      throw new Error(`Plano #${id} não encontrado.`);
    }

    const updated: any = {
      titulo: data.titulo || exists.titulo,
      descricao: data.descricao ?? exists.descricao,
      periodicidade_dias: data.periodicidade_dias || exists.periodicidade_dias,
      tecnico: data.tecnico_id
        ? { id_usuario: data.tecnico_id }
        : exists.tecnico,
    };

    if (data.proxima_em) {
      const proxima_em = new Date(data.proxima_em);
      if (isNaN(proxima_em.getTime())) {
        throw new Error(`Data inválida: "${data.proxima_em}".`);
      }
      updated.proxima_em = proxima_em;
    }

    return this.planoRepository.update(id, updated);
  }
}