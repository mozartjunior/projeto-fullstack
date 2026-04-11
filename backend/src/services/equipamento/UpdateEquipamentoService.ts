import { normalizeCodigo } from "../../utils/normalizeCodigo.js";

export class UpdateEquipamentoService {

  constructor(private equipamentoRepository: any) {}

  async execute(codigo: string, data: any) {

    if (!codigo) {
      throw new Error("O campo codigo é obrigatório para atualizar.");
    }

    const codigoNormalizado = normalizeCodigo(codigo);

    const exists = await this.equipamentoRepository.findByCodigo(codigoNormalizado);
    if (!exists) {
      throw new Error(`Equipamento com código "${codigoNormalizado}" não encontrado.`);
    }

    const equipamento = {
      nome: data.nome || exists.nome,
      tipo: data.tipo || exists.tipo,
      localizacao: data.localizacao || exists.localizacao,
      fabricante: data.fabricante ?? exists.fabricante,
      modelo: data.modelo ?? exists.modelo,
      ativo: data.ativo ?? exists.ativo,
    };

    return this.equipamentoRepository.update(codigoNormalizado, equipamento);
  }
}