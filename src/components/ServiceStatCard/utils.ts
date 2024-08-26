import { useTranslation } from "react-i18next";

import { SERVICE_TYPE } from "@/providers/GlobalProvider/enums";

export const usePrepareStatTitle = (type: SERVICE_TYPE) => {
  const { t } = useTranslation();
  switch (type) {
    case SERVICE_TYPE.WORDPRESS:
      return t("swarm.update.service.modal.label", { type: t("swarm.wordpress.title") });
    case SERVICE_TYPE.PRESTASHOP:
      return t("swarm.update.service.modal.label", { type: t("swarm.prestashop.title") });
    default:
      return null;
  }
};
