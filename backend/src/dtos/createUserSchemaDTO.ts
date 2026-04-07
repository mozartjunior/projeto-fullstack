import { z } from 'zod'
import { Perfil } from '../types/Perfil.js'


export const createUserSchema = z.object({
    nome: z.string().trim().min(1).max(100),
    email: z.email({ pattern: z.regexes.unicodeEmail }),
    password: z.string()
        .min(6)
        .refine((s) => /[A-Z]/.test(s), {
            error: 'Deve conter ao menos 1 letra maiuscula'
        })
        .refine((s) => /[a-z]/.test(s), {
            error: 'Deve conter ao menos 1 letra minuscula'
        })
        .refine((s) => /[^A-Za-z0-9]/.test(s), {
            error: 'Deve conter ao menos 1 caractere especial'
        }),

    perfil: z.enum(Perfil),
    setor_id: z.uuid()
})
// Para atualização: remove password e torna tudo opcional
export const updateUserSchema = createUserSchema
    .omit({ password: true })
    .partial()

export type CreateUserDTO = z.infer<typeof createUserSchema>
export type UpdateUserDTO = z.infer<typeof updateUserSchema>