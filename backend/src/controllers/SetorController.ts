import type { Request, Response } from "express";
import { CreateSetorService } from "../services/setor/CreateSetorService.js";
import { ListSetorService } from "../services/setor/ListSetorService.js";
import { GetSetorService } from "../services/setor/GetSetorService.js";
import { DesativarSetorService } from "../services/setor/DesativarSetorService.js";
import { SetorRepository } from "../repositories/SetorRepository.js";

export class SetorController {

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const repository = new SetorRepository();
      const service = new CreateSetorService(repository);
      const result = await service.execute(req.body);
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({
        message: error.message || "Erro ao criar setor",
      });
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const repository = new SetorRepository();
      const service = new ListSetorService(repository);
      const result = await service.execute();
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({
        message: error.message || "Erro ao listar setores",
      });
    }
  }

  async getById(req: Request<{ id_setor: string }>, res: Response): Promise<Response> {
    try {
      const { id_setor } = req.params;
      const repository = new SetorRepository();
      const service = new GetSetorService(repository);
      const result = await service.execute(id_setor);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({
        message: error.message || "Erro ao buscar setor",
      });
    }
  }

  async desativar(req: Request<{ id_setor: string }>, res: Response): Promise<Response> {
    try {
      const { id_setor } = req.params;
      const repository = new SetorRepository();
      const service = new DesativarSetorService(repository);
      const result = await service.execute(id_setor);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({
        message: error.message || "Erro ao desativar setor",
      });
    }
  }
}