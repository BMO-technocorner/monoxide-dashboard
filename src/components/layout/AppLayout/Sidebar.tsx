import React, { forwardRef } from 'react';
import {
  Navbar,
  Box,
  Avatar,
  Text,
  createStyles,
  Group,
  Menu,
  UnstyledButton,
  UnstyledButtonProps,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { ChevronRight, Leaf, Logout } from 'tabler-icons-react';
import { useRouter } from 'next/router';
import { appLinks } from '@/config/navigation';

type SidebarProps = {
  opened: boolean;
  handleOpen: () => void;
};

type UserButtonProps = {
  data: {
    name: string;
    avatar: string;
    role: 1 | 2 | 3;
  };
} & UnstyledButtonProps;

const useStyles = createStyles((theme) => ({
  linkItem: {
    display: 'flex',
    cursor: 'pointer',
    gap: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,

    '&:hover': {
      opacity: 1,
      backgroundColor: '#111',
    },
  },

  linkItemIconWrapper: {
    display: 'flex',
    flexGrow: 1,
    gap: 16,
  },

  userButtonWrapper: {
    display: 'flex',
    cursor: 'pointer',
    gap: 16,
    alignItems: 'center',
    height: 72,
    width: '100%',
  },

  userButtonTextWrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },

  userButtonName: {
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: theme.other.letterSpacing.trackingTight,
  },

  userButtonRole: {
    fontSize: 12,
    opacity: 0.9,
  },
}));

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ data }: UserButtonProps, ref) => {
    const { classes } = useStyles();

    return (
      <UnstyledButton ref={ref} px='md' className={classes.userButtonWrapper}>
        <Avatar
          alt={data.name}
          src={data.avatar}
          radius={'xl'}
          size='md'
        ></Avatar>
        <Box className={classes.userButtonTextWrapper}>
          <Text className={classes.userButtonName}>{data.name}</Text>
          <Text className={classes.userButtonRole}>
            {data.role === 1
              ? 'Administrator'
              : data.role === 2
              ? 'Observer'
              : 'User'}
          </Text>
        </Box>
      </UnstyledButton>
    );
  }
);

export default function Sidebar({ opened, handleOpen }: SidebarProps) {
  const { classes } = useStyles();
  const router = useRouter();
  const matches = useMediaQuery(`(min-width: 900px)`);

  const isActive = (link: string) => router.pathname === link;

  const renderLinks = appLinks.map((item) => (
    <Box
      key={item.label}
      p='md'
      onClick={() => router.push(item.path)}
      className={classes.linkItem}
      sx={(theme) => ({
        opacity: isActive(item.path) ? 1 : 0.5,
        background: isActive(item.path) ? theme.colors.dark[6] : 'transparent',
      })}
    >
      <Box className={classes.linkItemIconWrapper}>
        {item.icon}
        <Box>
          <Text sx={{ fontSize: 14 }}>{item.label}</Text>
        </Box>
      </Box>
    </Box>
  ));

  return (
    <Navbar
      hiddenBreakpoint='md'
      hidden={!opened}
      width={{ sm: 300, lg: 300 }}
      p='md'
      fixed
      position={{ top: 0, left: 0 }}
    >
      <Navbar.Section>
        <Box sx={{ display: 'flex', gap: 16 }} p={16}>
          <Leaf />
          <Text sx={{ fontSize: 14, fontWeight: 700 }}>Monoxide</Text>
        </Box>
      </Navbar.Section>
      <Navbar.Section grow>{renderLinks}</Navbar.Section>

      <Navbar.Section>
        <Group grow>
          <Menu
            withArrow
            placement='center'
            control={
              <UserButton
                data={{
                  name: 'Muhammad Bhaska',
                  avatar: 'https:/github.com/mhmdbhsk.png',
                  role: 1,
                }}
              />
            }
          >
            <Menu.Item icon={<Logout size={14} />}>Sign Out</Menu.Item>
          </Menu>
        </Group>
      </Navbar.Section>
    </Navbar>
  );
}

UserButton.displayName = 'UserButton';
