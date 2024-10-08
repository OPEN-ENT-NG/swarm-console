import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { serviceMapping } from "@/containers/CreateServicesModal/utils";
import { Session } from "@/types";

import { CURRENTTAB_STATE, MODAL_TYPE, ORDER_TYPE, SERVICE_STATE, SERVICE_STATE_DISPLAY, SERVICE_TYPE } from "./enums";
import { Services } from "./serviceType";
import { DisplayModalsState, RowItem, TableQueryParamsState } from "./types";

export const initialDisplayModalsState: DisplayModalsState = {
  [MODAL_TYPE.CREATE]: false,
  [MODAL_TYPE.DELETE]: false,
  [MODAL_TYPE.CONFIRMATION]: false,
  [MODAL_TYPE.SEND]: false,
  [MODAL_TYPE.TOGGLE_STATUS]: false,
  [MODAL_TYPE.REINIT]: false,
  [MODAL_TYPE.UPDATE]: false,
};

export const initialCurrentTab: (pathname: string) => CURRENTTAB_STATE = pathname =>
  pathname === "/stats" ? CURRENTTAB_STATE.STATS : CURRENTTAB_STATE.MAIN;

export const initialTableQueryParamsState: TableQueryParamsState = {
  search: "",
  page: 0,
  limit: 10,
  order: ORDER_TYPE.DESC,
  types: [],
  structures: [],
  classes: [],
  groups: [],
};

export const prepareUser = (session: Session) => {
  const {
    user: { name, email, image },
    token,
  } = session;
  return { name, email, image: image ?? "", token };
};

export const useTabs = () => {
  const { t } = useTranslation();
  return [
    { tabValue: CURRENTTAB_STATE.MAIN, label: t("swarm.tab.main") },
    { tabValue: CURRENTTAB_STATE.STATS, label: t("swarm.tab.stats") },
  ];
};

export const useFormattedServiceMapping = (tableSelected: RowItem[]) => {
  const formattedServiceMapping = useMemo(() => {
    const presentServiceTypes = tableSelected.reduce((acc: SERVICE_TYPE[], item: RowItem) => {
      item.services.forEach(service => {
        const serviceStateDisplay = getServiceStateDisplay(service.state);
        if (
          !acc.includes(service.type) &&
          (serviceStateDisplay === SERVICE_STATE_DISPLAY.ACTIVE ||
            serviceStateDisplay === SERVICE_STATE_DISPLAY.INACTIVE)
        ) {
          acc.push(service.type);
        }
      });
      return acc;
    }, []);

    return serviceMapping.filter(item => presentServiceTypes.includes(item.name));
  }, [tableSelected]);

  return formattedServiceMapping;
};

export const extractIdsServices = (tableSelected: RowItem[], inputValue: SERVICE_TYPE[]): string[] => {
  return tableSelected.reduce<string[]>((acc, row) => {
    const idsServicesCorrespondants = row.services
      .filter(service => inputValue.includes(service.type))
      .map(service => service.id);
    return [...acc, ...idsServicesCorrespondants];
  }, []);
};

export const getServiceStateDisplay = (status: SERVICE_STATE): SERVICE_STATE_DISPLAY => {
  switch (status) {
    case SERVICE_STATE.SCHEDULED:
    case SERVICE_STATE.IN_PROGRESS:
      return SERVICE_STATE_DISPLAY.CREATION;

    case SERVICE_STATE.DEPLOYED:
    case SERVICE_STATE.DEACTIVATION_SCHEDULED:
      return SERVICE_STATE_DISPLAY.ACTIVE;

    case SERVICE_STATE.DEPLOYMENT_IN_ERROR:
    case SERVICE_STATE.DELETION_IN_ERROR:
    case SERVICE_STATE.RESET_IN_ERROR:
    case SERVICE_STATE.DEACTIVATION_IN_ERROR:
    case SERVICE_STATE.REACTIVATION_IN_ERROR:
      return SERVICE_STATE_DISPLAY.ERROR;

    case SERVICE_STATE.DELETION_SCHEDULED:
    case SERVICE_STATE.DELETION_IN_PROGRESS:
      return SERVICE_STATE_DISPLAY.DELETION;

    case SERVICE_STATE.RESET_SCHEDULED:
    case SERVICE_STATE.RESET_IN_PROGRESS:
      return SERVICE_STATE_DISPLAY.REINIT;

    case SERVICE_STATE.DISABLED:
    case SERVICE_STATE.REACTIVATION_SCHEDULED:
      return SERVICE_STATE_DISPLAY.INACTIVE;

    default:
      return SERVICE_STATE_DISPLAY.ERROR;
  }
};

