import { Box } from "@cgi-learning-hub/ui";
import { FC } from "react";

import { TabList } from "@/components/TabList";
import { useGlobalProvider } from "@/providers/GlobalProvider";
import { CURRENTTAB_STATE } from "@/providers/GlobalProvider/types";

import { StatsView } from "../StatsView";
import { TableView } from "../TableView";
import { mainViewWrapperStyle } from "./style";

export const MainView: FC = () => {
  const { currentTab } = useGlobalProvider();
  return (
    <Box sx={mainViewWrapperStyle}>
      <TabList />
      {currentTab === CURRENTTAB_STATE.MAIN ? <TableView /> : <StatsView />}
    </Box>
  );
};
