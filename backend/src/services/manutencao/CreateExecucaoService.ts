import { ExecucaoRepository } from "../../repositories/ExecucaoRepository.js";
import { PlanoManutencaoRepository } from "../../repositories/PlanoManutencaoRepository.js";

interface CreateExecucaoDTO {
  plano_id:      number;
  tecnico_id:    number;
  data_execucao: string; // ISO date string: "2025-04-10"
  status:        "realizada" | "parcial" | "nao_realizada";
  conformidade:  boolean;
  observacoes?:  string;
}

export class CreateExecucaoService {
  constructor(
    private execucaoRepository: ExecucaoRepository,
    private planoRepository:    PlanoManutencaoRepository,
  ) {}

  async execute(dto: CreateExecucaoDTO) {
    // 1. Valida o plano
    const plano = await this.planoRepository.findById(dto.plano_id);
    if (!plano)       throw new Error("Plano não encontrado");
    if (!plano.ativo) throw new Error("Plano inativo — não é possível registrar execução");

    // 2. Persiste a execução
    const execucao = await this.execucaoRepository.create({
      plano_id:      dto.plano_id,
      tecnico_id:    dto.tecnico_id,
      data_execucao: new Date(dto.data_execucao),
      status:        dto.status,
      conformidade:  dto.conformidade,
      observacoes:   dto.observacoes ?? null,
    });

    // 3. Recalcula proxima_em — REGRA CRÍTICA DO PRD (RF04 / RNF01):
    //    proxima_em = data_execucao + periodicidade_dias
    //    NUNCA usar new Date() — usar a data em que a manutenção foi realizada.
    //    Isso evita que atrasos se acumulem nas datas futuras.
    const base = new Date(dto.data_execucao);
    base.setDate(base.getDate() + plano.periodicidade_dias);
    await this.planoRepository.updateProximaEm(dto.plano_id, base);

    return { execucao, proxima_em_atualizada: base };
  }
}