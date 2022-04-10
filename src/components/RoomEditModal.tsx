import {
  Button,
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
import { useRouter } from "next/router";
import { getQueryVariable } from "@/lib/helper";
import { roomsService } from "@/services/rooms";

const editRoomSchema = z.object({
  name: z.string().nonempty().min(2, "Device name must be 2 character or more"),
});

type RoomEditModalProps = {
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

export default function RoomEditModal({
  opened,
  handleOpen,
}: RoomEditModalProps) {
  const { classes } = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const id = getQueryVariable("id");
  const theme = useMantineTheme();
  const form = useForm({
    schema: zodResolver(editRoomSchema),
    initialValues: {
      name: "",
    },
  });

  const handleEditDevice = async (values: any) => {
    setIsLoading(true);
    try {
      console.log(values);

      const res = await roomsService.editRoom(id as string, values);

      console.log(res);

      form.reset();

      mutate("rooms_list");

      setIsLoading(false);
      handleOpen(null);
      router.push(`/rooms`, undefined, {
        shallow: true,
      });
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={() => {
        router.push(`/rooms`, undefined, {
          shallow: true,
        });
        handleOpen(null);
      }}
      title="Edit Room"
      centered
    >
      <form onSubmit={form.onSubmit(handleEditDevice)} className={classes.form}>
        <TextInput
          required
          label="Room Name"
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
            Edit Room
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
