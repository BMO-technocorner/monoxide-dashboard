import { useState } from 'react';
import { Box, Container, createStyles, ScrollArea, Text } from '@mantine/core';
import Sidebar from './Sidebar';
import { ReactNode } from 'react';

type AppLayoutProps = {
  children: ReactNode;
  title?: string;
};

const useStyles = createStyles((theme) => ({
  titleText: {
    fontSize: 24,
    fontWeight: 700,
    letterSpacing: theme.other.letterSpacing.trackingTight,
    marginBottom: 24,
  },
}));

export default function AppLayout({ children, title }: AppLayoutProps) {
  const [opened, setOpened] = useState(false);
  const { classes } = useStyles();

  const handleOpen = () => setOpened((o) => !o);

  return (
    <Box sx={{ display: 'flex' }}>
      <Box>
        <Sidebar opened={opened} handleOpen={handleOpen} />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          justifyContent: 'flex-start',
          flexDirection: 'column',
        }}
      >
        <Container size='md' px='xl' sx={{ width: '100%' }}>
          <Box py={24} component={ScrollArea}>
            {title && <Text className={classes.titleText}>{title}</Text>}
            {children}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
