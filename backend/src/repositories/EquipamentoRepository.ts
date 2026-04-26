import { appDataSource } from "../database/appDataSource.js";
import { Equipamento } from "../entities/Equipamento.js"

export class EquipamentoRepository {

  private repository = appDataSource.getRepository(Equipamento);

  async findByCodigo(codigo: string) {
    return await this.repository.findOne({ where: { codigo }, relations: ["setor"] });
  }

  async create(data: any) {
    const equipamento = this.repository.create(data);
    return this.repository.save(equipamento);
  }

  async update(codigo: string, data: any) {
    await this.repository.update({ codigo }, data);
    return this.repository.findOne({ where: { codigo } });
  }

  async updateById(id: string, data: any) {
    await this.repository.update({ id }, data);
    return this.repository.findOne({ where: { id } });
  }

  async findAll() {
    return this.repository.find({
      relations: ["setor"],
    });
  }

  async findById(id: number) {
    return await this.repository.findOne({ where: { id }, relations: ["setor"] });
  }

  async save(equipamento: any){
    return await this.repository.save(equipamento)
  }
}