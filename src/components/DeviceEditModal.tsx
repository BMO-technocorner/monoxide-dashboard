import { devicesService } from "@/services/devices";
import {
  Button,
  createStyles,
  Group,
  Modal,
  Select,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useState } from "react";
import { mutate } from "swr";
import { z } from "zod";
import { useRouter } from "next/router";
import { ResponseListRooms } from "@/types/rooms";
import { getQueryVariable } from "@/lib/helper";

const editDeviceSchema = z.object({
  name: z.string().nonempty().min(2, "Device name must be 2 character or more"),
  roomId: z.number().positive(),
});

type DeviceEditModalProps = {
  roomsData: ResponseListRooms;
  opened: boolean;
  handleOpen: (v: "edit" | "details" | "add" | null) => void;
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

export default function DeviceEditModal({
  roomsData,
  opened,
  handleOpen,
}: DeviceEditModalProps) {
  const { classes } = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const id = getQueryVariable("id");
  const theme = useMantineTheme();
  const form = useForm({
    schema: zodResolver(editDeviceSchema),
    initialValues: {
      roomId: "",
      name: "",
    },
  });

  const handleEditDevice = async (values: any) => {
    setIsLoading(true);
    try {
      console.log(values);

      const res = await devicesService.editDevice(id as string, values);

      console.log(res);

      form.reset();

      mutate("devices_list");

      setIsLoading(false);
      handleOpen(null);
      router.push(`/devices`, undefined, {
        shallow: true,
      });
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      router.push(`/devices`, undefined, {
        shallow: true,
      });
    }
  };

  const roomList = roomsData?.map((room) => ({
    value: room.id,
    label: room.name,
  }));

  return (
    <Modal
      opened={opened}
      onClose={() => {
        router.push(`/devices`, undefined, {
          shallow: true,
        });
        handleOpen(null);
      }}
      title="Edit Device"
      centered
    >
      <form onSubmit={form.onSubmit(handleEditDevice)} className={classes.form}>
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
          data={roomList ? roomList : []}
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
            Edit Device
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
