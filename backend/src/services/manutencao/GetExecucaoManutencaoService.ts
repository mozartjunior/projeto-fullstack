// =============================================================
// Arquivo: src/services/manutencao/GetExecucaoManutencaoService.ts
//
// Busca uma execução específica pelo ID.
// =============================================================

export class GetExecucaoManutencaoService {

  constructor(private execucaoRepository: any) {}

  async execute(id: number) {

    if (!id) {
      throw new Error('O campo id é obrigatório.');
    }

    const execucao = await this.execucaoRepository.findById(id);

    if (!execucao) {
      throw new Error(`Execução #${id} não encontrada.`);
    }

    return execucao;
  }
}