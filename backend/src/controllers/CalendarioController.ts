import type { Request, Response, NextFunction } from "express";
import { appDataSource } from "../database/appDataSource.js";
import { PlanoManutencao } from "../entities/Plano_manutencao.js";

export class CalendarioController {

  // GET /calendario?filtro=atrasadas|esta_semana|este_mes|todas&equipamento_id=X
  async getCalendario(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const planoRepo     = appDataSource.getRepository(PlanoManutencao);
      const filtro        = (req.query.filtro as string) ?? "todas";
      const equipamento_id = req.query.equipamento_id ? Number(req.query.equipamento_id) : null;

      const hoje   = new Date(); hoje.setHours(0, 0, 0, 0);
      const em7    = new Date(hoje); em7.setDate(hoje.getDate() + 7);
      const fimMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0, 23, 59, 59);

      const query = planoRepo
        .createQueryBuilder("p")
        .leftJoinAndSelect("p.equipamento", "eq")
        .leftJoinAndSelect("p.tecnico", "u")
        .where("p.ativo = true");

      if (equipamento_id) {
        query.andWhere("p.equipamento_id = :equipamento_id", { equipamento_id });
      }

      // Filtros de prazo — botões da Tela 3 do PRD
      switch (filtro) {
        case "atrasadas":
          query.andWhere("p.proxima_em < :hoje", { hoje });
          break;
        case "esta_semana":
          query.andWhere("p.proxima_em BETWEEN :hoje AND :em7", { hoje, em7 });
          break;
        case "este_mes":
          query.andWhere("p.proxima_em BETWEEN :hoje AND :fimMes", { hoje, fimMes });
          break;
        // "todas" — sem filtro de data
      }

      const planos = await query.orderBy("p.proxima_em", "ASC").getMany();

      // Enriquece com status de prazo para as badges coloridas (Tela 3)
      const resultado = planos.map(p => {
        const d    = new Date(); d.setHours(0, 0, 0, 0);
        const prev = new Date(p.proxima_em!); prev.setHours(0, 0, 0, 0);
        const diff = Math.floor((prev.getTime() - d.getTime()) / 86_400_000);

        let status_prazo: string;
        if (diff < 0)      status_prazo = "atrasada";      // vermelho
        else if (diff === 0) status_prazo = "hoje";         // laranja
        else if (diff <= 7)  status_prazo = "esta_semana";  // amarelo
        else                 status_prazo = "no_prazo";     // verde

        return {
          id:                 p.id,
          titulo:             p.titulo,
          descricao:          p.descricao,
          proxima_em:         p.proxima_em,
          periodicidade_dias: p.periodicidade_dias,
          equipamento: {
            id:     (p.equipamento as any)?.id,
            nome:   (p.equipamento as any)?.nome,
            codigo: (p.equipamento as any)?.codigo,
          },
          tecnico: p.tecnico
            ? { id: p.tecnico.id_usuario, nome: (p.tecnico as any).nome }
            : null,
          status_prazo,
          dias_atraso: diff < 0 ? Math.abs(diff) : 0,
        };
      });

      res.status(200).json(resultado);
    } catch (error) {
      next(error);
    }
  }
}