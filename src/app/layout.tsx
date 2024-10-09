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
        <head>
          <style>{`
            body {
              margin: 0;
              padding: 0;
              font-family: Arial, sans-serif;
            }
            .error-container {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              height: 100vh;
              background-color: #f5f5f5;
            }
            .error-message {
              text-align: center;
              font-size: 18px;
              line-height: 1.5;
              color: #333;
            }
          `}</style>
        </head>
        <body>
          <div className="error-container">
            <div className="error-message">
              <p>Vous n&apos;avez pas les droits nécessaires pour accéder à cette application</p>
              <p>Veuillez contacter votre administrateur local</p>
            </div>
          </div>
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
