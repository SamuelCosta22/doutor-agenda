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
import WithAuthentication from "@/hocs/with-authentication";
import { auth } from "@/lib/auth";

import { SubscriptionPlan } from "./_components/subscription-plan";

const SubscriptionPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <WithAuthentication mustHaveClinic>
      <PageContainer>
        <div className="text-muted-foreground text-sm font-bold">
          Outros &gt; <span className="text-primary">Assinatura</span>
        </div>
        <PageHeader>
          <PageHeaderContent>
            <PageTitle>Assinatura</PageTitle>
            <PageDescription>Gerencie a sua assinatura.</PageDescription>
          </PageHeaderContent>
          <PageActions>
            <ThemeToggle />
          </PageActions>
        </PageHeader>
        <PageContent>
          <SubscriptionPlan
            className="w-[350px]"
            active={session!.user.plan === "essential"}
            userEmail={session!.user.email}
          />
        </PageContent>
      </PageContainer>
    </WithAuthentication>
  );
};

export default SubscriptionPage;
