import type { Request, Response } from "express";
import { appDataSource } from "../database/appDataSource.js";
import { CreateEquipamentoService } from "../services/equipamento/CreateEquipamentoService.js";
import { DeleteEquipamentoService } from "../services/equipamento/DeleteEquipamentoService.js";
import { ListEquipamentoService } from "../services/equipamento/ListEquipamentosService.js";
import { UpdateEquipamentoService } from "../services/equipamento/UpdateEquipamentoService.js";
import { EquipamentoRepository } from "../repositories/EquipamentoRepository.js";

export class EquipamentoController {
    async create(req: Request, res: Response): Promise<Response>{
        try{
            const repository = new EquipamentoRepository();
            const services = new CreateEquipamentoService(repository);

            const result = await services.execute(req.body);

            return res.status(201).json(result);
        }catch (error: any){
        return res.status(400).json({
            message: error.message || "Erro ao criar equipamento",
            });
        }
    }

    async getAll(req: Request, res: Response): Promise<Response>{
        try{
            const repository = new EquipamentoRepository();
            const services = new ListEquipamentoService(repository);

            const result = await services.execute();

            return res.status(200).json(result);
        }catch (error: any){
            return res.status(400).json({
                message: error.message || "Erro ao listar equipamentos",
            });
        }
    }

    async update(req: Request, res: Response): Promise<Response>{
        try{
            const repository = new EquipamentoRepository();
            const services = new UpdateEquipamentoService(repository);

            const result = await services.execute(req.params.codigo, req.body);

            return res.status(200).json(result);
        }catch (error: any){
            return res.status(400).json({
                message: error.message || "Erro ao atualizar equipamento",
            });
        }
    }

    async list(req: Request, res: Response): Promise<Response>{
        try{
            const equipamentoRepository = appDataSource.getRepository("Equipamento");
            const equipamentos = await equipamentoRepository.find();
            return res.json(equipamentos).status(200);
            // const repository = new EquipamentoRepository();
            // const services = new ListEquipamentoService(repository);
            // const result = await services.execute();
            return res.status(200).json(result);
        }catch (error: any){
            return res.status(400).json({
                message: error.message || "Erro ao listar equipamentos",
            });
        }
    }

}