import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useTranslation } from "react-i18next";

import { COLUMN_ID, SERVICE_STATE_DISPLAY } from "@/providers/GlobalProvider/enums";
import { User } from "@/providers/GlobalProvider/serviceType";
import { Column, RowItem } from "@/providers/GlobalProvider/types";

export const useColumns: () => Column[] = () => {
  const { t } = useTranslation();
  return [
    { id: COLUMN_ID.SELECT, label: "", width: "5%" },
    { id: COLUMN_ID.NAME, label: t("swarm.table.column.name"), width: "20%" },
    { id: COLUMN_ID.CLASS, label: t("swarm.table.column.class"), width: "10%" },
    { id: COLUMN_ID.ETAB, label: t("swarm.table.column.etab"), width: "20%" },
    { id: COLUMN_ID.SERVICES, label: t("swarm.table.column.services"), width: "15%" },
    { id: COLUMN_ID.STATUS, label: t("swarm.table.column.status"), width: "10%" },
    { id: COLUMN_ID.DELETION_DATE, label: t("swarm.table.column.supressDate"), width: "20%" },
  ];
};

export const orderByValues = [COLUMN_ID.NAME, COLUMN_ID.CLASS, COLUMN_ID.ETAB];

export const transformRawDatas = (users: User[]): RowItem[] => {
  const filtered = users.filter(item => !!item.services.length);
  return filtered.flatMap(user =>
    user.structures.flatMap(structure =>
      user.classes.map(classe => ({
        userId: user.services[0]?.userId ?? "",
        lastName: user.services[0]?.lastName ?? "",
        firstName: user.services[0]?.firstName ?? "",
        className: classe.name,
        classId: classe.classId,
        etabName: structure.name,
        etabId: structure.id,
        services: user.services,
      })),
    ),
  );
};

dayjs.extend(utc);
export const formatDate = (dateString: Date): string => {
  return dayjs(dateString).utc().format("DD/MM/YYYY");
};

export const statusMap: Record<SERVICE_STATE_DISPLAY, string> = {
  [SERVICE_STATE_DISPLAY.ACTIVE]: "swarm.status.active",
  [SERVICE_STATE_DISPLAY.INACTIVE]: "swarm.status.inactive",
  [SERVICE_STATE_DISPLAY.CREATION]: "swarm.status.create",
  [SERVICE_STATE_DISPLAY.ERROR]: "swarm.status.error",
  [SERVICE_STATE_DISPLAY.DELETION]: "swarm.status.delete",
  [SERVICE_STATE_DISPLAY.REINIT]: "swarm.status.reinit",
};
