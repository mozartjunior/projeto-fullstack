import type { Request, Response, NextFunction } from "express";
import { CreatePlanoManutencaoService } from "../services/manutencao/CreatePlanoManutencaoService.js";
import { ListPlanoManutencaoService } from "../services/manutencao/ListPlanoManutencaoService.js";
import { GetPlanoManutencaoService } from "../services/manutencao/GetPlanoManutencaoService.js";
import { UpdatePlanoManutencaoService } from "../services/manutencao/UpdatePlanoManutencaoService.js";
import { DesativarPlanoManutencaoService } from "../services/manutencao/DesativarPlanoManutencao.js";
import { PlanoManutencaoRepository } from "../repositories/PlanoManutencaoRepository.js";
import { EquipamentoRepository } from "../repositories/EquipamentoRepository.js";

export class PlanoManutencaoController {

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const planoRepository = new PlanoManutencaoRepository();
      const equipamentoRepository = new EquipamentoRepository();
      const service = new CreatePlanoManutencaoService(planoRepository, equipamentoRepository);
      const result = await service.execute(req.body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // filtro via query string: /planos?filtro=atrasados
      const filtro = req.query.filtro as string | undefined;
      const planoRepository = new PlanoManutencaoRepository();
      const service = new ListPlanoManutencaoService(planoRepository);
      const result = await service.execute(filtro);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      const planoRepository = new PlanoManutencaoRepository();
      const service = new GetPlanoManutencaoService(planoRepository);
      const result = await service.execute(id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      const planoRepository = new PlanoManutencaoRepository();
      const service = new UpdatePlanoManutencaoService(planoRepository);
      const result = await service.execute(id, req.body);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async desativar(req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      const planoRepository = new PlanoManutencaoRepository();
      const service = new DesativarPlanoManutencaoService(planoRepository);
      const result = await service.execute(id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}