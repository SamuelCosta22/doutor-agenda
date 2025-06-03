"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { doctorsTable, patientsTable } from "@/db/schema";

import UpsertAppointmentForm from "./upsert-appointment-form";

interface NewAppointmentDialogProps {
  doctors: (typeof doctorsTable.$inferSelect)[];
  patients: (typeof patientsTable.$inferSelect)[];
}

export function NewAppointmentDialog({
  doctors,
  patients,
}: NewAppointmentDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Agendamento
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Novo Agendamento</DialogTitle>
        </DialogHeader>
        <UpsertAppointmentForm
          doctors={doctors}
          patients={patients}
          onSuccess={() => setIsOpen(false)}
          isOpen={isOpen}
        />
      </DialogContent>
    </Dialog>
  );
}
