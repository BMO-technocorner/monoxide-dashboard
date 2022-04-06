import { useState } from "react";
import { AppShell, Box, Container, createStyles, Text } from "@mantine/core";
import Sidebar from "./Sidebar";
import { ReactNode } from "react";
import Header from "./Header";
import PrivateRoute from "@/components/PrivateRoute";
import { UserRole } from "@/types/profile";

type AppLayoutProps = {
  children: ReactNode;
  title?: string;
  headingCustom?: ReactNode;
};

const useStyles = createStyles((theme) => ({
  titleText: {
    fontSize: 24,
    fontWeight: 700,
    letterSpacing: theme.other.letterSpacing.trackingTight,
    marginBottom: 24,
  },

  headingWrapper: {
    display: "flex",
    justifyContent: "space-between",
  },

  container: {
    paddingLeft: 0,
    marginTop: 78,

    [theme.fn.largerThan(1000)]: {
      paddingLeft: 324,
    },
  },
}));

export interface AuthApi {
  code: number;
  status: string;
  data: User;
}

export type User = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  updatedAt: string;
  createdAt: string;
  token: string;
  tokenExpiredIn: string;
};

export default function AppLayout({
  children,
  title,
  headingCustom,
}: AppLayoutProps) {
  const [opened, setOpened] = useState(false);
  const { classes } = useStyles();
  const protectedRoutes = ["/", "/users", "/settings", "/devices", "/report"];

  const handleOpen = () => setOpened((o) => !o);

  return (
    <PrivateRoute protectedRoutes={protectedRoutes}>
      <AppShell
        navbar={<Sidebar opened={opened} />}
        header={<Header opened={opened} handleOpen={handleOpen} />}
      >
        <Container size="lg" className={classes.container}>
          {title && (
            <Box className={classes.headingWrapper}>
              <Text className={classes.titleText}>{title}</Text>
              {headingCustom}
            </Box>
          )}
          {children}
        </Container>
      </AppShell>
    </PrivateRoute>
  );
}
