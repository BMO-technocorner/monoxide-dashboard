import AppLayout from '@/components/layout/AppLayout';
import { Box } from '@mantine/core';
import React from 'react';

type SettingsProps = {};

const Settings = ({}: SettingsProps) => {
  return (
    <AppLayout title='Settings'>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 16 }}></Box>
    </AppLayout>
  );
};

export default Settings;
