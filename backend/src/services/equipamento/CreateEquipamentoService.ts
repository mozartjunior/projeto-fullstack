// src/services/equipamento/CreateEquipamentoService.ts

import type { CreateEquipamentoDTO } from "../../dtos/createEquipamentoDTO.js";
import { normalizeCodigo } from "../../utils/normalizeCodigo.js";

export class CreateEquipamentoService {

  constructor(private equipamentoRepository: any) {}

  async execute(data: CreateEquipamentoDTO) {

    if (!data.codigo || !data.nome || !data.tipo || !data.localizacao) {
      throw new Error("Campos obrigatórios: codigo, nome, tipo e localizacao.");
    }

    const codigoNormalizado = normalizeCodigo(data.codigo);

    const exists = await this.equipamentoRepository.findByCodigo(codigoNormalizado);
    if (exists) {
      throw new Error(`Já existe um equipamento com o código "${codigoNormalizado}".`);
    }

    const equipamento = {
      codigo: codigoNormalizado,
      nome: data.nome,
      tipo: data.tipo,
      localizacao: data.localizacao,
      fabricante: data.fabricante || null,
      modelo: data.modelo || null,
      ativo: data.ativo ?? true,
    };

    return this.equipamentoRepository.create(equipamento);
  }
}