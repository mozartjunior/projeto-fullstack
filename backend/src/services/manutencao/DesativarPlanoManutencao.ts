// src/services/manutencao/DesativarPlanoManutencaoService.ts

export class DesativarPlanoManutencaoService {

  constructor(private planoRepository: any) {}

  async execute(id: number) {
    if (!id) {
      throw new Error("O campo id é obrigatório.");
    }

    const plano = await this.planoRepository.findById(id);
    if (!plano) {
      throw new Error(`Plano #${id} não encontrado.`);
    }

    if (!plano.ativo) {
      throw new Error(`Plano #${id} já está desativado.`);
    }

    return this.planoRepository.desativar(id);
  }
}