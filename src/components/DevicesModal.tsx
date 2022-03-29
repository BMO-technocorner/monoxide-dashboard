import { Box, Button, Group, Modal, Text } from "@mantine/core";
import { Check, PhoneCalling, X } from "tabler-icons-react";

export type DevicesModalType = "edit" | null;

type DevicesModalProps = {
  opened: DevicesModalType;
  handleOpen: (v: DevicesModalType) => void;
};

export default function DevicesModal({
  opened,
  handleOpen,
}: DevicesModalProps) {
  return (
    <Modal
      opened={opened !== null}
      onClose={() => handleOpen(null)}
      title={"Edit Device"}
      centered
    >
      Test Modal
    </Modal>
  );
}
