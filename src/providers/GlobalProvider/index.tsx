import { usePathname, useRouter } from "next/navigation";
import { FC, createContext, useContext, useEffect, useMemo, useState } from "react";

import { useGetServicesQuery, useGetStatsQuery } from "@/services/api";

import { CURRENTTAB_STATE, MODAL_TYPE, PATH } from "./enums";
import { Services } from "./serviceType";
import {
  DisplayModalsState,
  GlobalProviderContextType,
  GlobalProviderProps,
  RowItem,
  ServiceStat,
  TableQueryParamsState,
  UserState,
} from "./types";
import {
  initialCurrentTab,
  initialDisplayModalsState,
  initialTableQueryParamsState,
  prepareUser,
  transformServiceStats,
} from "./utils";

const GlobalProviderContext = createContext<GlobalProviderContextType | null>(null);

export const useGlobalProvider = () => {
  const context = useContext(GlobalProviderContext);
  if (!context) {
    throw new Error("useGlobalProvider must be used within a GlobalProvider");
  }
  return context;
};

export const GlobalProvider: FC<GlobalProviderProps> = ({ session, children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<UserState>(prepareUser(session));
  const [services, setServices] = useState<Services | null>(null);
  const [displayModals, setDisplayModals] = useState<DisplayModalsState>(initialDisplayModalsState);
  const [currentTab, setCurrentTab] = useState<CURRENTTAB_STATE>(initialCurrentTab(pathname));
  const [tableQueryParams, setTableQueryParams] = useState<TableQueryParamsState>(initialTableQueryParamsState);
  const [tableSelected, setTableSelected] = useState<RowItem[]>([]);
  const [servicesStats, setServicesStats] = useState<ServiceStat[]>([]);
  const { data: servicesData } = useGetServicesQuery(tableQueryParams);
  const { data: statsData } = useGetStatsQuery();

  const handleDisplayModal = (modalType: MODAL_TYPE) =>
    setDisplayModals(prevState => ({
      ...prevState,
      [modalType]: !prevState[modalType],
    }));

  useEffect(() => {
    const newPath = currentTab === CURRENTTAB_STATE.STATS ? PATH.STATS : PATH.MAIN;
    router.push(newPath);
  }, [currentTab, router]);

  useEffect(() => {
    if (pathname === (PATH.STATS as string) && services?.filteredUsers.length === 0) {
      router.push(PATH.MAIN);
    }
  }, [pathname, services, router]);

  useEffect(() => {
    if (servicesData) {
      setServices(servicesData);
      if (displayModals.toggleStatusServices) return;
      setTableSelected([]);
    }
  }, [servicesData, tableQueryParams]);
  useEffect(() => {
    if (statsData) setServicesStats(transformServiceStats(statsData));
  }, [statsData]);

  const value = useMemo<GlobalProviderContextType>(
    () => ({
      user,
      setUser,
      services,
      displayModals,
      setDisplayModals,
      currentTab,
      setCurrentTab,
      tableQueryParams,
      setTableQueryParams,
      tableSelected,
      setTableSelected,
      servicesStats,
      setServicesStats,
      handleDisplayModal,
    }),
    [user, services, displayModals, currentTab, tableQueryParams, tableSelected, servicesStats],
  );

  return <GlobalProviderContext.Provider value={value}>{children}</GlobalProviderContext.Provider>;
};
