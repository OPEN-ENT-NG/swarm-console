import { useTranslation } from "react-i18next";

import { DropDownListItem } from "@/components/DropDownList/types";
import { PencilIcon } from "@/components/SVG/PencilIcon";
import { ReloadIcon } from "@/components/SVG/ReloadIcon";
import { ShareIcon } from "@/components/SVG/ShareIcon";
import { TrashIcon } from "@/components/SVG/TrashIcon";
import { useGlobalProvider } from "@/providers/GlobalProvider";
import { MODAL_TYPE } from "@/providers/GlobalProvider/enums";

export const useCreatedropDownListItems: () => DropDownListItem[] = () => {
  const { t } = useTranslation();
  const { handleDisplayModal } = useGlobalProvider();
  return [
    {
      primary: <PencilIcon />,
      secondary: t("swarm.button.update"),
      OnClick: () => null,
    },
    {
      primary: <ShareIcon />,
      secondary: t("swarm.button.share"),
      OnClick: () => handleDisplayModal(MODAL_TYPE.SEND),
    },
    {
      primary: <ReloadIcon />,
      secondary: t("swarm.button.reload"),
      OnClick: () => null,
    },
    {
      primary: <TrashIcon />,
      secondary: t("swarm.button.delete"),
      OnClick: () => handleDisplayModal(MODAL_TYPE.DELETE),
    },
  ];
};
