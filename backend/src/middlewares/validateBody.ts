import type { RequestHandler } from "express";
import type { ZodSchema } from "zod";
import { AppError } from "../errors/AppError.js";

export const validateBody = (schema: ZodSchema): RequestHandler => {
    return (req, _res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            return next(new AppError("Dados invalidos", 400, result.error.flatten()));
        }

        req.body = result.data;
        return next();
    };
};