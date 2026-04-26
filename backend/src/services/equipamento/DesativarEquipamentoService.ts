// export class DesativarEquipamentoService {
//   constructor(private equipamentoRepository: any) {}

//   async execute(id: string) {
//     if (!id) {
//       throw new Error("O campo id é obrigatório.");
//     }

//     const equipamento = await this.equipamentoRepository.findById(id);
//     if (!equipamento) {
//       throw new Error(`Equipamento #${id} não encontrado.`);
//     }

//     if (!equipamento.ativo) {
//       throw new Error(`Equipamento #${id} já está desativado.`);
//     }

//     return this.equipamentoRepository.updateById(equipamento.id, { ativo: false });
//   }
// }

export class DesativarEquipamentoService {
  constructor(private equipamentoRepository: any) {}

  async execute(id: string) {
    // 1. Busca pelo ID (Primary Key)
    const equipamento = await this.equipamentoRepository.findById(Number(id));

    if (!equipamento) {
      throw new Error(`Equipamento com ID ${id} nao encontrado.`);
    }

    if (equipamento.ativo === false){
      throw new Error("Este equipamento ja esta desativado.")
    }

    equipamento.ativo = false;

    return await this.equipamentoRepository.save(equipamento);
  }
}