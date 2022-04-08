import { Device } from "@/types/devices";
import { Button, createStyles, Group, Modal, Text } from "@mantine/core";
import { useRouter } from "next/router";

type DeviceDetailModalProps = {
  opened: boolean;
  handleOpen: (v: "edit" | "details" | "add" | null) => void;
};

const useStyles = createStyles((theme) => ({
  control: {
    [theme.fn.smallerThan("xs")]: {
      width: "100%",
      textAlign: "center",
    },
  },
}));

export default function DeviceDetailModal({
  opened,
  handleOpen,
}: DeviceDetailModalProps) {
  const { classes, theme } = useStyles();
  const router = useRouter();

  return (
    <Modal
      opened={opened}
      onClose={() => {
        router.push(`/devices`, undefined, {
          shallow: true,
        });
        handleOpen(null);
      }}
      title="Device Details"
      centered
    >
      <Text>Test</Text>

      <Group position="right">
        <Button
          type="submit"
          className={classes.control}
          variant={theme.colorScheme === "dark" ? "light" : "filled"}
          color="grape"
          onClick={() => {
            handleOpen("edit");
          }}
        >
          Edit Device
        </Button>
      </Group>
    </Modal>
  );
}
