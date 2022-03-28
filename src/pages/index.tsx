import AppLayout from '@/components/layout/AppLayout';
import { Box } from '@mantine/core';
import React from 'react';

type OverviewProps = {};

const Overview = ({}: OverviewProps) => {
  return (
    <AppLayout title='Overview'>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 16 }}></Box>
    </AppLayout>
  );
};

export default Overview;
