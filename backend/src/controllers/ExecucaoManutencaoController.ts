import type { Request, Response, NextFunction } from "express";
import { ExecucaoRepository } from "../repositories/ExecucaoRepository.js";
import { PlanoManutencaoRepository } from "../repositories/PlanoManutencaoRepository.js";
import { CreateExecucaoService } from "../services/manutencao/CreateExecucaoService.js";
import { GetExecucaoService } from "../services/manutencao/GetExecucaoService.js";

export class ExecucaoManutencaoController {

  // POST /execucoes
  // O tecnico_id vem do token JWT injetado pelo ensureAuth
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const tecnico_id = (req as any).usuario?.id;
      if (!tecnico_id) {
        res.status(401).json({ message: "Usuário não autenticado" });
        return;
      }

      const execucaoRepository = new ExecucaoRepository();
      const planoRepository    = new PlanoManutencaoRepository();
      const service = new CreateExecucaoService(execucaoRepository, planoRepository);
      const result  = await service.execute({ ...req.body, tecnico_id });
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  // GET /execucoes/:id
  async getById(req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      const execucaoRepository = new ExecucaoRepository();
      const service = new GetExecucaoService(execucaoRepository);
      const result  = await service.execute(id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}