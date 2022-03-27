import AppLayout from '@/components/layout/AppLayout';
import Table from '@/components/Table';
import { ReportData } from '@/constants/report-data';
import { Box, ScrollArea, Text } from '@mantine/core';
import React from 'react';

type ReportProps = {};

const Report = ({}: ReportProps) => {
  return (
    <AppLayout>
      <Box py={24} sx={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Text
          sx={(theme) => ({
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: theme.other.letterSpacing.trackingTight,
          })}
        >
          Report
        </Text>

        <ScrollArea>
          <Table data={ReportData} />
        </ScrollArea>
      </Box>
    </AppLayout>
  );
};

export default Report;
