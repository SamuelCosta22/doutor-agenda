import { headers } from "next/headers";
import { redirect } from "next/navigation";

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
import { auth } from "@/lib/auth";

import { SubscriptionPlan } from "./_components/subscription-plan";

const SubscriptionPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect("/authentication");
  }
  if (!session.user.clinic) {
    redirect("/clinic-form");
  }

  return (
    <PageContainer>
      <div className="text-muted-foreground text-sm font-bold">
        Menu Principal &gt; <span className="text-primary">Assinatura</span>
      </div>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Assinatura</PageTitle>
          <PageDescription>
            Gerencie as assinaturas da sua clínica
          </PageDescription>
        </PageHeaderContent>
        <PageActions>
          <ThemeToggle />
        </PageActions>
      </PageHeader>
      <PageContent>
        <SubscriptionPlan
          className="w-[350px]"
          userEmail={session.user.email}
        />
      </PageContent>
    </PageContainer>
  );
};

export default SubscriptionPage;
