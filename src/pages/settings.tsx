import AppLayout from "@/components/layout/AppLayout";
import { Box, createStyles } from "@mantine/core";
import React from "react";
import AccountSettingsCard from "@/components/AccountSettingsCard";
import PasswordSettingsCard from "@/components/PasswordSettingsCard";

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
        <AccountSettingsCard />
        <PasswordSettingsCard />
      </Box>
    </AppLayout>
  );
};

export default Settings;
