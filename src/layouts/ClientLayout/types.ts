import { ReactNode } from "react";

import { Session } from "@/types";

export interface ClientLayoutProps {
  session: Session;
  children: ReactNode;
}
