import { appDataSource } from "../database/appDataSource.js";
import { Equipamento } from "../entities/Equipamento.js"

export class EquipamentoRepository {

  private repository = appDataSource.getRepository(Equipamento);

  async findByCodigo(codigo: string) {
    return this.repository.findOne({ where: { codigo } });
  }

  async create(data: any) {
    const equipamento = this.repository.create(data);
    return this.repository.save(equipamento);
  }

  async findAll() {
    return this.repository.find();
  }

  async findById(id: number) {
    return this.repository.findOne({ where: { id } });
  }
}