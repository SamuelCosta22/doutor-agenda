import "./globals.css";

import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { Toaster } from "@/components/ui/sonner";
import { ReactQueryProvider } from "@/providers/react-query";
import { ThemeProvider } from "@/providers/theme-provider";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Doutor Agenda",
  description: "Agendamento de consultas médicas",
  icons: {
    icon: [
      {
        url: "/logomarca.svg",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${manrope.variable} antialiased`}>
        <ReactQueryProvider>
          <NuqsAdapter>
            <ThemeProvider defaultTheme="system" storageKey="clinic-ui-theme">
              {children}
            </ThemeProvider>
          </NuqsAdapter>
        </ReactQueryProvider>
        <Toaster position="bottom-center" richColors />
      </body>
    </html>
  );
}
