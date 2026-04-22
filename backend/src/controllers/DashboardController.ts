import type { Request, Response, NextFunction } from "express";
import { appDataSource } from "../database/appDataSource.js";
import { PlanoManutencao } from "../entities/Plano_manutencao.js";
import { ExecucaoRepository } from "../repositories/ExecucaoRepository.js";

export class DashboardController {

  async getDashboard(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const planoRepo = appDataSource.getRepository(PlanoManutencao);
      const execucaoRepository = new ExecucaoRepository();

      const hoje = new Date(); hoje.setHours(0, 0, 0, 0);
      const em7  = new Date(hoje); em7.setDate(hoje.getDate() + 7);

      // Card 1 — atrasadas
      const atrasadas = await planoRepo
        .createQueryBuilder("p")
        .leftJoinAndSelect("p.equipamento", "eq")
        .leftJoinAndSelect("p.tecnico", "u")
        .where("p.ativo = true")
        .andWhere("p.proxima_em < :hoje", { hoje })
        .orderBy("p.proxima_em", "ASC")
        .getMany();

      // Card 2 — próximos 7 dias
      const proximos7Dias = await planoRepo
        .createQueryBuilder("p")
        .where("p.ativo = true")
        .andWhere("p.proxima_em BETWEEN :hoje AND :em7", { hoje, em7 })
        .getCount();

      // Cards 3 e 4
      const [execucoesMes, conformidade] = await Promise.all([
        execucaoRepository.findByMesAtual(),
        execucaoRepository.conformidadeDoMes(),
      ]);

      res.status(200).json({
        manutencoes_atrasadas: atrasadas.length,
        previstos_7_dias:      proximos7Dias,
        conformidade_mes: {
          percentual: conformidade.percentual,
          realizadas: conformidade.realizadas,
          total:      conformidade.total,
        },
        execucoes_mes: execucoesMes.length,
        lista_atrasadas: atrasadas.map(p => {
          const d    = new Date(); d.setHours(0, 0, 0, 0);
          const prev = new Date(p.proxima_em!); prev.setHours(0, 0, 0, 0);
          const dias = Math.floor((d.getTime() - prev.getTime()) / 86_400_000);
          return {
            id:             p.id,
            plano:          p.titulo,
            equipamento:    (p.equipamento as any)?.nome ?? "—",
            equipamento_id: (p.equipamento as any)?.id,
            tecnico:        (p.tecnico as any)?.nome ?? "Não atribuído",
            data_prevista:  p.proxima_em,
            dias_atraso:    dias > 0 ? dias : 0,
          };
        }),
      });
    } catch (error) {
      next(error);
    }
  }
}