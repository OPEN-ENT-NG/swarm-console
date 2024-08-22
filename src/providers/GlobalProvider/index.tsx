import { FC, createContext, useContext, useEffect, useMemo, useState } from "react";

import { useGetServicesQuery } from "@/services/api";
import { servicesMock } from "@/test/mocks/datasMock";

import { CURRENTTAB_STATE, MODAL_TYPE } from "./enums";
import {
  DisplayModalsState,
  GlobalProviderContextType,
  GlobalProviderProps,
  RowItem,
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
  const [tableSelected, setTableSelected] = useState<RowItem[]>([]);
  const { data: servicesData } = useGetServicesQuery();

  const handleDisplayModal = (modalType: MODAL_TYPE) =>
    setDisplayModals(prevState => ({
      ...prevState,
      [modalType]: !prevState[modalType],
    }));

  useEffect(() => {}, [tableQueryParams]);

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
      handleDisplayModal,
    }),
    [user, services, displayModals, currentTab, tableQueryParams, tableSelected],
  );

  return <GlobalProviderContext.Provider value={value}>{children}</GlobalProviderContext.Provider>;
};
