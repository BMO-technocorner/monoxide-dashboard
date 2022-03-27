import AppLayout from '@/components/layout/AppLayout';
import { Box, Text } from '@mantine/core';
import type { NextPage } from 'next';

const Home: NextPage = () => {
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
          Devices
        </Text>
      </Box>
    </AppLayout>
  );
};

export default Home;
