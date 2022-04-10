import AppLayout from "@/components/layout/AppLayout";
import StatsGrid from "@/components/UserStatsGrid";
import { statisticsClientService } from "@/services/statistics";
import { ResponseStatisticsClientData } from "@/types/statistics";
import { Box, Skeleton } from "@mantine/core";
import useSWR from "swr";

const Overview = () => {
  const { data: StatsData } = useSWR(
    "stats_data",
    statisticsClientService.getListStatistics,
    { refreshInterval: 30000 }
  );

  return (
    <AppLayout title="Overview">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {!StatsData ? (
          <Skeleton width="50%" height={94} />
        ) : (
          <StatsGrid data={StatsData as ResponseStatisticsClientData} />
        )}
      </Box>
    </AppLayout>
  );
};

export default Overview;
