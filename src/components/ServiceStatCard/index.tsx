import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import { SVGWrapperStyle, serviceStatCardStyle, statBoxStyle, textWrapperStyle, titleWrapperStyle } from "./style";
import { ServiceStatProps } from "./types";
import { usePrepareStatTitle } from "./utils";

export const ServiceStatCard: FC<ServiceStatProps> = ({ serviceStatItem }) => {
  const { t } = useTranslation();
  return (
    <Box sx={serviceStatCardStyle} data-testid={`stat-card-${serviceStatItem.type}`}>
      <Box sx={titleWrapperStyle}>
        <Box sx={SVGWrapperStyle}>
          <serviceStatItem.icon />
        </Box>
        <Typography variant="h2">{usePrepareStatTitle(serviceStatItem.type)}</Typography>
      </Box>
      <Box sx={statBoxStyle}>
        <Box sx={textWrapperStyle}>
          <Typography variant="h2">{t("swarm.stats.total")}</Typography>
          <Typography variant="h2">{serviceStatItem.total}</Typography>
        </Box>
      </Box>
      <Box sx={statBoxStyle}>
        <Box sx={textWrapperStyle}>
          <Typography variant="h2">{t("swarm.stats.active")}</Typography>
          <Typography variant="h2">{serviceStatItem.active}</Typography>
        </Box>
        <Box sx={textWrapperStyle}>
          <Typography variant="h2">{t("swarm.stats.inactive")}</Typography>
          <Typography variant="h2">{serviceStatItem.inactive}</Typography>
        </Box>
      </Box>
      <Box sx={statBoxStyle}>
        <Box sx={textWrapperStyle}>
          <Typography variant="h2">{t("swarm.stats.delete")}</Typography>
          <Typography variant="h2">{serviceStatItem.toDelete}</Typography>
        </Box>
        <Box sx={textWrapperStyle}>
          <Typography variant="body1" sx={{ fontStyle: "italic" }}>
            {t("swarm.stats.delete.desc")}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
