import type { RequestHandler } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { AppError } from "../errors/AppError.js";

const getAccessSecret = () => {
    const value = process.env.JWT_ACCESS_SECRET;
    if (!value) {
        throw new AppError("JWT_ACCESS_SECRET nao definido", 500);
    }
    return value;
};

export const ensureAuth: RequestHandler = (req, _res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new AppError("Token ausente", 401));
    }

    const token = authHeader.slice(7).trim();
    if (!token) {
        return next(new AppError("Token ausente", 401));
    }

    try {
        const payload = jwt.verify(token, getAccessSecret()) as JwtPayload;
        (req as { auth?: JwtPayload }).auth = payload;
        return next();
    } catch {
        return next(new AppError("Token invalido", 401));
    }
};