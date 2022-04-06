import { useEffect } from "react";
import { useRouter } from "next/router";
import { Container, Loader, Text } from "@mantine/core";
import { useAuthState } from "@/store/AuthContext";

type PrivateRouteProps = {
  protectedRoutes: Array<string>;
  children: React.ReactNode;
};

export default function PrivateRoute({
  protectedRoutes,
  children,
}: PrivateRouteProps) {
  const router = useRouter();
  const { authenticated, loading } = useAuthState();

  const pathIsProtected = protectedRoutes.indexOf(router.pathname) !== -1;

  useEffect(() => {
    if (!loading && !authenticated && pathIsProtected) {
      // Redirect route, you can point this to /login
      router.push("/auth/signin");
    }
  }, [loading, authenticated, pathIsProtected, router]);

  if ((loading || !authenticated) && pathIsProtected) {
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

  return <>{children}</>;
}
