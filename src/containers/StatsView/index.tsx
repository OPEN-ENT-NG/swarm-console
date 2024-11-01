import { Box } from "@mui/material";
import { FC } from "react";

import { ServiceStatCard } from "@/components/ServiceStatCard";
import { useGlobalProvider } from "@/providers/GlobalProvider";

import { statsViewWrapperStyle } from "./style";

export const StatsView: FC = () => {
  const { servicesStats } = useGlobalProvider();
  return (
    <Box sx={statsViewWrapperStyle}>
      {servicesStats.map(item => {
        if (item.total > 0) return <ServiceStatCard key={item.type} serviceStatItem={item} />;
        return null;
      })}
    </Box>
  );
};
