import { useRouter } from "next/router";
import * as React from "react";

import useAuthStore from "@/store/useAuthStore";
import { Container, Loader, Text } from "@mantine/core";

type PrivateRouteProps = {
  protectedRoutes: string[];
  children: JSX.Element;
};

export default function PrivateRoute({
  protectedRoutes,
  children,
}: PrivateRouteProps) {
  const router = useRouter();

  //#region  //*=========== STORE ===========
  const isAuthenticated = useAuthStore.useIsAuthenticated();
  const isLoading = useAuthStore.useIsLoading();
  //#endregion  //*======== STORE ===========

  const isProtected = protectedRoutes.indexOf(router.pathname) !== -1;

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated && isProtected) {
      router.push("/auth/signin");
    }
  }, [isLoading, isAuthenticated, isProtected, router]);

  if ((isLoading || !isAuthenticated) && isProtected) {
    return (
      <Container
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <Loader color="grape" />
        <Text>Loading</Text>
      </Container>
    );
  }

  return children;
}
