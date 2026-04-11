export class DesativarEquipamentoService {

  constructor(private equipamentoRepository: any) {}

  async execute(id: number) {

    if (!id) {
      throw new Error("O campo id é obrigatório.");
    }

    const equipamento = await this.equipamentoRepository.findById(id);

    if (!equipamento) {
      throw new Error(`Equipamento #${id} não encontrado.`);
    }

    if (!equipamento.ativo) {
      throw new Error(`Equipamento #${id} já está desativado.`);
    }

    return this.equipamentoRepository.update(equipamento.id, { ativo: false });
  }
}