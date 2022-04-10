import React from "react";
import {
  Box,
  createStyles,
  Group,
  Paper,
  SimpleGrid,
  Text,
} from "@mantine/core";
import {
  BrandAppleArcade,
  Report,
  User,
  AlertTriangle,
} from "tabler-icons-react";
import { ResponseStatisticsClientData } from "@/types/statistics";

const useStyles = createStyles((theme) => ({
  value: {
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 1,
  },

  diff: {
    lineHeight: 1,
    display: "flex",
    alignItems: "center",
  },

  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },

  title: {
    fontWeight: 700,
    textTransform: "uppercase",
  },
}));

const UserStatsGridIcons = {
  user: User,
  warning: AlertTriangle,
  device: BrandAppleArcade,
  report: Report,
};

export type UserStatsGridIconsType = keyof typeof UserStatsGridIcons;

interface UserStatsGridProps {
  data: ResponseStatisticsClientData;
}

export default function UserStatsGrid({ data }: UserStatsGridProps) {
  const { classes } = useStyles();

  return (
    <Box>
      <SimpleGrid
        cols={3}
        breakpoints={[
          { maxWidth: "md", cols: 2 },
          { maxWidth: "xs", cols: 1 },
        ]}
      >
        <Paper withBorder p="md" radius="md">
          <Group position="apart">
            <Text size="xs" color="dimmed" className={classes.title}>
              Total Devices
            </Text>
          </Group>
          <Group align="flex-end" spacing="xs" mt={16}>
            <Text className={classes.value}>{data?.device.total}</Text>
            <Text color="dimmed">Devices</Text>
          </Group>
        </Paper>

        <Paper withBorder p="md" radius="md">
          <Group position="apart">
            <Text size="xs" color="dimmed" className={classes.title}>
              Total Devices Online
            </Text>
          </Group>
          <Group align="flex-end" spacing="xs" mt={16}>
            <Text className={classes.value}>{data?.device.onlineCount}</Text>
            <Text color="dimmed">Devices</Text>
          </Group>
        </Paper>

        <Paper withBorder p="md" radius="md">
          <Group position="apart">
            <Text size="xs" color="dimmed" className={classes.title}>
              Total Report this Month
            </Text>
          </Group>
          <Group align="flex-end" spacing="xs" mt={16}>
            <Text className={classes.value}>
              {data?.report.currentMonthTotal}
            </Text>
            <Text color="dimmed">Report</Text>
          </Group>
        </Paper>

        <Paper withBorder p="md" radius="md">
          <Group position="apart">
            <Text size="xs" color="dimmed" className={classes.title}>
              Total Report last Month
            </Text>
          </Group>
          <Group align="flex-end" spacing="xs" mt={16}>
            <Text className={classes.value}>{data?.report.lastMonthTotal}</Text>
            <Text color="dimmed">Report</Text>
          </Group>
        </Paper>

        <Paper withBorder p="md" radius="md">
          <Group position="apart">
            <Text size="xs" color="dimmed" className={classes.title}>
              Total Room
            </Text>
          </Group>
          <Group align="flex-end" spacing="xs" mt={16}>
            <Text className={classes.value}>{data?.room.total}</Text>
            <Text color="dimmed">Room</Text>
          </Group>
        </Paper>
      </SimpleGrid>
    </Box>
  );
}
