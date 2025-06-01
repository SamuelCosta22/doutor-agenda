import {
  PageActions,
  PageContainer,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container";
import { db } from "@/db";
import { doctorsTable, patientsTable } from "@/db/schema";

import { NewAppointmentDialog } from "./_components/new-appointment-dialog";

export default async function AppointmentsPage() {
  const allDoctors = await db.select().from(doctorsTable);
  const allPatients = await db.select().from(patientsTable);

  return (
    <PageContainer>
      <div className="flex items-center justify-between">
        <PageHeader>
          <PageHeaderContent>
            <PageTitle>Agendamentos</PageTitle>
            <PageDescription>
              Gerencie os agendamentos do sistema
            </PageDescription>
          </PageHeaderContent>
          <PageActions>
            <NewAppointmentDialog doctors={allDoctors} patients={allPatients} />
          </PageActions>
        </PageHeader>
      </div>

      {/* Appointment list will be added here later */}
    </PageContainer>
  );
}
