import { useState } from 'react';
import { Box, Container } from '@mantine/core';
import Sidebar from './Sidebar';
import { ReactNode } from 'react';

type AppLayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  const [opened, setOpened] = useState(false);

  const handleOpen = () => setOpened((o) => !o);

  return (
    <Box sx={{ display: 'flex' }}>
      <Box>
        <Sidebar opened={opened} handleOpen={handleOpen} />
      </Box>

      <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-start' }}>
        <Container size='md' px='xs' sx={{ width: '100%' }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
}
