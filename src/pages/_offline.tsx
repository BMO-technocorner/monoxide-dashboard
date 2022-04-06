import { Container, Text } from "@mantine/core";
import { WifiOff } from "tabler-icons-react";

const Offline = () => (
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
    <WifiOff />
    <Text size={"md"}>You&apos;re currently offline!</Text>
    <Text size={"sm"}>Connect to internet before using this app.</Text>
  </Container>
);

export default Offline;
