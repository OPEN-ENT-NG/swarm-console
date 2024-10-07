import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import { ReactNode } from "react";

import { authOptions } from "@/auth.config";
import { ClientLayout } from "@/layouts/ClientLayout";
import { Session } from "@/types";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const headersList = headers();
  const locale = headersList.get("x-default-locale") ?? "fr";
  const session: Session | null = await getServerSession(authOptions);

  if (!session) {
    return (
      <html lang={locale}>
        <body className={inter.className}>
          <p>Non authentifié</p>
        </body>
      </html>
    );
  }

  if (!session.isManager) {
    return (
      <html lang={locale}>
        <body className={inter.className}>
          <p>Accès refusé : Rôle Manager requis</p>
        </body>
      </html>
    );
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <ClientLayout session={session}>{children}</ClientLayout>
      </body>
    </html>
  );
}
