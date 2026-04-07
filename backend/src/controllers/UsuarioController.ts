import type { Request, Response } from "express";
import type { UsuarioService } from "../services/UsuarioService.js";
import type { CreateUserSchemaDTO } from "../dtos/CreateUserSchemaDTO.js";
import type { UpdateUserSchemaDTO } from "../dtos/CreateUserSchemaDTO.js";
import { AppError } from "../errors/AppError.js";

export default class UsuarioController {
    private userService: UsuarioService;

    constructor(userService: UsuarioService) {
        this.userService = userService;
    }

    async findAllUser(_req: Request, res: Response) {
        const users = await this.userService.findAll();
        return res.status(200).json(users);
    }

    async findUserById(req: Request, res: Response) {
        const user = await this.userService.findById(req.params.id as string);
        if (!user) {
            throw new AppError("Usuario nao encontrado!", 404);
        }
        return res.status(200).json(user);
    }

    async createUser(req: Request, res: Response) {
        const user = await this.userService.createUsuario(req.body as CreateUserSchemaDTO);
        return res.status(201).json(user);
    }

    async updateUser(req: Request, res: Response) {
        const user = await this.userService.updateUsuario(
            req.params.id as string,
            req.body as UpdateUserSchemaDTO
        );
        return res.status(200).json(user);
    }
}