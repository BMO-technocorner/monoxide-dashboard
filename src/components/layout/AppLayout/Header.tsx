import React from 'react';
import {
  Header as MantineHeader,
  MediaQuery,
  Burger,
  Text,
  useMantineTheme,
  Box,
} from '@mantine/core';
import { Leaf } from 'tabler-icons-react';

type HeaderProps = {
  opened: boolean;
  handleOpen: () => void;
};

export default function Header({ opened, handleOpen }: HeaderProps) {
  const theme = useMantineTheme();

  return (
    <MantineHeader
      height={70}
      py='md'
      px='xl'
      fixed
      position={{ top: 0, left: 0, right: 0 }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <MediaQuery largerThan={1000} styles={{ display: 'none' }}>
          <Burger
            opened={opened}
            onClick={handleOpen}
            size='sm'
            color={theme.colors.gray[6]}
            mr='xl'
          />
        </MediaQuery>

        <Box sx={{ display: 'flex', gap: 8, fontWeight: 'bold' }}>
          <Leaf />
          <Text>Monoxide</Text>
        </Box>
      </Box>
    </MantineHeader>
  );
}
