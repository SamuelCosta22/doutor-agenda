"use server";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { db } from "@/db";
import { appointmentsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

import { upsertAppointmentSchema } from "./schema";

dayjs.extend(utc);

export const upsertAppointment = actionClient
  .schema(upsertAppointmentSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    if (!session?.user?.clinic?.id) {
      throw new Error("Clinic not found");
    }

    const appointmentDate = dayjs(parsedInput.date)
      .set("hour", parseInt(parsedInput.time.split(":")[0]))
      .set("minute", parseInt(parsedInput.time.split(":")[1]))
      .set("second", 0)
      .toDate();

    await db
      .insert(appointmentsTable)
      .values({
        ...parsedInput,
        id: parsedInput.id,
        clinicId: session?.user?.clinic?.id,
        date: appointmentDate,
      })
      .onConflictDoUpdate({
        target: [appointmentsTable.id],
        set: {
          ...parsedInput,
          date: appointmentDate,
        },
      });

    revalidatePath("/appointments");

    return { success: true };
  });
