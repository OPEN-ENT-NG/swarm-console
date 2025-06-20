"use client";

import { Box, Button, Typography } from "@cgi-learning-hub/ui";
import "dayjs/locale/fr";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import "react-toastify/dist/ReactToastify.css";

import { Header } from "@/components/Header";
import { ErrorLayoutEnum } from "@/core/enum";
import "@/core/style/globals.css";
import "@/i18n/client";

import { headerImages } from "../../containers/HomePage/utils";
import { errorLayoutStyle } from "./style";
import { ErrorLayoutContainerProps } from "./types";
import { ErrorStateIcon } from "@/components/SVG/ErrorStateIcon";

export const ErrorLayoutContainer: FC<ErrorLayoutContainerProps> = ({ errorType }) => {
  const { t } = useTranslation();

  const getErrorMessage = (type: ErrorLayoutEnum) => {
    switch (type) {
      case ErrorLayoutEnum.NO_SESSION:
        return (
          <Typography gutterBottom={true} variant="h3">
            {t("swarm.error.no_session")}
          </Typography>
        );
      case ErrorLayoutEnum.NOT_MANAGER:
        return (
          <Box>
            <Typography gutterBottom={true} variant="h3">
              {t("swarm.error.not_manager")}
            </Typography>
            <Typography gutterBottom={true} variant="h3">
              {t("swarm.error.contact.manager")}
            </Typography>
          </Box>
        );
      default:
        return (
          <Typography gutterBottom={true} variant="h3">
            {t("swarm.error.default")}
          </Typography>
        );
    }
  };

  return (
    <Box>
      <Header items={headerImages} />
      <Box sx={errorLayoutStyle}>
        <Box><ErrorStateIcon /></Box>
        {getErrorMessage(errorType)}
        <Button variant="contained" onClick={() => window.location.reload()}>
          {t("swarm.refresh")}
        </Button>
      </Box>
    </Box>
  );
};
