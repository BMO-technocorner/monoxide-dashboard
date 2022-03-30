import DeviceAddForm from "@/components/DeviceAddForm";
import DeviceCard from "@/components/DeviceCard";
import { DevicesModalType } from "@/components/DevicesModal";
import AppLayout from "@/components/layout/AppLayout";
import { DevicesData } from "@/constants/devices-data";
import {
  Badge,
  Box,
  Button,
  Card,
  Grid,
  Image,
  Text,
  Tooltip,
  createStyles,
} from "@mantine/core";
import { useModals } from "@mantine/modals";
import React, { useState } from "react";
import { Plus } from "tabler-icons-react";

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
  const { classes } = useStyles();
  const modals = useModals();
  const [opened, setOpened] = useState<DevicesModalType>(null);

  const handleOpen = (v: DevicesModalType) => setOpened(v);

  const openAddDeviceModal = () =>
    modals.openConfirmModal({
      title: "Input Device Information",
      closeOnConfirm: false,
      labels: { confirm: "Next", cancel: "Cancel" },
      centered: true,
      children: <DeviceAddForm />,
      onConfirm: () =>
        modals.openConfirmModal({
          title: "This is modal at second layer",
          labels: { confirm: "Close modal", cancel: "Back" },
          closeOnConfirm: false,
          centered: true,
          children: (
            <Text size="sm">
              When this modal is closed modals state will revert to first modal
            </Text>
          ),
          onConfirm: () => modals.closeAll(),
        }),
    });

  return (
    <AppLayout
      title="Devices"
      headingCustom={
        <Button leftIcon={<Plus size={14} />} onClick={openAddDeviceModal}>
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
