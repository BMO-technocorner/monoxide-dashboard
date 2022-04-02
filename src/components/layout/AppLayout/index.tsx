import { useEffect, useState } from "react";
import { AppShell, Box, Container, createStyles, Text } from "@mantine/core";
import Sidebar from "./Sidebar";
import { ReactNode } from "react";
import { useMediaQuery } from "@mantine/hooks";
import Header from "./Header";
import PrivateRoute from "@/components/PrivateRoute";
import axiosClient from "@/config/axios";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/router";

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
  photo: string;
  token: string;
};

export default function AppLayout({
  children,
  title,
  headingCustom,
}: AppLayoutProps) {
  const largeScreen = useMediaQuery("(min-width: 1000px)");
  const [opened, setOpened] = useState(false);
  const { classes } = useStyles();

  //#region  //*=========== COMMONS ===========
  const protectedRoutes = ["/myevents"];
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { query, pathname } = router;
  //#endregion  //*======== COMMONS ===========

  //#region  //*=========== STORE ===========
  const login = useAuthStore.useLogin();
  const stopLoading = useAuthStore.useStopLoading();
  //#endregion  //*======== STORE ===========

  useEffect(() => {
    const loadUser = async () => {
      try {
        if (query.token) {
          localStorage.setItem("token", query.token as string);
        }
        const token = localStorage.getItem("token");

        if (token === null || token === undefined) {
          return;
        }

        if (query.token) {
          router.replace(pathname, undefined, { shallow: true });
        }

        const res = await axiosClient.get<AuthApi>("/auth0-endpoints/info");

        login({
          id: res.data.data.id,
          name: res.data.data.name,
          photo: res.data.data.photo,
          token: token + "",
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("error context", err);
        localStorage.removeItem("token");
      } finally {
        stopLoading();
      }
    };

    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const handleOpen = () => setOpened((o) => !o);

  return (
    <PrivateRoute protectedRoutes={protectedRoutes}>
      <AppShell
        navbar={<Sidebar opened={opened} />}
        header={<Header opened={opened} handleOpen={handleOpen} />}
      >
        <Container size="md" className={classes.container}>
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
