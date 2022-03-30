import React from "react";
import {
  Box,
  createStyles,
  Grid,
  Group,
  Paper,
  SimpleGrid,
  Text,
} from "@mantine/core";
import {
  UserPlus,
  Discount2,
  Receipt2,
  Coin,
  ArrowUpRight,
  ArrowDownRight,
  Devices,
  BrandAppleArcade,
  Report,
  User,
  AlertTriangle,
} from "tabler-icons-react";

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

const statsGridIcons = {
  user: User,
  warning: AlertTriangle,
  device: BrandAppleArcade,
  report: Report,
};

export type statsGridIconsType = keyof typeof statsGridIcons;

interface StatsGridProps {
  data: {
    title: string;
    icon: statsGridIconsType;
    value: string;
    diff: number;
  }[];
}

export default function StatsGrid({ data }: StatsGridProps) {
  const { classes } = useStyles();

  const stats = data.map((stat) => {
    const Icon = statsGridIcons[stat.icon];
    const DiffIcon = stat.diff > 0 ? ArrowUpRight : ArrowDownRight;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group position="apart">
          <Text size="xs" color="dimmed" className={classes.title}>
            {stat.title}
          </Text>
          <Icon className={classes.icon} size={22} />
        </Group>

        <Group align="flex-end" spacing="xs" mt={25}>
          <Text className={classes.value}>{stat.value}</Text>
          <Text
            color={stat.diff > 0 ? "teal" : "red"}
            size="sm"
            weight={500}
            className={classes.diff}
          >
            <span>{stat.diff}%</span>
            <DiffIcon size={16} />
          </Text>
        </Group>

        <Text size="xs" color="dimmed" mt={7}>
          Compared to previous month
        </Text>
      </Paper>
    );
  });

  return (
    <Box>
      <SimpleGrid
        cols={3}
        breakpoints={[
          { maxWidth: "md", cols: 2 },
          { maxWidth: "xs", cols: 1 },
        ]}
      >
        {stats}
      </SimpleGrid>
    </Box>
  );
}
