import { Button } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import { EmptyState } from "@/components/EmptyState";
import { EmptyStateIcon } from "@/components/SVG/EmptyStateIcon";

import * as ST from "./style";

export const NoServicesView: FC = () => {
  const { t } = useTranslation();
  return (
    <ST.NoServicesViewWrapper data-testid="no-services-view-wrapper">
      <EmptyState imageOrSVG={{ component: EmptyStateIcon }} text={t("swarm.empty.services")} />
      <Button variant="contained" data-testid="create-services-button">
        {t("swarm.create.service")}
      </Button>
    </ST.NoServicesViewWrapper>
  );
};
