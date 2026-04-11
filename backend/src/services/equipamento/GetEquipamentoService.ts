export class GetEquipamentoService {

  constructor(private equipamentoRepository: any) {}

  async execute(id: string) {

    if (!id) {
      throw new Error("O campo id é obrigatório.");
    }

    const equipamento = await this.equipamentoRepository.findById(id);

    if (!equipamento) {
      throw new Error(`Equipamento #${id} não encontrado.`);
    }

    return equipamento;
  }
}