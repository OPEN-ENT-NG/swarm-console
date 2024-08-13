import { FC, createContext, useContext, useEffect, useMemo, useState } from "react";

import { useGetServicesQuery } from "@/services/api";

import { GlobalProviderContextType, GlobalProviderProps, ServicesState, UserState } from "./types";
import { prepareUser } from "./utils";

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
  const { data: servicesData } = useGetServicesQuery();
  const [services, setServices] = useState<ServicesState>(null);

  useEffect(() => {
    if (servicesData) setServices(servicesData);
  }, [servicesData]);

  const value = useMemo<GlobalProviderContextType>(
    () => ({
      user,
      services,
    }),
    [user, services],
  );

  return <GlobalProviderContext.Provider value={value}>{children}</GlobalProviderContext.Provider>;
};
