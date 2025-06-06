import { eq } from "drizzle-orm";
import { headers } from "next/headers";

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
import { doctorsTable } from "@/db/schema";
import WithAuthentication from "@/hocs/with-authentication";
import { auth } from "@/lib/auth";

import AddDoctorButton from "./_components/add-doctor-button";
import DoctorCard from "./_components/doctor-card";

const DoctorsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const doctors = await db.query.doctorsTable.findMany({
    where: eq(doctorsTable.clinicId, session!.user.clinic!.id),
  });

  return (
    <WithAuthentication mustHaveClinic>
      <PageContainer>
        <div className="text-muted-foreground text-sm font-bold">
          Menu Principal &gt; <span className="text-primary">Médicos</span>
        </div>
        <PageHeader>
          <PageHeaderContent>
            <PageTitle>Médicos</PageTitle>
            <PageDescription>
              Gerencie os médicos cadastrados no sistema
            </PageDescription>
          </PageHeaderContent>
          <PageActions>
            <AddDoctorButton />
            <ThemeToggle />
          </PageActions>
        </PageHeader>
        <PageContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </PageContent>
      </PageContainer>
    </WithAuthentication>
  );
};

export default DoctorsPage;
