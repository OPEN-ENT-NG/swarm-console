import { SERVICE_STATE, SERVICE_TYPE } from "./enums";

export type Structure = {
  id: string;
  name: string;
};

export type Class = {
  classId: string;
  name: string;
};

export type Group = {
  id: string;
  name: string;
};
export type Sructures = {
  id: string;
  externalId: string;
  name: string;
};

export type LightUsers = {
  id: string;
  firstName: string;
  lastName: string;
  structureNodes: null;
};

export type Service = {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  serviceName: string;
  structureId: string;
  classId: string;
  type: SERVICE_TYPE;
  created: Date;
  deletionDate: Date;
  state: SERVICE_STATE;
};

export type User = {
  structures: Structure[];
  classes: Class[];
  groups: Group[];
  services: Service[];
};

export type Services = {
  globalInfos: {
    totalUsers: number;
    structures: Structure[];
    classes: Class[];
    groups: null;
    users: LightUsers[];
  };
  filteredUsers: User[];
};
