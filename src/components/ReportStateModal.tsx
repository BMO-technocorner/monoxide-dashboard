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
import { getQueryVariable } from "@/lib/helper";
import { reportsService } from "@/services/reports";

const editDeviceSchema = z.object({
  message: z.string(),
});

type ReportStateModalProps = {
  opened: "accept" | "reject" | null;
  handleOpen: (v: "accept" | "reject" | null) => void;
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

export default function ReportStateModal({
  opened,
  handleOpen,
}: ReportStateModalProps) {
  const { classes } = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const id = getQueryVariable("id");
  const theme = useMantineTheme();
  const form = useForm({
    schema: zodResolver(editDeviceSchema),
    initialValues: {
      message: "",
    },
  });

  const handleChangeStatusReport = async (values: any) => {
    setIsLoading(true);
    try {
      const res = await reportsService.editReport(id as string, {
        ...values,
        status: opened === "accept" ? "ACCEPTED" : "CLOSED",
      });

      console.log(res);

      form.reset();

      mutate("reports_list");

      setIsLoading(false);
      handleOpen(null);
      router.push(`/reports`, undefined, {
        shallow: true,
      });
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    <Modal
      opened={opened === "accept" || opened === "reject"}
      onClose={() => {
        router.push(`/reports`, undefined, {
          shallow: true,
        });
        handleOpen(null);
      }}
      title={opened === "accept" ? "Accept Report" : "Reject Report"}
      centered
    >
      <form
        onSubmit={form.onSubmit(handleChangeStatusReport)}
        className={classes.form}
      >
        <TextInput
          label="Resolve Message"
          placeholder="The smell of gas can be smelled..."
          classNames={classes}
          {...form.getInputProps("message")}
        />
        <Group position="right">
          <Button
            className={classes.control}
            loading={isLoading}
            variant="outline"
            onClick={() => handleOpen(null)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className={classes.control}
            loading={isLoading}
            variant={theme.colorScheme === "dark" ? "light" : "filled"}
            color="grape"
          >
            Confirm
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
