import { appDataSource } from "../database/appDataSource.js";
import { ExecucaoManutencao } from "../entities/Execucao_manutencao.js";

interface CreateExecucaoData {
  plano_id:      number;
  tecnico_id:    number;
  data_execucao: Date;
  status:        "realizada" | "parcial" | "nao_realizada";
  conformidade:  boolean;
  observacoes:   string | null;
}

export class ExecucaoRepository {
  private repo = appDataSource.getRepository(ExecucaoManutencao);

  async create(data: CreateExecucaoData): Promise<ExecucaoManutencao> {
    const execucao = this.repo.create({
      plano:        { id: data.plano_id },
      tecnico:      { id: data.tecnico_id },
      data_execucao: data.data_execucao,
      status:        data.status,
      conformidade:  data.conformidade,
      observacoes:   data.observacoes,
    });
    return this.repo.save(execucao);
  }

  async findById(id: number): Promise<ExecucaoManutencao | null> {
    return this.repo.findOne({
      where: { id },
      relations: ["tecnico", "plano", "plano.equipamento"],
    });
  }

  async findByPlano(plano_id: number): Promise<ExecucaoManutencao[]> {
    return this.repo.find({
      where: { plano: { id: plano_id } },
      relations: ["tecnico", "plano"],
      order: { data_execucao: "DESC" },
    });
  }

  async findByMesAtual(): Promise<ExecucaoManutencao[]> {
    const agora  = new Date();
    const inicio = new Date(agora.getFullYear(), agora.getMonth(), 1);
    const fim    = new Date(agora.getFullYear(), agora.getMonth() + 1, 0, 23, 59, 59);
    return this.repo
      .createQueryBuilder("e")
      .leftJoinAndSelect("e.plano", "p")
      .leftJoinAndSelect("p.equipamento", "eq")
      .where("e.data_execucao BETWEEN :inicio AND :fim", { inicio, fim })
      .orderBy("e.data_execucao", "DESC")
      .getMany();
  }

  async conformidadeDoMes(): Promise<{ realizadas: number; total: number; percentual: number }> {
    const agora  = new Date();
    const inicio = new Date(agora.getFullYear(), agora.getMonth(), 1);
    const fim    = new Date(agora.getFullYear(), agora.getMonth() + 1, 0, 23, 59, 59);
    const total = await this.repo
      .createQueryBuilder("e")
      .where("e.data_execucao BETWEEN :inicio AND :fim", { inicio, fim })
      .getCount();
    const realizadas = await this.repo
      .createQueryBuilder("e")
      .where("e.data_execucao BETWEEN :inicio AND :fim", { inicio, fim })
      .andWhere("e.conformidade = true")
      .andWhere("e.status = 'realizada'")
      .getCount();
    const percentual = total > 0 ? Math.round((realizadas / total) * 100) : 0;
    return { realizadas, total, percentual };
  }
}