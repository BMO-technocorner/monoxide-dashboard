import { Box, Button, Group, Modal, useMantineTheme } from "@mantine/core";
import { PhoneCalling } from "tabler-icons-react";

export type ReportModalType = "contact" | "resolve" | "details" | null;

type ReportModalProps = {
  opened: ReportModalType;
  handleOpen: (v: ReportModalType) => void;
};

export default function ReportModal({ opened, handleOpen }: ReportModalProps) {
  const theme = useMantineTheme();

  return (
    <Modal
      opened={opened !== null}
      onClose={() => handleOpen(null)}
      title={opened === "contact" ? "Call emergency contact" : "Resolve report"}
      centered
    >
      {opened === "contact" && (
        <Box>
          <Group grow direction="column">
            <Button
              color="red"
              variant={theme.colorScheme === "dark" ? "light" : "filled"}
              leftIcon={<PhoneCalling size={14} />}
              size={"xs"}
            >
              Call the authorities
            </Button>
            <Button
              color="red"
              variant={theme.colorScheme === "dark" ? "light" : "filled"}
              leftIcon={<PhoneCalling size={14} />}
              size={"xs"}
            >
              Call the nearest emergency contact
            </Button>
          </Group>
        </Box>
      )}
    </Modal>
  );
}
