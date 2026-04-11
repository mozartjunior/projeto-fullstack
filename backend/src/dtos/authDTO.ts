import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});

export const refreshSchema = z.object({
    refreshToken: z.string().min(10)
});

export const logoutSchema = refreshSchema;

export type LoginDTO = z.infer<typeof loginSchema>;
export type RefreshDTO = z.infer<typeof refreshSchema>;
export type LogoutDTO = z.infer<typeof logoutSchema>;