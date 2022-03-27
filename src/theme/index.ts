import { MantineThemeOverride } from '@mantine/core';

const theme: MantineThemeOverride = {
  colorScheme: 'dark',
  fontFamily: 'Inter',
  other: {
    letterSpacing: {
      trackingTight: '-0.025em',
    },
  },
};

export { theme };
export * from './fonts';
