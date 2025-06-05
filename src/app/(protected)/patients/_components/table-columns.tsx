"use client";

import { ColumnDef } from "@tanstack/react-table";

import { patientsTable } from "@/db/schema";
import { validateCPF } from "@/helpers/validate-cpf";

import PatientsTableActions from "./table-actions";

type Patient = typeof patientsTable.$inferSelect;

export const patientsTableColumns: ColumnDef<Patient>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Nome",
  },
  {
    id: "cpf",
    accessorKey: "cpf",
    header: "CPF",
    cell: (params) => {
      const patient = params.row.original;
      const cpf = patient.cpf;
      if (!cpf) return "";
      const formatted = cpf.replace(
        /(\d{3})(\d{3})(\d{3})(\d{2})/,
        "$1.$2.$3-$4",
      );
      return validateCPF(cpf) ? formatted : "CPF inválido";
    },
  },
  {
    id: "email",
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "phoneNumber",
    accessorKey: "phoneNumber",
    header: "Telefone",
    cell: (params) => {
      const patient = params.row.original;
      const phoneNumber = patient.phoneNumber;
      if (!phoneNumber) return "";
      const formatted = phoneNumber.replace(
        /(\d{2})(\d{5})(\d{4})/,
        "($1) $2-$3",
      );
      return formatted;
    },
  },
  {
    id: "sex",
    accessorKey: "sex",
    header: "Sexo",
    cell: (params) => {
      const patient = params.row.original;
      return patient.sex === "male" ? "Masculino" : "Feminino";
    },
  },
  {
    id: "actions",
    cell: (params) => {
      const patient = params.row.original;
      return <PatientsTableActions patient={patient} />;
    },
  },
];
