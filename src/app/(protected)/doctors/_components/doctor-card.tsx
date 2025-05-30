"use client";

import { CalendarIcon, ClockIcon, DollarSignIcon } from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { doctorsTable } from "@/db/schema";
import { getAvailability } from "@/helpers/availability";
import { formatCurrencyInCents } from "@/helpers/currency";
import { formatWeekDay } from "@/helpers/weekday";

import UpsertDoctorForm from "./upsert-doctor-form";

interface DoctorCardProps {
  doctor: typeof doctorsTable.$inferSelect;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  const [isUpsertDoctorFormOpen, setIsUpsertDoctorFormOpen] = useState(false);
  const doctorsInitials = doctor.name
    .split(" ")
    .map((name) => name[0])
    .join("");

  const { from, to } = getAvailability(doctor);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src={(doctor.avatarImageUrl as string) ?? undefined} />
            <AvatarFallback>{doctorsInitials}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-sm font-medium">Dr. {doctor.name}</h3>
            <p className="text-muted-foreground text-sm">{doctor.specialty}</p>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col gap-2">
        <Badge variant="outline">
          <CalendarIcon className="mr-1" />
          {formatWeekDay(from)} - {formatWeekDay(to)}
        </Badge>
        <Badge variant="outline">
          <ClockIcon className="mr-1" />
          {from.format("HH:mm")} às {to.format("HH:mm")}
        </Badge>
        <Badge variant="outline">
          <DollarSignIcon className="mr-1" />
          {formatCurrencyInCents(doctor.appointmentPriceInCents)}
        </Badge>
      </CardContent>
      <Separator />
      <CardFooter>
        <Dialog
          open={isUpsertDoctorFormOpen}
          onOpenChange={setIsUpsertDoctorFormOpen}
        >
          <DialogTrigger asChild>
            <Button className="w-full">Ver detalhes</Button>
          </DialogTrigger>
          <UpsertDoctorForm
            doctor={{
              ...doctor,
              availableToTime: to.format("HH:mm:ss"),
              availableFromTime: from.format("HH:mm:ss"),
            }}
            onSuccess={() => setIsUpsertDoctorFormOpen(false)}
            isOpen={isUpsertDoctorFormOpen}
          />
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default DoctorCard;
