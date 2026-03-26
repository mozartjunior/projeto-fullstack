import type { Request, Response } from "express";
import { CreateEquipamentoService } from "../services/equipamento/CreateEquipamentoService.js";
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
}