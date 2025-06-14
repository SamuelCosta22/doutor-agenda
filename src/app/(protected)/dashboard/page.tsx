import dayjs from "dayjs";
import { Calendar } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { getDashboard } from "@/data/get-dashboard";
import WithAuthentication from "@/hocs/with-authentication";
import { auth } from "@/lib/auth";

import { appointmentsTableColumns } from "../appointments/_components/table-columns";
import AppointmentsChart from "./_components/appointments-chart";
import { DatePicker } from "./_components/date-picker";
import StatsCards from "./_components/stats-cards";
import TopDoctors from "./_components/top-doctors";
import TopSpecialties from "./_components/top-specialties";

interface DashboardPageProps {
  searchParams: Promise<{
    from: string;
    to: string;
  }>;
}

const DashboardPage = async ({ searchParams }: DashboardPageProps) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { from, to } = await searchParams;

  if (!from || !to) {
    redirect(
      `/dashboard?from=${dayjs().format("YYYY-MM-DD")}&to=${dayjs().add(1, "month").format("YYYY-MM-DD")}`,
    );
  }

  const {
    totalRevenue,
    totalAppointments,
    totalPatients,
    totalDoctors,
    topDoctors,
    todayAppointments,
    topSpecialties,
    dailyAppointmentsData,
  } = await getDashboard({
    from,
    to,
    session: {
      user: {
        clinic: {
          id: session!.user.clinic!.id,
        },
      },
    },
  });

  return (
    <WithAuthentication>
      <PageContainer>
        <div className="text-muted-foreground text-sm font-bold">
          Menu Principal &gt; <span className="text-primary">Dashboard</span>
        </div>
        <PageHeader>
          <PageHeaderContent>
            <PageTitle>Dashboard</PageTitle>
            <PageDescription>
              Tenha uma visão geral da sua clínica
            </PageDescription>
          </PageHeaderContent>
          <PageActions>
            <DatePicker />
            <ThemeToggle />
          </PageActions>
        </PageHeader>
        <PageContent>
          <div className="space-y-4">
            <StatsCards
              totalRevenue={
                totalRevenue.total ? Number(totalRevenue.total) : null
              }
              totalAppointments={totalAppointments.total}
              totalPatients={totalPatients.total}
              totalDoctors={totalDoctors.total}
            />
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr_1fr]">
              <AppointmentsChart
                dailyAppointmentsData={dailyAppointmentsData}
              />
              <TopDoctors doctors={topDoctors} />
              <TopSpecialties topSpecialties={topSpecialties} />
            </div>
            {/* <div className="grid grid-cols-1 gap-4 lg:grid-cols-[2.25fr_1fr]"></div> */}
            <div>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Calendar className="text-muted-foreground" />
                    <CardTitle className="text-base">
                      Agendamentos de hoje
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <DataTable
                    columns={appointmentsTableColumns}
                    data={todayAppointments}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </PageContent>
      </PageContainer>
    </WithAuthentication>
  );
};

export default DashboardPage;
