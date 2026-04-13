import { z } from "zod";

export const createPlanoSchema = z.object({
  equipamento_id: z.number({ message: "equipamento_id é obrigatório." }),
  titulo: z.string().trim().min(1, "Título é obrigatório.").max(100),
  descricao: z.string().trim().optional(),
  periodicidade_dias: z
    .number({ message: "periodicidade_dias é obrigatório." })
    .int()
    .min(1, "Periodicidade deve ser pelo menos 1 dia."),
  tecnico_id: z.string().uuid().optional(),
  proxima_em: z.string({ message: "proxima_em é obrigatório." })
    // data da primeira execução — formato YYYY-MM-DD
});

export const updatePlanoSchema = createPlanoSchema
  .omit({ equipamento_id: true })
  .partial();

export type CreatePlanoManutencaoDTO = z.infer<typeof createPlanoSchema>;
export type UpdatePlanoManutencaoDTO = z.infer<typeof updatePlanoSchema>;