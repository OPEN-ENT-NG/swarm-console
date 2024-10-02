import { SERVICE_STATE } from "@/providers/GlobalProvider/enums";

export interface DeleteBody {
  services_ids: string[];
  state: SERVICE_STATE;
}

export interface DistributeBody {
  services_ids: string[];
}

export type UpdateBody = { services_ids: string[]; deletion_date: number }[];
export type ResetBody = { services_ids: string[]; deletion_date: number };

export type ToggleStatusBody = {
  services_ids: string[];
  state: SERVICE_STATE.DEACTIVATION_SCHEDULED | SERVICE_STATE.REACTIVATION_SCHEDULED;
}[];

type UserData = {
  id: string;
  firstName: string;
  lastName: string;
  mail: string;
  profiles: null;
  structures: string;
  classes: {
    classId: string;
    name: string;
    schoolId: string;
  }[];
};

export type UsersData = UserData[];
