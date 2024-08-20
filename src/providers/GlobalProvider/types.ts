import { Dispatch, ReactNode, SetStateAction } from "react";

import { Service, Session } from "@/types";

export interface GlobalProviderProps {
  children: ReactNode;
  session: Session;
}
export interface UserState {
  name: string;
  email: string;
  image: string;
}
export type ServicesState = Service[] | null;

export interface DisplayModalsState {
  createServices: boolean;
}

export type GlobalProviderContextType = {
  services: ServicesState;
  user: UserState;
  displayModals: DisplayModalsState;
  setDisplayModals: Dispatch<SetStateAction<DisplayModalsState>>;
};
