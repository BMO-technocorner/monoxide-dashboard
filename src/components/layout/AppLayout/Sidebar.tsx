import React, { forwardRef } from "react";
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
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  ChevronRight,
  Leaf,
  Logout,
  Settings,
  SwitchHorizontal,
} from "tabler-icons-react";
import { useRouter } from "next/router";
import { appLinks } from "@/config/navigation";

type SidebarProps = {
  opened: boolean;
};

type UserButtonProps = {
  data: {
    name: string;
    avatar: string;
    role: 1 | 2 | 3;
  };
} & UnstyledButtonProps;

const userButtonLinks = [
  {
    id: 1,
    path: "/settings",
    title: "Settings",
    icon: <Settings size={14} />,
  },
  {
    id: 2,
    path: "/logout",
    title: "Logout",
    icon: <Logout size={14} />,
  },
];

const useStyles = createStyles((theme) => ({
  linkItem: {
    display: "flex",
    cursor: "pointer",
    gap: 16,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 8,

    "&:hover": {
      opacity: 1,
      backgroundColor: "#111",
    },
  },

  linkItemIconWrapper: {
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
    gap: 16,
  },

  userButtonWrapper: {
    display: "flex",
    cursor: "pointer",
    gap: 16,
    alignItems: "center",
    height: 72,
    width: "100%",
    borderRadius: 8,
    backgroundColor: theme.colors.dark[5],
  },

  userButtonTextWrapper: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "column",
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
  ({ data, ...others }: UserButtonProps, ref) => {
    const { classes } = useStyles();

    return (
      <UnstyledButton
        ref={ref}
        px="md"
        className={classes.userButtonWrapper}
        {...others}
      >
        <Avatar
          alt={data.name}
          src={data.avatar}
          radius={"xl"}
          size="md"
        ></Avatar>
        <Box className={classes.userButtonTextWrapper}>
          <Text className={classes.userButtonName}>{data.name}</Text>
          <Text className={classes.userButtonRole}>
            {data.role === 1
              ? "Administrator"
              : data.role === 2
              ? "Observer"
              : "User"}
          </Text>
        </Box>
      </UnstyledButton>
    );
  }
);

export default function Sidebar({ opened }: SidebarProps) {
  const { classes } = useStyles();
  const router = useRouter();
  const largeScreen = useMediaQuery("(min-width: 1000px)");

  const isActive = (link: string) => router.pathname === link;

  const handleLogout = () => {
    router.push("/auth/signin");
    console.log("Logout berhasil");
  };

  const renderLinks = appLinks.map((item) => (
    <Box
      key={item.label}
      p="md"
      onClick={() => router.push(item.path)}
      className={classes.linkItem}
      sx={(theme) => ({
        opacity: isActive(item.path) ? 1 : 0.5,
        background: isActive(item.path) ? theme.colors.dark[8] : "transparent",
      })}
    >
      <Box className={classes.linkItemIconWrapper}>
        {item.icon}
        <Text size={largeScreen ? "sm" : "xs"}>{item.label}</Text>
      </Box>
    </Box>
  ));

  return (
    <Navbar
      hiddenBreakpoint="md"
      hidden={!opened}
      width={{ xs: "100%", sm: 300, lg: 300 }}
      p="md"
      fixed
      position={{ top: 0, left: 0 }}
    >
      <Navbar.Section grow>{renderLinks}</Navbar.Section>

      <Navbar.Section>
        <Menu
          withArrow
          transition="fade"
          transitionDuration={200}
          sx={{ width: "100%" }}
          position={largeScreen ? "right" : "top"}
          placement={largeScreen ? "end" : "center"}
          control={
            <UserButton
              data={{
                name: "Muhammad Bhaska",
                avatar: "https:/github.com/mhmdbhsk.png",
                role: 1,
              }}
            />
          }
        >
          <Menu.Label>Account</Menu.Label>
          {userButtonLinks.map((link) => (
            <Menu.Item
              key={link.id}
              icon={link.icon}
              onClick={() =>
                link.path === "/logout"
                  ? handleLogout()
                  : router.push(link.path)
              }
            >
              {link.title}
            </Menu.Item>
          ))}
        </Menu>
      </Navbar.Section>
    </Navbar>
  );
}

UserButton.displayName = "UserButton";
