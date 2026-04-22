import { ExecucaoRepository } from "../../repositories/ExecucaoRepository.js";

export class GetExecucaoService {
  constructor(private execucaoRepository: ExecucaoRepository) {}

  async execute(id: number) {
    const execucao = await this.execucaoRepository.findById(id);
    if (!execucao) throw new Error("Execução não encontrada");
    return execucao;
  }
}