import { z } from "zod";

import { validateCPF } from "@/helpers/cpf";

export const upsertPatientSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(1, {
    message: "Nome é obrigatório.",
  }),
  cpf: z
    .string()
    .trim()
    .min(1, {
      message: "CPF é obrigatório.",
    })
    .refine((cpf) => validateCPF(cpf), {
      message: "CPF inválido.",
    }),
  email: z.string().email({
    message: "Email inválido.",
  }),
  phoneNumber: z.string().trim().min(1, {
    message: "Número de telefone é obrigatório.",
  }),
  sex: z.enum(["male", "female"], {
    required_error: "Sexo é obrigatório.",
  }),
});

export type UpsertPatientSchema = z.infer<typeof upsertPatientSchema>;
