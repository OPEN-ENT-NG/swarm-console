import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import { ReactNode } from "react";

import { authOptions } from "@/auth.config";
import { ErrorLayoutEnum } from "@/core/enum";
import { ClientLayout } from "@/layouts/ClientLayout";
import { ErrorLayout } from "@/layouts/ErrorLayout";
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

  const getLayout = () => {
    if (!session) return <ErrorLayout errorType={ErrorLayoutEnum.NO_SESSION}></ErrorLayout>;
    if (!session.isManager) return <ErrorLayout errorType={ErrorLayoutEnum.NOT_MANAGER}></ErrorLayout>;
    return <ClientLayout session={session}>{children}</ClientLayout>;
  };

  return (
    <html lang={locale}>
      <body className={inter.className}>{getLayout()}</body>
    </html>
  );
}
