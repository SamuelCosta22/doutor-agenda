import { z } from "zod";

export const upsertAppointmentSchema = z.object({
  id: z.string().uuid().optional(),
  clinicId: z.string().uuid().optional(),
  patientId: z.string().uuid({
    message: "Paciente é obrigatório",
  }),
  doctorId: z.string().uuid({
    message: "Médico é obrigatório",
  }),
  date: z.date({
    required_error: "Data é obrigatória",
  }),
  time: z.string({
    required_error: "Horário é obrigatório",
  }),
  appointmentPriceInCents: z
    .number({
      required_error: "Valor da consulta é obrigatório",
    })
    .min(0, {
      message: "Valor da consulta deve ser maior que zero",
    }),
});

export type UpsertAppointmentSchema = z.infer<typeof upsertAppointmentSchema>;
