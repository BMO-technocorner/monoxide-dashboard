import { Container, Text } from "@mantine/core";

const Offline = () => (
  <Container size="md">
    <Text size={"md"}>You&apos;re currently offline!</Text>
    <Text size={"sm"}>Connect to internet before using this app.</Text>
  </Container>
);

export default Offline;
