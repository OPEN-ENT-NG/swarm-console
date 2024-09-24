import { PrestashopIcon } from "@/components/SVG/PrestashopIcon";
import { WordPressIcon } from "@/components/SVG/WordPressIcon";
import { UsersAndGroups } from "@/components/UserSelectionSection/types";
import { SERVICE_STATE, SERVICE_TYPE } from "@/providers/GlobalProvider/enums";
import { Service } from "@/providers/GlobalProvider/serviceType";
import { ServiceStat } from "@/providers/GlobalProvider/types";

export const servicesMock: Service[] = [
  {
    type: SERVICE_TYPE.PRESTASHOP,
    id: "1",
    userId: "USER1001",
    firstName: "John",
    lastName: "Doe2",
    serviceName: "my-wp",
    structureId: "structure1",
    created: new Date("2023-10-15"),
    deletionDate: new Date("2023-10-20"),
    state: SERVICE_STATE.DEPLOYED,
  },
  {
    type: SERVICE_TYPE.WORDPRESS,
    id: "2",
    userId: "USER1002",
    firstName: "John",
    lastName: "Doe3",
    serviceName: "my-wp2",
    structureId: "structure2",
    created: new Date("2023-10-15"),
    deletionDate: new Date("2023-10-22"),
    state: SERVICE_STATE.DISABLED,
  },
] as Service[];

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
    usertype: "user",
  },
  {
    id: "2",
    name: "Math Group",
    usertype: "group",
  },
  {
    id: "3",
    name: "Science Class",
    usertype: "class",
  },
  {
    id: "4",
    name: "Jane Smith",
    usertype: "user",
  },
  {
    id: "5",
    name: "English Group",
    usertype: "group",
  },
  {
    id: "6",
    name: "History Class",
    usertype: "class",
  },
  {
    id: "7",
    name: "Alice Johnson",
    usertype: "user",
  },
  {
    id: "8",
    name: "Physics Study Group",
    usertype: "group",
  },
  {
    id: "9",
    name: "Art Workshop",
    usertype: "class",
  },
  {
    id: "10",
    name: "Bob Williams",
    usertype: "user",
  },
  {
    id: "11",
    name: "Chemistry Lab Group",
    usertype: "group",
  },
  {
    id: "12",
    name: "Literature Seminar",
    usertype: "class",
  },
  {
    id: "13",
    name: "Emma Davis",
    usertype: "user",
  },
  {
    id: "14",
    name: "Coding Club",
    usertype: "group",
  },
  {
    id: "15",
    name: "Physical Education",
    usertype: "class",
  },
  {
    id: "16",
    name: "Michael Brown",
    usertype: "user",
  },
];
