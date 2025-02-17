import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import { serviceLabelMapping } from "@/containers/CreateServicesModal/utils";
import { SERVICE_TYPE } from "@/providers/GlobalProvider/enums";
import { Service } from "@/providers/GlobalProvider/serviceType";

import { copyButtonStyle, copyIconStyle, credentialsRowStyle, serviceTitleStyle } from "./style";
import { ServiceCredentialsRowProps } from "./types";

export const ServiceCredentialsRow: FC<ServiceCredentialsRowProps> = ({ service }) => {
  const { t } = useTranslation();
  const enum CredentialsTypes {
    LOGIN,
    PASSWORD,
  }

  const handleCopy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const getTextLine = (credentialType: CredentialsTypes): string => {
    switch (credentialType) {
      case CredentialsTypes.LOGIN:
        return t("swarm.login") + " : " + (service.ownerAdminUser ? service.ownerAdminUser : "");
      case CredentialsTypes.PASSWORD:
        return t("swarm.password") + " : " + (service.ownerAdminPassword ? service.ownerAdminPassword : "");
    }
  };

  const getServiceUrl = (service: Service): string => {
    let suffix = "";
    switch (service.type) {
      case SERVICE_TYPE.WORDPRESS:
        suffix = "/wp-admin";
        break;
      case SERVICE_TYPE.PRESTASHOP:
        suffix = "/ps-admin";
        break;
      default:
        break;
    }
    return service.serviceName + suffix;
  };

  return (
    <Stack spacing={2}>
      <Link href={getServiceUrl(service)} target="_blank" rel="noopener noreferrer">
        <Typography variant="h3" sx={serviceTitleStyle}>
          {t("swarm.update.service.modal.label", { type: t(serviceLabelMapping[service.type]) })}
        </Typography>
      </Link>
      <Stack paddingLeft="1rem">
        <Stack sx={credentialsRowStyle}>
          <Typography variant="h3">{getTextLine(CredentialsTypes.LOGIN)}</Typography>
          <Button onClick={() => handleCopy(service.ownerAdminUser)} sx={copyButtonStyle}>
            <ContentCopyIcon sx={copyIconStyle} />
          </Button>
        </Stack>
        <Stack sx={credentialsRowStyle}>
          <Typography variant="h3">{getTextLine(CredentialsTypes.PASSWORD)}</Typography>
          <Button onClick={() => handleCopy(service.ownerAdminPassword)} sx={copyButtonStyle}>
            <ContentCopyIcon sx={copyIconStyle} />
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
