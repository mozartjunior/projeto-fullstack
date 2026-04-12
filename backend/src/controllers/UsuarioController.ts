import type { Request, Response } from "express";
import { CreateUsuarioService } from "../services/usuario/CreateUsuarioService.js";
import { ListUsuarioService } from "../services/usuario/ListUsuarioService.js";
import { GetUsuarioService } from "../services/usuario/GetUsuarioService.js";
import { UsuarioRepository } from "../repositories/UsuarioRepository.js";
import { SetorRepository } from "../repositories/SetorRepository.js";
import { createUserSchema } from "../dtos/createUserSchemaDTO.js";
import { DesativarUsuarioService } from "../services/usuario/DesativarUsuarioService.js";

export class UsuarioController {

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const parsed = createUserSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          message: "Dados inválidos",
          errors: parsed.error.flatten().fieldErrors,
        });
      }

      const usuarioRepository = new UsuarioRepository();
      const setorRepository = new SetorRepository();
      const service = new CreateUsuarioService(usuarioRepository, setorRepository);
      const result = await service.execute(parsed.data);
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({
        message: error.message || "Erro ao criar usuário",
      });
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const repository = new UsuarioRepository();
      const service = new ListUsuarioService(repository);
      const result = await service.execute();
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({
        message: error.message || "Erro ao listar usuários",
      });
    }
  }

  async getById(req: Request<{ id_usuario: string }>, res: Response): Promise<Response> {
    try {
      const { id_usuario } = req.params;
      const repository = new UsuarioRepository();
      const service = new GetUsuarioService(repository);
      const result = await service.execute(id_usuario);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({
        message: error.message || "Erro ao buscar usuário",
      });
    }
  }

  async desativar(req: Request<{ id_usuario: string }>, res: Response): Promise<Response> {
    try {
      const { id_usuario } = req.params;
      const repository = new UsuarioRepository();
      const service = new DesativarUsuarioService(repository);
      const result = await service.execute(id_usuario);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({
        message: error.message || "Erro ao desativar usuário",
      });
    }
  }

}