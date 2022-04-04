import React from "react";
import { createStyles, Card, Group, Text } from "@mantine/core";
import ThemeToggle from "./ThemeToggle";

const useStyles = createStyles((theme) => ({
  card: {
    border: `1px solid ${
      theme.colorScheme === "dark" ? "#2C2E33" : theme.colors.gray[3]
    }`,
  },

  item: {
    "& + &": {
      paddingTop: theme.spacing.sm,
      marginTop: theme.spacing.sm,
      borderTop: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },
  },

  switch: {
    "& *": {
      cursor: "pointer",
    },
  },

  title: {
    lineHeight: 1,
  },

  root: {
    position: "relative",
  },

  input: {
    height: "auto",
    paddingTop: 18,
  },

  label: {
    position: "absolute",
    pointerEvents: "none",
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: theme.spacing.sm / 2,
    zIndex: 1,
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
}));

interface SettingsThemeCardProps {}

export default function SettingsThemeCard({}: SettingsThemeCardProps) {
  const { classes, theme } = useStyles();

  return (
    <Card withBorder radius="md" p="xl" className={classes.card}>
      <Text size="md" className={classes.title} weight={500}>
        Account Settings
      </Text>
      <Text size="xs" color="dimmed" mt={3} mb="xl">
        Update your account personalization
      </Text>

      <Group>
        <ThemeToggle />
      </Group>
    </Card>
  );
}
