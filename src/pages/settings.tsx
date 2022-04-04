import AppLayout from "@/components/layout/AppLayout";
import { Box, createStyles } from "@mantine/core";
import React from "react";
import SettingsAccountCard from "@/components/SettingsAccountCard";
import SettingsPasswordCard from "@/components/SettingsPasswordCard";
import ThemeToggle from "@/components/ThemeToggle";
import SettingsThemeCard from "@/components/SettingsThemeCard";

type SettingsProps = {};

const useStyles = createStyles({
  contentWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
});

const Settings = ({}: SettingsProps) => {
  const { classes } = useStyles();

  return (
    <AppLayout title="Settings">
      <Box className={classes.contentWrapper}>
        <SettingsAccountCard />
        <SettingsPasswordCard />
        <SettingsThemeCard />
      </Box>
    </AppLayout>
  );
};

export default Settings;
