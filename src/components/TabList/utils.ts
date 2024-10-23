import { useTranslation } from "react-i18next";

import { CURRENTTAB_STATE } from "@/providers/GlobalProvider/enums";

export const useTabs = () => {
  const { t } = useTranslation();
  return [
    { tabValue: CURRENTTAB_STATE.MAIN, label: t("swarm.tab.main") },
    { tabValue: CURRENTTAB_STATE.STATS, label: t("swarm.tab.stats") },
  ];
};
