import { Calendar, Stethoscope, Users } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/auth";

import LoginForm from "./components/login-form";
import SignUpForm from "./components/sign-up-form";

const AuthenticationPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen w-full">
      <div className="bg-primary-foreground flex w-[40%] flex-col items-center justify-center space-y-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <Image src="/logo.svg" alt="Logo" width={180} height={40} priority />
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-background text-xl font-medium">
              Bem-vindo à sua plataforma médica
            </h2>
            <p className="text-muted-foreground text-sm">
              Gerencie consultas e pacientes com facilidade
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-center">
          <Tabs defaultValue="login" className="w-[80%]">
            <TabsList className="bg-foreground grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Criar conta</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            <TabsContent value="register">
              <SignUpForm />
            </TabsContent>
          </Tabs>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center rounded-lg p-2 text-center">
            <div className="mb-2 rounded-full bg-blue-100 p-2 text-blue-600">
              <Calendar className="h-5 w-5" />
            </div>
            <span className="text-xs font-medium text-gray-600">
              Agendamento Fácil
            </span>
          </div>
          <div className="flex flex-col items-center rounded-lg p-2 text-center">
            <div className="mb-2 rounded-full bg-blue-100 p-2 text-blue-600">
              <Users className="h-5 w-5" />
            </div>
            <span className="text-xs font-medium text-gray-600">
              Gestão de Pacientes
            </span>
          </div>
          <div className="flex flex-col items-center rounded-lg p-2 text-center">
            <div className="mb-2 rounded-full bg-blue-100 p-2 text-blue-600">
              <Stethoscope className="h-5 w-5" />
            </div>
            <span className="text-xs font-medium text-gray-600">
              Prontuário Digital
            </span>
          </div>
        </div>
      </div>

      <div className="relative hidden md:block md:w-[50%] lg:w-[60%]">
        <div className="absolute inset-0 bg-blue-600/10" />
        <Image
          src="/background2.png"
          alt="Médico trabalhando"
          fill
          className="object-cover"
          priority
          quality={100}
        />
      </div>
    </div>
  );
};

export default AuthenticationPage;
