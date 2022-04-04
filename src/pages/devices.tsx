import { DevicesModalType } from "@/components/DevicesModal";
import { DevicesData } from "@/constants/devices-data";
import { Box, Button, Grid, createStyles } from "@mantine/core";
import { useModals } from "@mantine/modals";
import { useState } from "react";
import { Plus } from "tabler-icons-react";
import AppLayout from "@/components/layout/AppLayout";
import DeviceAddForm from "@/components/DeviceAddForm";
import DeviceAddMaps from "@/components/DeviceAddMaps";
import DeviceCard from "@/components/DeviceCard";

type DevicesProps = {};

const useStyles = createStyles({
  contentWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },

  cardWrapper: {
    position: "relative",
    display: "flex",
    flexGrow: 1,
  },
});

const Devices = ({}: DevicesProps) => {
  const { classes, theme } = useStyles();
  const modals = useModals();
  const [opened, setOpened] = useState<DevicesModalType>(null);

  const handleOpen = (v: DevicesModalType) => setOpened(v);

  const openAddDeviceModal = () =>
    modals.openConfirmModal({
      title: "Input Device Information",
      closeOnConfirm: false,
      labels: { confirm: "Next", cancel: "Cancel" },
      confirmProps: {
        color: "grape",
        variant: theme.colorScheme === "dark" ? "light" : "filled",
      },
      centered: true,
      children: <DeviceAddForm />,
      onConfirm: () =>
        modals.openConfirmModal({
          title: "Input Device Location",
          labels: { confirm: "Finish", cancel: "Back" },
          confirmProps: {
            color: "grape",
            variant: theme.colorScheme === "dark" ? "light" : "filled",
          },
          closeOnConfirm: false,
          centered: true,
          children: <DeviceAddMaps />,
          onConfirm: () => modals.closeAll(),
        }),
    });

  return (
    <AppLayout
      title="Devices"
      headingCustom={
        <Button
          leftIcon={<Plus size={14} />}
          onClick={openAddDeviceModal}
          variant={theme.colorScheme === "dark" ? "light" : "filled"}
          color="grape"
        >
          Add Device
        </Button>
      }
    >
      <Box className={classes.contentWrapper}>
        <Grid>
          {DevicesData.map((device) => (
            <Grid.Col lg={4} md={6} xs={6} key={device.id}>
              <Box className={classes.cardWrapper}>
                <DeviceCard device={device} handleOpen={handleOpen} />
              </Box>
            </Grid.Col>
          ))}
        </Grid>
      </Box>
    </AppLayout>
  );
};

export default Devices;
