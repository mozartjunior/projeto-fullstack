// =============================================================
// Arquivo: src/services/manutencao/ListExecucaoManutencaoService.ts
//
// Lista todas as execuções de um plano específico.
// =============================================================

export class ListExecucaoManutencaoService {

  constructor(private execucaoRepository: any) {}

  async execute(plano_id: number) {

    // Valida se o plano_id foi informado
    if (!plano_id) {
      throw new Error('O campo plano_id é obrigatório para listar execuções.');
    }

    // Busca todas as execuções daquele plano, mais recentes primeiro
    return this.execucaoRepository.findByPlanoId(plano_id);
  }
}