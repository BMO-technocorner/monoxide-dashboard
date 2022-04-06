import React, { forwardRef } from "react";
import {
  Navbar,
  Box,
  Avatar,
  Text,
  createStyles,
  Menu,
  UnstyledButton,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Logout, Settings } from "tabler-icons-react";
import { useRouter } from "next/router";
import { appLinks } from "@/config/navigation";
import { useAuthDispatch, useAuthState } from "@/store/AuthContext";
import { removeCookies } from "cookies-next";

type SidebarProps = {
  opened: boolean;
};

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
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[2]
          : theme.colors.dark[4],
      background:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[1],
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
    background:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[2],
    border: `1px solid ${theme.colorScheme === "dark" ? "#2C2E33" : "none"}`,
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

  linkLabel: {
    fontSize: 12,

    [theme.fn.largerThan(1000)]: {
      fontSize: 14,
    },
  },
}));

const UserButton = forwardRef<HTMLButtonElement>(({ ...others }, ref) => {
  const { classes } = useStyles();
  const { user, loading } = useAuthState();

  return (
    <UnstyledButton
      ref={ref}
      px="md"
      className={classes.userButtonWrapper}
      {...others}
    >
      <Avatar
        alt={user.name}
        radius={"xl"}
        size="md"
        sx={{ textTransform: "uppercase" }}
      >
        {user.name.split(" ").slice(0, 2)[0]?.substring(0, 1)}
        {user.name.split(" ").slice(0, 2)[1]?.substring(0, 1)}
      </Avatar>
      <Box className={classes.userButtonTextWrapper}>
        <Text className={classes.userButtonName}>{user.name}</Text>
        <Text className={classes.userButtonRole}>
          {user.role === "CLIENT" ? "User" : "Observer"}
        </Text>
      </Box>
    </UnstyledButton>
  );
});

export default function Sidebar({ opened }: SidebarProps) {
  const { classes, theme } = useStyles();
  const router = useRouter();
  const largeScreen = useMediaQuery("(min-width: 1000px)");
  const dispatch = useAuthDispatch();

  const isActive = (link: string) => router.pathname === link;

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    removeCookies("user");
    removeCookies("token");
  };

  const renderLinks = appLinks.map((item) => (
    <Box
      key={item.label}
      p="md"
      onClick={() => router.push(item.path)}
      className={classes.linkItem}
      sx={(theme) => ({
        background:
          theme.colorScheme === "dark"
            ? isActive(item.path)
              ? theme.colors.dark[6]
              : "transparent"
            : isActive(item.path)
            ? theme.colors.gray[2]
            : "transparent",
        color:
          theme.colorScheme === "dark"
            ? isActive(item.path)
              ? theme.colors.dark[1]
              : theme.colors.dark[3]
            : isActive(item.path)
            ? theme.colors.dark[3]
            : theme.colors.dark[1],
      })}
    >
      <Box className={classes.linkItemIconWrapper}>
        {item.icon}
        <Text className={classes.linkLabel}>{item.label}</Text>
      </Box>
    </Box>
  ));

  return (
    <Navbar
      hiddenBreakpoint={1000}
      hidden={!opened}
      width={{ xs: "100%", sm: 300, lg: 300 }}
      p="md"
      fixed
      position={{ top: 0, left: 0 }}
    >
      <Navbar.Section
        grow
        sx={{ display: "flex", flexDirection: "column", gap: 5 }}
      >
        {renderLinks}
      </Navbar.Section>

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
                avatar: "https://github.com/mhmdbhsk.png",
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
