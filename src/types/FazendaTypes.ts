import { z } from "zod";

export const FarmCreateSchema = z.object({
  nome: z.string(),
});

export const FarmUpdateSchema = z.object({
  id: z.number(),
  nome: z.string().optional(),
});

export const FarmResponseSchema = z.object({
  id: z.number(),
  nome: z.string(),
});

export const FarmResponseListSchema = z.array(FarmResponseSchema);