import AppLayout from "@/components/layout/AppLayout";
import { Box } from "@mantine/core";
import React from "react";
import AccountSettingsCard from "@/components/AccountSettingsCard";
import PasswordSettingsCard from "@/components/PasswordSettingsCard";
type SettingsProps = {};

const Settings = ({}: SettingsProps) => {
  return (
    <AppLayout title="Settings">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <AccountSettingsCard />
        <PasswordSettingsCard />
      </Box>
    </AppLayout>
  );
};

export default Settings;
