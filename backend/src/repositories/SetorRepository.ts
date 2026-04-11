import { appDataSource } from "../database/appDataSource.js";
import { Setor } from "../entities/Setor.js";

export class SetorRepository {
  private repository = appDataSource.getRepository(Setor);

  async create(data: any) {
    const setor = this.repository.create(data);
    return this.repository.save(setor);
  }

  async findAll() {
    return this.repository.find();
  }

  async findById(id_setor: string) {
    return this.repository.findOne({ where: { id_setor } });
  }

  async findByNome(nome: string) {
    return this.repository.findOne({ where: { nome } } as any);
  }

  async update(id_setor: string, data: any) {
    await this.repository.update({ id_setor }, data);
    return this.repository.findOne({ where: { id_setor } });
  }

  async desativar(id_setor: string) {
    await this.repository.update({ id_setor }, { ativo: false });
    return this.repository.findOne({ where: { id_setor } });
  }
}