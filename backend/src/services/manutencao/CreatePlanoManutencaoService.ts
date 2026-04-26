import type { CreatePlanoManutencaoDTO } from "../../dtos/createPlanoManutencaoDTO.js";

export class CreatePlanoManutencaoService {

  constructor(
    private planoRepository: any,
    private equipamentoRepository: any,
  ) {}

  async execute(data: CreatePlanoManutencaoDTO) {

    // 1. Verifica se o equipamento existe e está ativo
    const equipamento = await this.equipamentoRepository.findById(data.equipamento_id);
    if (!equipamento) {
      throw new Error(`Equipamento #${data.equipamento_id} não encontrado.`);
    }
    if (!equipamento.ativo) {
      throw new Error(`Equipamento #${data.equipamento_id} está desativado.`);
    }

    // 2. Converte e valida a data da primeira execução
    const proxima_em = new Date(data.proxima_em);
    if (isNaN(proxima_em.getTime())) {
      throw new Error(`Data inválida: "${data.proxima_em}". Use o formato YYYY-MM-DD.`);
    }

    return this.planoRepository.create({
      equipamento_id: data.equipamento_id,
      titulo: data.titulo,
      descricao: data.descricao || null,
      periodicidade_dias: data.periodicidade_dias,
      tecnico_id: data.tecnico_id || null,
      proxima_em: proxima_em,
      ativo: true,
    });
  }
}