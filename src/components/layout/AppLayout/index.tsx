import { useState } from 'react';
import {
  AppShell,
  Box,
  Container,
  createStyles,
  ScrollArea,
  Text,
} from '@mantine/core';
import Sidebar from './Sidebar';
import { ReactNode } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import Header from './Header';

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
  const largeScreen = useMediaQuery('(min-width: 1000px)');
  const [opened, setOpened] = useState(false);
  const { classes } = useStyles();

  const handleOpen = () => setOpened((o) => !o);

  return (
    <AppShell
      navbar={<Sidebar opened={opened} handleOpen={handleOpen} />}
      header={<Header opened={opened} handleOpen={handleOpen} />}
    >
      <Container size='md' pl={largeScreen ? 324 : 0} mt={78} pr={0}>
        {title && <Text className={classes.titleText}>{title}</Text>}
        {children}
      </Container>
    </AppShell>
  );
}
