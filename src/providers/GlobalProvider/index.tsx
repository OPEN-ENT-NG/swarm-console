import { FC, createContext, useContext, useEffect, useMemo, useState } from "react";

import { useGetServicesQuery } from "@/services/api";
import { servicesMock } from "@/test/mocks/datasMock";

import {
  CURRENTTAB_STATE,
  DisplayModalsState,
  GlobalProviderContextType,
  GlobalProviderProps,
  ServicesState,
  TableQueryParamsState,
  UserState,
} from "./types";
import { initialCurrentTab, initialDisplayModalsState, initialTableQueryParamsState, prepareUser } from "./utils";

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
  const [services, setServices] = useState<ServicesState>([]);
  const [displayModals, setDisplayModals] = useState<DisplayModalsState>(initialDisplayModalsState);
  const [currentTab, setCurrentTab] = useState<CURRENTTAB_STATE>(initialCurrentTab);
  const [tableQueryParams, setTableQueryParams] = useState<TableQueryParamsState>(initialTableQueryParamsState);
  const [tableSelected, setTableSelected] = useState<string[]>([]);
  const { data: servicesData } = useGetServicesQuery();

  useEffect(() => {
    console.log(tableQueryParams);
  }, [tableQueryParams]);

  useEffect(() => {
    if (servicesData) setServices(servicesMock);
  }, [servicesData]);

  const value = useMemo<GlobalProviderContextType>(
    () => ({
      user,
      services,
      displayModals,
      setDisplayModals,
      currentTab,
      setCurrentTab,
      tableQueryParams,
      setTableQueryParams,
      tableSelected,
      setTableSelected,
    }),
    [user, services, displayModals, currentTab, tableQueryParams, tableSelected],
  );

  return <GlobalProviderContext.Provider value={value}>{children}</GlobalProviderContext.Provider>;
};
