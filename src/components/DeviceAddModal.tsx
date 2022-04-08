import { devicesService } from "@/services/devices";
import { roomsService } from "@/services/rooms";
import {
  Anchor,
  Button,
  Center,
  createStyles,
  Group,
  Modal,
  Select,
  SelectItem,
  Text,
  TextInput,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import { InfoCircle } from "tabler-icons-react";
import { z } from "zod";
import { ResponseListRooms } from "../types/rooms";

const addRoomsSchema = z.object({
  name: z.string().nonempty().min(2, "Device name must be 2 character or more"),
  uid: z.string().nonempty().min(2, "Device uid must be 36 character or more"),
  roomId: z.number().positive(),
});

type DeviceAddModalProps = {
  opened: boolean;
  handleOpen: () => void;
};

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
  },

  input: {
    height: "auto",
    paddingTop: 18,
  },

  label: {
    position: "absolute",
    pointerEvents: "none",
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: theme.spacing.sm / 2,
    zIndex: 1,
  },

  form: {
    maxWidth: 400,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      width: "100%",
      textAlign: "center",
    },
  },
}));

export default function DeviceAddModal({
  opened,
  handleOpen,
}: DeviceAddModalProps) {
  const { classes } = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const theme = useMantineTheme();
  const form = useForm({
    schema: zodResolver(addRoomsSchema),
    initialValues: {
      uid: "",
      roomId: "",
      name: "",
    },
  });
  const { data: ListRoomsData, error } = useSWR(
    "rooms_list",
    roomsService.getListRooms
  );

  const handleAddRoom = async (values: any) => {
    setIsLoading(true);
    try {
      console.log(values);

      const res = await devicesService.addDevice(values);

      form.reset();

      mutate("devices_list");

      setIsLoading(false);
      handleOpen();
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  const data = ListRoomsData?.flatMap((room) => ({
    value: room.id,
    label: room.name,
  }));

  return (
    <Modal
      opened={opened}
      onClose={handleOpen}
      title="Create New Room"
      centered
    >
      <form onSubmit={form.onSubmit(handleAddRoom)} className={classes.form}>
        <TextInput
          required
          rightSection={
            <Tooltip
              label="Device ID shown at the bottom of the device"
              placement="end"
              withArrow
              transition="pop-bottom-right"
            >
              <Text color="dimmed" sx={{ cursor: "help" }}>
                <Center>
                  <InfoCircle size={18} />
                </Center>
              </Text>
            </Tooltip>
          }
          label="Device ID"
          placeholder="37981102-8f04..."
          classNames={classes}
          {...form.getInputProps("uid")}
        />
        <TextInput
          required
          label="Device Name"
          placeholder="Dad Office"
          classNames={classes}
          {...form.getInputProps("name")}
        />
        <Select
          required
          // @ts-ignore
          data={data}
          label="Device Location"
          placeholder="Dad Office"
          classNames={classes}
          {...form.getInputProps("roomId")}
        />
        <Group position="right">
          <Button
            type="submit"
            className={classes.control}
            loading={isLoading}
            variant={theme.colorScheme === "dark" ? "light" : "filled"}
            color="grape"
          >
            Add Room
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
