import { ExecucaoRepository } from "../../repositories/ExecucaoRepository.js";

export class ListExecucaoByPlanoService {
  constructor(private execucaoRepository: ExecucaoRepository) {}

  // Retorna execuções de um plano em ordem decrescente (US06 do PRD)
  async execute(plano_id: number) {
    return this.execucaoRepository.findByPlano(plano_id);
  }
}