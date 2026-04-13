import { appDataSource } from "../database/appDataSource.js";
import { PlanoManutencao } from "../entities/Plano_manutencao.js";
import { LessThan, Between } from "typeorm";

export class PlanoManutencaoRepository {
  private repository = appDataSource.getRepository(PlanoManutencao);

  async create(data: any) {
    const plano = this.repository.create(data);
    return this.repository.save(plano);
  }

  async findAll() {
    return this.repository.find({
      where: { ativo: true },
      relations: ["equipamento", "tecnico"],
      order: { proxima_em: "ASC" },
    });
  }

  async findById(id: number) {
    return this.repository.findOne({
      where: { id },
      relations: ["equipamento", "tecnico"],
    });
  }

  async findByEquipamento(equipamento_id: number) {
    return this.repository.find({
      where: { equipamento: { id: equipamento_id }, ativo: true },
      relations: ["equipamento", "tecnico"],
      order: { proxima_em: "ASC" },
    });
  }

  // Planos atrasados → proxima_em < hoje
  async findAtrasados() {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    return this.repository.find({
      where: { ativo: true, proxima_em: LessThan(hoje) },
      relations: ["equipamento", "tecnico"],
      order: { proxima_em: "ASC" },
    });
  }

  // Planos previstos para os próximos N dias
  async findProximos(dias: number) {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const limite = new Date();
    limite.setDate(hoje.getDate() + dias);
    return this.repository.find({
      where: { ativo: true, proxima_em: Between(hoje, limite) },
      relations: ["equipamento", "tecnico"],
      order: { proxima_em: "ASC" },
    });
  }

  async update(id: number, data: any) {
    await this.repository.update({ id }, data);
    return this.repository.findOne({
      where: { id },
      relations: ["equipamento", "tecnico"],
    });
  }

  async desativar(id: number) {
    await this.repository.update({ id }, { ativo: false });
    return this.repository.findOne({
      where: { id },
      relations: ["equipamento", "tecnico"],
    });
  }
}