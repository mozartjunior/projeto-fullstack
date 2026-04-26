import { appDataSource } from "../database/appDataSource.js";
import { PlanoManutencao } from "../entities/Plano_manutencao.js";
import { LessThan, Between } from "typeorm";

export class PlanoManutencaoRepository {
  private repository = appDataSource.getRepository(PlanoManutencao);

  async create(data: any) {
    const plano = this.repository.create(data);
    return this.repository.save(plano);
  }

  async save(plano: any) {
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
      // Como adicionamos a coluna física, podemos buscar direto por ela!
      where: { equipamento_id: equipamento_id, ativo: true }, 
      relations: ["equipamento", "tecnico"],
      order: { proxima_em: "ASC" },
    });
  }

  async findAtrasados() {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    return this.repository.find({
      where: { ativo: true, proxima_em: LessThan(hoje) },
      relations: ["equipamento", "tecnico"],
      order: { proxima_em: "ASC" },
    });
  }

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
    const plano = await this.findById(id);
    if (!plano) throw new Error("Plano não encontrado");

    // Limpamos as relações de objeto para evitar conflitos se formos trocar de equipamento/tecnico
    if (data.equipamento_id) plano.equipamento = null as any;
    if (data.tecnico_id) plano.tecnico = null as any;

    Object.assign(plano, data);
    return this.repository.save(plano);
  }

  async desativar(id: number) {
    const plano = await this.findById(id);
    if (!plano) throw new Error("Plano não encontrado");
    
    plano.ativo = false;
    return this.repository.save(plano);
  }

  async countProximos(dias: number): Promise<number> {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    const limite = new Date(hoje);
    limite.setDate(hoje.getDate() + dias);
    limite.setHours(23, 59, 59, 999);

    return this.repository.count({
      where: { 
        ativo: true, 
        proxima_em: Between(hoje, limite) 
      },
    });
  }

  async updateProximaEm(id: number, novaData: Date) {
    const plano = await this.findById(id);
    if (plano) {
      plano.proxima_em = novaData;
      await this.repository.save(plano);
    }
  }
}