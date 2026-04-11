import type { Request, Response } from "express";
import type { AuthService } from "../services/AuthService.js";

const sanitizeUser = (usuario: unknown) => {
    if (!usuario || typeof usuario !== "object") return usuario;
    const { senha_hash, ...rest } = usuario as { senha_hash?: string };
    return rest;
};

export default class AuthController {
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    async login(req: Request, res: Response) {
        const meta = {
            ...(req.ip ? { ip: req.ip } : {}),
            ...(req.headers["user-agent"]
                ? { userAgent: String(req.headers["user-agent"]) }
                : {})
        };

        const result = await this.authService.login(
            req.body.email,
            req.body.password,
            meta
        );

        return res.status(200).json({
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,
            usuario: sanitizeUser(result.usuario)
        });
    }

    async refresh(req: Request, res: Response) {
        const result = await this.authService.refresh(req.body.refreshToken);
        return res.status(200).json({
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,
            usuario: sanitizeUser(result.usuario)
        });
    }

    async logout(req: Request, res: Response) {
        await this.authService.logout(req.body.refreshToken);
        return res.status(204).send();
    }
}