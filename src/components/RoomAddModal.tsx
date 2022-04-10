import { roomsService } from "@/services/rooms";
import {
  Anchor,
  Button,
  Center,
  createStyles,
  Group,
  Modal,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useState } from "react";
import { mutate } from "swr";
import { z } from "zod";

const addRoomsSchema = z.object({
  name: z.string().nonempty().min(2, "Room name must be 2 character or more"),
});

type RoomAddModalProps = {
  opened: boolean;
  handleOpen: (v: "edit" | "add" | null) => void;
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

export default function RoomAddModal({
  opened,
  handleOpen,
}: RoomAddModalProps) {
  const { classes } = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const theme = useMantineTheme();
  const form = useForm({
    schema: zodResolver(addRoomsSchema),
    initialValues: {
      name: "",
    },
  });

  const handleAddRoom = async (values: any) => {
    setIsLoading(true);
    try {
      const res = await roomsService.addRoom(values);

      form.reset();

      mutate("rooms_list");

      setIsLoading(false);
      handleOpen(null);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={() => handleOpen(null)}
      title="Create New Room"
      centered
    >
      <form onSubmit={form.onSubmit(handleAddRoom)} className={classes.form}>
        <TextInput
          required
          label="Rooms Name"
          placeholder="Dad Office"
          classNames={classes}
          {...form.getInputProps("name")}
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