export const completeServicesData: Services = {
  globalInfos: {
    totalUsers: 13,
    structures: [
      { id: "struct1", name: "School A" },
      { id: "struct2", name: "School B" },
      { id: "struct3", name: "School C" },
      { id: "struct4", name: "School D" },
    ],
    classes: [
      { classId: "class1", name: "Class 1" },
      { classId: "class2", name: "Class 2" },
      { classId: "class3", name: "Class 3" },
      { classId: "class4", name: "Class 4" },
    ],
    groups: null,
    users: [
      { id: "user1", firstName: "John", lastName: "Doe", structureNodes: null },
      { id: "user2", firstName: "Jane", lastName: "Smith", structureNodes: null },
      { id: "user3", firstName: "Alice", lastName: "Johnson", structureNodes: null },
      { id: "user4", firstName: "Bob", lastName: "Brown", structureNodes: null },
      { id: "user5", firstName: "Charlie", lastName: "Davis", structureNodes: null },
      { id: "user6", firstName: "Diana", lastName: "Wilson", structureNodes: null },
      { id: "user7", firstName: "Ethan", lastName: "Miller", structureNodes: null },
      { id: "user8", firstName: "Fiona", lastName: "Taylor", structureNodes: null },
      { id: "user9", firstName: "George", lastName: "Anderson", structureNodes: null },
      { id: "user10", firstName: "Hannah", lastName: "Thomas", structureNodes: null },
      { id: "user11", firstName: "Ian", lastName: "Jackson", structureNodes: null },
      { id: "user12", firstName: "Julia", lastName: "White", structureNodes: null },
      { id: "user13", firstName: "Kevin", lastName: "Harris", structureNodes: null },
    ],
  },
  filteredUsers: [
    {
      structures: [{ id: "struct1", name: "School A" }],
      classes: [{ classId: "class1", name: "Class 1" }],
      groups: [{ id: "group1", name: "Group A" }],
      services: [
        {
          id: "service1",
          userId: "user1",
          firstName: "John",
          lastName: "Doe",
          serviceName: "JohnShop",
          structureId: "struct1",
          type: SERVICE_TYPE.PRESTASHOP,
          created: new Date("2024-01-01"),
          deletionDate: new Date("2025-01-01"),
          state: SERVICE_STATE.DEPLOYED,
        },
        {
          id: "service2",
          userId: "user1",
          firstName: "John",
          lastName: "Doe",
          serviceName: "JohnBlog",
          structureId: "struct1",
          type: SERVICE_TYPE.WORDPRESS,
          created: new Date("2024-01-15"),
          deletionDate: new Date("2025-01-15"),
          state: SERVICE_STATE.SCHEDULED,
        },
      ],
    },
    {
      structures: [{ id: "struct2", name: "School B" }],
      classes: [{ classId: "class2", name: "Class 2" }],
      groups: [{ id: "group2", name: "Group B" }],
      services: [
        {
          id: "service3",
          userId: "user2",
          firstName: "Jane",
          lastName: "Smith",
          serviceName: "JaneShop",
          structureId: "struct2",
          type: SERVICE_TYPE.PRESTASHOP,
          created: new Date("2024-02-01"),
          deletionDate: new Date("2025-02-01"),
          state: SERVICE_STATE.IN_PROGRESS,
        },
      ],
    },
    {
      structures: [{ id: "struct3", name: "School C" }],
      classes: [{ classId: "class3", name: "Class 3" }],
      groups: [{ id: "group3", name: "Group C" }],
      services: [
        {
          id: "service4",
          userId: "user3",
          firstName: "Alice",
          lastName: "Johnson",
          serviceName: "AliceBlog",
          structureId: "struct3",
          type: SERVICE_TYPE.WORDPRESS,
          created: new Date("2024-03-01"),
          deletionDate: new Date("2025-03-01"),
          state: SERVICE_STATE.DEPLOYED,
        },
      ],
    },
    {
      structures: [{ id: "struct4", name: "School D" }],
      classes: [{ classId: "class4", name: "Class 4" }],
      groups: [{ id: "group4", name: "Group D" }],
      services: [
        {
          id: "service5",
          userId: "user4",
          firstName: "Bob",
          lastName: "Brown",
          serviceName: "BobShop",
          structureId: "struct4",
          type: SERVICE_TYPE.PRESTASHOP,
          created: new Date("2024-04-01"),
          deletionDate: new Date("2025-04-01"),
          state: SERVICE_STATE.DEPLOYMENT_IN_ERROR,
        },
        {
          id: "service6",
          userId: "user4",
          firstName: "Bob",
          lastName: "Brown",
          serviceName: "BobBlog",
          structureId: "struct4",
          type: SERVICE_TYPE.WORDPRESS,
          created: new Date("2024-04-15"),
          deletionDate: new Date("2025-04-15"),
          state: SERVICE_STATE.DELETION_SCHEDULED,
        },
      ],
    },
    {
      structures: [{ id: "struct1", name: "School A" }],
      classes: [{ classId: "class1", name: "Class 1" }],
      groups: [{ id: "group5", name: "Group E" }],
      services: [
        {
          id: "service7",
          userId: "user5",
          firstName: "Charlie",
          lastName: "Davis",
          serviceName: "CharlieShop",
          structureId: "struct1",
          type: SERVICE_TYPE.PRESTASHOP,
          created: new Date("2024-05-01"),
          deletionDate: new Date("2025-05-01"),
          state: SERVICE_STATE.DELETION_IN_PROGRESS,
        },
      ],
    },
    {
      structures: [{ id: "struct2", name: "School B" }],
      classes: [{ classId: "class2", name: "Class 2" }],
      groups: [{ id: "group6", name: "Group F" }],
      services: [
        {
          id: "service8",
          userId: "user6",
          firstName: "Diana",
          lastName: "Wilson",
          serviceName: "DianaBlog",
          structureId: "struct2",
          type: SERVICE_TYPE.WORDPRESS,
          created: new Date("2024-06-01"),
          deletionDate: new Date("2025-06-01"),
          state: SERVICE_STATE.DELETION_IN_ERROR,
        },
      ],
    },
    {
      structures: [{ id: "struct3", name: "School C" }],
      classes: [{ classId: "class3", name: "Class 3" }],
      groups: [{ id: "group7", name: "Group G" }],
      services: [
        {
          id: "service9",
          userId: "user7",
          firstName: "Ethan",
          lastName: "Miller",
          serviceName: "EthanShop",
          structureId: "struct3",
          type: SERVICE_TYPE.PRESTASHOP,
          created: new Date("2024-07-01"),
          deletionDate: new Date("2025-07-01"),
          state: SERVICE_STATE.RESET_SCHEDULED,
        },
        {
          id: "service10",
          userId: "user7",
          firstName: "Ethan",
          lastName: "Miller",
          serviceName: "EthanBlog",
          structureId: "struct3",
          type: SERVICE_TYPE.WORDPRESS,
          created: new Date("2024-07-15"),
          deletionDate: new Date("2025-07-15"),
          state: SERVICE_STATE.RESET_IN_PROGRESS,
        },
      ],
    },
    {
      structures: [{ id: "struct4", name: "School D" }],
      classes: [{ classId: "class4", name: "Class 4" }],
      groups: [{ id: "group8", name: "Group H" }],
      services: [
        {
          id: "service11",
          userId: "user8",
          firstName: "Fiona",
          lastName: "Taylor",
          serviceName: "FionaShop",
          structureId: "struct4",
          type: SERVICE_TYPE.PRESTASHOP,
          created: new Date("2024-08-01"),
          deletionDate: new Date("2025-08-01"),
          state: SERVICE_STATE.RESET_IN_ERROR,
        },
      ],
    },
    {
      structures: [{ id: "struct1", name: "School A" }],
      classes: [{ classId: "class1", name: "Class 1" }],
      groups: [{ id: "group9", name: "Group I" }],
      services: [
        {
          id: "service12",
          userId: "user9",
          firstName: "George",
          lastName: "Anderson",
          serviceName: "GeorgeBlog",
          structureId: "struct1",
          type: SERVICE_TYPE.WORDPRESS,
          created: new Date("2024-09-01"),
          deletionDate: new Date("2025-09-01"),
          state: SERVICE_STATE.DEACTIVATION_SCHEDULED,
        },
      ],
    },
    {
      structures: [{ id: "struct2", name: "School B" }],
      classes: [{ classId: "class2", name: "Class 2" }],
      groups: [{ id: "group10", name: "Group J" }],
      services: [
        {
          id: "service13",
          userId: "user10",
          firstName: "Hannah",
          lastName: "Thomas",
          serviceName: "HannahShop",
          structureId: "struct2",
          type: SERVICE_TYPE.PRESTASHOP,
          created: new Date("2024-10-01"),
          deletionDate: new Date("2025-10-01"),
          state: SERVICE_STATE.DEACTIVATION_IN_ERROR,
        },
        {
          id: "service14",
          userId: "user10",
          firstName: "Hannah",
          lastName: "Thomas",
          serviceName: "HannahBlog",
          structureId: "struct2",
          type: SERVICE_TYPE.WORDPRESS,
          created: new Date("2024-10-15"),
          deletionDate: new Date("2025-10-15"),
          state: SERVICE_STATE.DISABLED,
        },
      ],
    },
    {
      structures: [{ id: "struct3", name: "School C" }],
      classes: [{ classId: "class3", name: "Class 3" }],
      groups: [{ id: "group11", name: "Group K" }],
      services: [
        {
          id: "service15",
          userId: "user11",
          firstName: "Ian",
          lastName: "Jackson",
          serviceName: "IanShop",
          structureId: "struct3",
          type: SERVICE_TYPE.PRESTASHOP,
          created: new Date("2024-11-01"),
          deletionDate: new Date("2025-11-01"),
          state: SERVICE_STATE.REACTIVATION_SCHEDULED,
        },
      ],
    },
    {
      structures: [{ id: "struct4", name: "School D" }],
      classes: [{ classId: "class4", name: "Class 4" }],
      groups: [{ id: "group12", name: "Group L" }],
      services: [
        {
          id: "service16",
          userId: "user12",
          firstName: "Julia",
          lastName: "White",
          serviceName: "JuliaBlog",
          structureId: "struct4",
          type: SERVICE_TYPE.WORDPRESS,
          created: new Date("2024-12-01"),
          deletionDate: new Date("2025-12-01"),
          state: SERVICE_STATE.REACTIVATION_IN_ERROR,
        },
      ],
    },
    {
      structures: [{ id: "struct1", name: "School A" }],
      classes: [{ classId: "class1", name: "Class 1" }],
      groups: [{ id: "group13", name: "Group M" }],
      services: [
        {
          id: "service17",
          userId: "user13",
          firstName: "Kevin",
          lastName: "Harris",
          serviceName: "KevinShop",
          structureId: "struct1",
          type: SERVICE_TYPE.PRESTASHOP,
          created: new Date("2025-01-01"),
          deletionDate: new Date("2026-01-01"),
          state: SERVICE_STATE.DEPLOYED,
        },
        {
          id: "service18",
          userId: "user13",
          firstName: "Kevin",
          lastName: "Harris",
          serviceName: "KevinBlog",
          structureId: "struct1",
          type: SERVICE_TYPE.WORDPRESS,
          created: new Date("2025-01-15"),
          deletionDate: new Date("2026-01-15"),
          state: SERVICE_STATE.SCHEDULED,
        },
      ],
    },
  ],
};
