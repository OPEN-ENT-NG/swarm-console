import { Button } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import { EmptyState } from "@/components/EmptyState";
import { EmptyStateIcon } from "@/components/SVG/EmptyStateIcon";
import { useGlobalProvider } from "@/providers/GlobalProvider";
import { MODAL_TYPE } from "@/providers/GlobalProvider/enums";

import { CreateServicesModal } from "../CreateServicesModal";
import { NoServicesViewWrapper } from "./style";

export const NoServicesView: FC = () => {
  const { t } = useTranslation();
  const {
    displayModals: { createServices },
    handleDisplayModal,
  } = useGlobalProvider();

  return (
    <NoServicesViewWrapper data-testid="no-services-view-wrapper">
      <EmptyState imageOrSVG={{ component: EmptyStateIcon }} text={t("swarm.empty.services")} />
      <Button
        variant="contained"
        data-testid="create-services-button"
        onClick={() => handleDisplayModal(MODAL_TYPE.CREATE)}>
        {t("swarm.create.service.button")}
      </Button>
      <CreateServicesModal isOpen={createServices} handleClose={() => handleDisplayModal(MODAL_TYPE.CREATE)} />
    </NoServicesViewWrapper>
  );
};
