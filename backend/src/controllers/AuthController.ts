import type { Request, Response } from "express";
import { LoginService } from "../services/auth/LoginService.js";
import { RefreshTokenService } from "../services/auth/RefreshTokenService.js";
import { LogoutService } from "../services/auth/LogoutService.js";
import { UsuarioRepository } from "../repositories/UsuarioRepository.js";
import { SessaoRepository } from "../repositories/SessaoRepository.js";
import { loginSchema, refreshSchema, logoutSchema } from "../dtos/AuthDTO.js";

export class AuthController {

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const parsed = loginSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          message: "Dados inválidos",
          errors: parsed.error.format()
        });
      }

      const usuarioRepository = new UsuarioRepository();
      const sessaoRepository = new SessaoRepository();
      const service = new LoginService(usuarioRepository, sessaoRepository);

      // Passa IP e User-Agent para registrar na sessão
      const ip = req.ip;
      const userAgent = req.headers["user-agent"];

      const result = await service.execute(parsed.data, ip, userAgent);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(401).json({
        message: error.message || "Erro ao realizar login",
      });
    }
  }

  async refresh(req: Request, res: Response): Promise<Response> {
    try {
      const parsed = refreshSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          message: "Dados inválidos",
          errors: parsed.error.flatten().fieldErrors,
        });
      }

      const sessaoRepository = new SessaoRepository();
      const service = new RefreshTokenService(sessaoRepository);
      const result = await service.execute(parsed.data);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(401).json({
        message: error.message || "Erro ao renovar token",
      });
    }
  }

  async logout(req: Request, res: Response): Promise<Response> {
    try {
      const parsed = logoutSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          message: "Dados inválidos",
          errors: parsed.error.flatten().fieldErrors,
        });
      }

      const sessaoRepository = new SessaoRepository();
      const service = new LogoutService(sessaoRepository);
      const result = await service.execute(parsed.data);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(401).json({
        message: error.message || "Erro ao realizar logout",
      });
    }
  }
}