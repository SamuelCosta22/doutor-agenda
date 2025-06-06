import { z } from "zod";

import { validateCPF } from "@/helpers/cpf";

export const formSchema = z
  .object({
    name: z.string().trim().min(1, {
      message: "Nome é obrigatório",
    }),
    cpf: z
      .string()
      .trim()
      .min(1, {
        message: "CPF é obrigatório",
      })
      .refine((cpf) => validateCPF(cpf), {
        message: "CPF inválido",
      }),
    specialty: z.string().trim().min(1, {
      message: "Especialidade é obrigatória",
    }),
    appointmentPrice: z.number().min(0, {
      message: "Preço da consulta é obrigatório",
    }),
    availableFromWeekDay: z.string(),
    availableToWeekDay: z.string(),
    availableFromTime: z.string().min(1, {
      message: "Horário de início é obrigatório",
    }),
    availableToTime: z.string().min(1, {
      message: "Horário de término é obrigatório",
    }),
  })
  .refine(
    (data) => {
      if (data.availableFromTime < data.availableToTime) {
        return true;
      }
      return false;
    },
    {
      message: "Horário de início não deve ser anterior ao horário de término",
      path: ["availableToTime"],
    },
  );

export type FormData = z.infer<typeof formSchema>;
