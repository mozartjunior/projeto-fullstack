import type { Request, Response } from "express";
import { CreateEquipamentoService } from "../services/equipamento/CreateEquipamentoService.js";
import { ListEquipamentoService } from "../services/equipamento/ListEquipamentosService.js";
import { GetEquipamentoService } from "../services/equipamento/GetEquipamentoService.js";
import { UpdateEquipamentoService } from "../services/equipamento/UpdateEquipamentoService.js";
import { DesativarEquipamentoService } from "../services/equipamento/DesativarEquipamentoService.js";
import { EquipamentoRepository } from "../repositories/EquipamentoRepository.js";

export class EquipamentoController {

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const repository = new EquipamentoRepository();
      const service = new CreateEquipamentoService(repository);
      const result = await service.execute(req.body);
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({
        message: error.message || "Erro ao criar equipamento",
      });
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const repository = new EquipamentoRepository();
      const service = new ListEquipamentoService(repository);
      const result = await service.execute();
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({
        message: error.message || "Erro ao listar equipamentos",
      });
    }
  }

  async getById(req: Request<{ id: string }>, res: Response): Promise<Response> {
    try {
      const id = req.params.id;
      const repository = new EquipamentoRepository();
      const service = new GetEquipamentoService(repository);
      const result = await service.execute(id);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({
        message: error.message || "Erro ao buscar equipamento",
      });
    }
  }

  async update(req: Request<{ id: string }>, res: Response): Promise<Response> {
    try {
      const repository = new EquipamentoRepository();
      const service = new UpdateEquipamentoService(repository);
      const result = await service.execute(req.params.codigo, req.body);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({
        message: error.message || "Erro ao atualizar equipamento",
      });
    }
  }

  async desativar(req: Request<{ id: string }>, res: Response): Promise<Response> {
    try {
      const id = (req.params.id);
      const repository = new EquipamentoRepository();
      const service = new DesativarEquipamentoService(repository);
      const result = await service.execute(id);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({
        message: error.message || "Erro ao desativar equipamento",
      });
    }
  }
}