// src/services/manutencao/GetPlanoManutencaoService.ts

export class GetPlanoManutencaoService {

  constructor(private planoRepository: any) {}

  async execute(id: number) {
    if (!id) {
      throw new Error("O campo id é obrigatório.");
    }

    const plano = await this.planoRepository.findById(id);
    if (!plano) {
      throw new Error(`Plano #${id} não encontrado.`);
    }

    return plano;
  }
}