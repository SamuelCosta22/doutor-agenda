import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { DataTable } from "@/components/ui/data-table";
import {
  PageActions,
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { db } from "@/db";
import { patientsTable } from "@/db/schema";
import WithAuthentication from "@/hocs/with-authentication";
import { auth } from "@/lib/auth";

import AddPatientButton from "./_components/add-patient-button";
import { patientsTableColumns } from "./_components/table-columns";

const PatientsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const patientsData = await db.query.patientsTable.findMany({
    where: eq(patientsTable.clinicId, session!.user.clinic!.id),
  });

  return (
    <WithAuthentication mustHaveClinic>
      <PageContainer>
        <div className="text-muted-foreground text-sm font-bold">
          Menu Principal &gt; <span className="text-primary">Pacientes</span>
        </div>
        <PageHeader>
          <PageHeaderContent>
            <PageTitle>Pacientes</PageTitle>
            <PageDescription>
              Gerencie os pacientes da sua clínica
            </PageDescription>
          </PageHeaderContent>
          <PageActions>
            <AddPatientButton />
            <ThemeToggle />
          </PageActions>
        </PageHeader>
        <PageContent>
          <DataTable columns={patientsTableColumns} data={patientsData} />
        </PageContent>
      </PageContainer>
    </WithAuthentication>
  );
};

export default PatientsPage;
