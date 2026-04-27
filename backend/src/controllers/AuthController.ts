import type { Request, Response, NextFunction } from "express";
import { LoginService } from "../services/auth/LoginService.js";
import { RefreshTokenService } from "../services/auth/RefreshTokenService.js";
import { LogoutService } from "../services/auth/LogoutService.js";
import { UsuarioRepository } from "../repositories/UsuarioRepository.js";
import { SessaoRepository } from "../repositories/SessaoRepository.js";
import { loginSchema, refreshSchema, logoutSchema } from "../dtos/authDTO.js";

export class AuthController {

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const usuarioRepository = new UsuarioRepository();
      const sessaoRepository = new SessaoRepository();
      const service = new LoginService(usuarioRepository, sessaoRepository);
      // Passa IP e User-Agent para registrar na sessão
      const ip = req.ip;
      const userAgent = req.headers["user-agent"];
      const result = await service.execute(req.body, ip, userAgent);
      res.status(200).json(result);
    } catch (error) {
      next (error);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const sessaoRepository = new SessaoRepository();
      const service = new RefreshTokenService(sessaoRepository);
      const result = await service.execute(req.body);
      res.status(200).json(result);
    } catch (error) {
      next (error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const sessaoRepository = new SessaoRepository();
      const service = new LogoutService(sessaoRepository);
      const result = await service.execute(req.body);
      res.status(200).json(result);
    } catch (error: any) {
      next (error);
    }
  }
}
