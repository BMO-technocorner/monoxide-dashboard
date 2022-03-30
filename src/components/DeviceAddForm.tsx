import {
  Box,
  Button,
  Center,
  createStyles,
  Group,
  Modal,
  Select,
  Text,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { InfoCircle } from "tabler-icons-react";

type DeviceAddFormProps = {};

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
}));

export default function DeviceAddForm({}: DeviceAddFormProps) {
  const { classes } = useStyles();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <TextInput
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
        placeholder="monoxide-001"
        classNames={classes}
      />

      <TextInput
        label="Device Name"
        placeholder="Dad Office"
        classNames={classes}
      />
    </Box>
  );
}
