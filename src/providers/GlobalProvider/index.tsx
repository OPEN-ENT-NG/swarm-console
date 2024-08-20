import { FC, createContext, useContext, useEffect, useMemo, useState } from "react";

import { useGetServicesQuery } from "@/services/api";

import { DisplayModalsState, GlobalProviderContextType, GlobalProviderProps, ServicesState, UserState } from "./types";
import { initialDisplayModalsState, prepareUser } from "./utils";

const GlobalProviderContext = createContext<GlobalProviderContextType | null>(null);

export const useGlobalProvider = () => {
  const context = useContext(GlobalProviderContext);
  if (!context) {
    throw new Error("useGlobalProvider must be used within a GlobalProvider");
  }
  return context;
};

export const GlobalProvider: FC<GlobalProviderProps> = ({ session, children }) => {
  const [user] = useState<UserState>(prepareUser(session));
  const [services, setServices] = useState<ServicesState>(null);
  const [displayModals, setDisplayModals] = useState<DisplayModalsState>(initialDisplayModalsState);
  const { data: servicesData } = useGetServicesQuery();

  useEffect(() => {
    if (servicesData) setServices(servicesData);
  }, [servicesData]);

  const value = useMemo<GlobalProviderContextType>(
    () => ({
      user,
      services,
      displayModals,
      setDisplayModals,
    }),
    [user, services, displayModals],
  );

  return <GlobalProviderContext.Provider value={value}>{children}</GlobalProviderContext.Provider>;
};
