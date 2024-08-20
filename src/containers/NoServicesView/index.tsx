import { Button } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import { EmptyState } from "@/components/EmptyState";
import { EmptyStateIcon } from "@/components/SVG/EmptyStateIcon";
import { useGlobalProvider } from "@/providers/GlobalProvider";

import { CreateServicesModal } from "../CreateServicesModal";
import * as ST from "./style";

export const NoServicesView: FC = () => {
  const { t } = useTranslation();
  const {
    setDisplayModals,
    displayModals: { createServices },
  } = useGlobalProvider();

  const handleClick = () => setDisplayModals(prevDisplay => ({ ...prevDisplay, createServices: true }));
  const handleClose = () => setDisplayModals(prevDisplay => ({ ...prevDisplay, createServices: false }));

  return (
    <ST.NoServicesViewWrapper data-testid="no-services-view-wrapper">
      <EmptyState imageOrSVG={{ component: EmptyStateIcon }} text={t("swarm.empty.services")} />
      <Button variant="contained" data-testid="create-services-button" onClick={handleClick}>
        {t("swarm.create.service.button")}
      </Button>
      <CreateServicesModal isOpen={createServices} handleClose={handleClose} />
    </ST.NoServicesViewWrapper>
  );
};
