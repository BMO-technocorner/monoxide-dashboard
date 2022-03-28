import AppLayout from '@/components/layout/AppLayout';
import { Box } from '@mantine/core';
import React from 'react';

type DevicesProps = {};

const Devices = ({}: DevicesProps) => {
  return (
    <AppLayout title='Devices'>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 16 }}></Box>
    </AppLayout>
  );
};

export default Devices;
