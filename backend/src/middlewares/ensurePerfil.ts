import type { RequestHandler } from "express";
import type { JwtPayload } from "jsonwebtoken";
import { Perfil } from "../types/Perfil.js";
import { AppError } from "../errors/AppError.js";

export const ensurePerfil = (...perfisPermitidos: Perfil[]): RequestHandler => {
  return (req, _res, next) => {
    const auth = (req as any).auth as JwtPayload;

    if (!auth){
      return next(new AppError("Token inválido.", 401));
    }

    if(!perfisPermitidos.includes(auth.perfil as Perfil)){
        return next(new AppError(`Acesso negado. Apenas ${perfisPermitidos.join(', ')}
        podem acessar este recurso.`, 403));
    }

    return next();
  };
};