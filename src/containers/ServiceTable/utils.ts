import { useTranslation } from "react-i18next";

import { COLUMN_ID } from "@/providers/GlobalProvider/enums";
import { Column } from "@/providers/GlobalProvider/types";

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
