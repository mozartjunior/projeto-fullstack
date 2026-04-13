import type { CreatePlanoManutencaoDTO } from "../../dtos/createPlanoManutencaoDTO.js";

export class CreatePlanoManutencaoService {

  constructor(
    private planoRepository: any,
    private equipamentoRepository: any,
  ) {}

  async execute(data: CreatePlanoManutencaoDTO) {

    // Verifica se o equipamento existe e está ativo
    const equipamento = await this.equipamentoRepository.findById(data.equipamento_id);
    if (!equipamento) {
      throw new Error(`Equipamento #${data.equipamento_id} não encontrado.`);
    }
    if (!equipamento.ativo) {
      throw new Error(`Equipamento #${data.equipamento_id} está desativado.`);
    }

    // Converte e valida a data da primeira execução
    const proxima_em = new Date(data.proxima_em);
    if (isNaN(proxima_em.getTime())) {
      throw new Error(`Data inválida: "${data.proxima_em}". Use o formato YYYY-MM-DD.`);
    }

    return this.planoRepository.create({
      equipamento: { id: data.equipamento_id },
      titulo: data.titulo,
      descricao: data.descricao || null,
      periodicidade_dias: data.periodicidade_dias,
      tecnico: data.tecnico_id ? { id_usuario: data.tecnico_id } : null,
      proxima_em,
      ativo: true,
    });
  }
}