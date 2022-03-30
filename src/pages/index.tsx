import DeviceStats from "@/components/DeviceStats";
import AppLayout from "@/components/layout/AppLayout";
import StatsGrid from "@/components/StatsGrid";
import { Box, Text } from "@mantine/core";
import React from "react";
import { statsGridIconsType } from "../components/StatsGrid";

type OverviewProps = {};

const statsData = [
  {
    title: "Total Device",
    icon: "device",
    value: "13,456",
    diff: 34,
  },
  {
    title: "Total Report",
    icon: "report",
    value: "4,145",
    diff: -13,
  },
  {
    title: "Total Problem",
    icon: "warning",
    value: "745",
    diff: 18,
  },
  {
    title: "Total Users",
    icon: "user",
    value: "188",
    diff: 30,
  },
];

const deviceStatsData = {
  title: "Project tasks",
  completed: 1887,
  total: 2334,
  stats: [
    {
      value: 447,
      label: "Remaining",
    },
    {
      value: 76,
      label: "In progress",
    },
  ],
};

const Overview = ({}: OverviewProps) => {
  return (
    <AppLayout title="Overview">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <StatsGrid data={statsData as any} />

        <Text>Device Stats</Text>
        <DeviceStats
          title={deviceStatsData.title}
          completed={deviceStatsData.completed}
          total={deviceStatsData.total}
          stats={deviceStatsData.stats}
        />
      </Box>
    </AppLayout>
  );
};

export default Overview;
