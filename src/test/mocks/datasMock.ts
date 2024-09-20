import { PrestashopIcon } from "@/components/SVG/PrestashopIcon";
import { WordPressIcon } from "@/components/SVG/WordPressIcon";
import { SERVICE_STATE, SERVICE_TYPE } from "@/providers/GlobalProvider/enums";
import { ServiceStat } from "@/providers/GlobalProvider/types";
import { Service } from "@/providers/GlobalProvider/types/serviceType";
import { UsersAndGroups } from "@/types";

export const servicesMock: Service[] = [
  {
    type: SERVICE_TYPE.PRESTASHOP,
    status: SERVICE_STATE.DEPLOYED,
    id: 1,
    userId: "USER1001",
    url: "https://boutiquemarie.com",
    supressDate: "2025-12-31",
  },
  {
    type: SERVICE_TYPE.WORDPRESS,
    status: SERVICE_STATE.DISABLED,
    id: 2,
    userId: "USER1002",
    url: "https://blogpierre.com",
    supressDate: "2023-10-15",
  },
];

export const servicesStatsMocks: ServiceStat[] = [
  {
    type: SERVICE_TYPE.WORDPRESS,
    icon: WordPressIcon,
    total: 12,
    active: 124,
    inactive: 67,
    toDelete: 97,
  },
  {
    type: SERVICE_TYPE.PRESTASHOP,
    icon: PrestashopIcon,
    total: 12,
    active: 124,
    inactive: 67,
    toDelete: 97,
  },
];

export const usersAndGroupListData: UsersAndGroups[] = [
  {
    id: "1",
    name: "John Doe",
    type: "user",
  },
  {
    id: "2",
    name: "Math Group",
    type: "group",
  },
  {
    id: "3",
    name: "Science Class",
    type: "class",
  },
  {
    id: "4",
    name: "Jane Smith",
    type: "user",
  },
  {
    id: "5",
    name: "English Group",
    type: "group",
  },
  {
    id: "6",
    name: "History Class",
    type: "class",
  },
  {
    id: "7",
    name: "Alice Johnson",
    type: "user",
  },
  {
    id: "8",
    name: "Physics Study Group",
    type: "group",
  },
  {
    id: "9",
    name: "Art Workshop",
    type: "class",
  },
  {
    id: "10",
    name: "Bob Williams",
    type: "user",
  },
  {
    id: "11",
    name: "Chemistry Lab Group",
    type: "group",
  },
  {
    id: "12",
    name: "Literature Seminar",
    type: "class",
  },
  {
    id: "13",
    name: "Emma Davis",
    type: "user",
  },
  {
    id: "14",
    name: "Coding Club",
    type: "group",
  },
  {
    id: "15",
    name: "Physical Education",
    type: "class",
  },
  {
    id: "16",
    name: "Michael Brown",
    type: "user",
  },
];
