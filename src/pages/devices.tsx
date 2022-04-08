import { Box, Button, Grid, createStyles, Skeleton, Text } from "@mantine/core";
import { useState } from "react";
import { Plus } from "tabler-icons-react";
import AppLayout from "@/components/layout/AppLayout";
import DeviceCard from "@/components/DeviceCard";
import useSWR from "swr";
import { devicesService } from "@/services/devices";
import { Device } from "@/types/devices";
import DeviceAddModal from "@/components/DeviceAddModal";
import { roomsService } from "@/services/rooms";
import { ResponseListRooms } from "@/types/rooms";
import DeviceDetailModal from "@/components/DeviceDetailModal";
import DeviceEditModal from "@/components/DeviceEditModal";

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
  const [modalOpened, setModalOpened] = useState<
    "edit" | "details" | "add" | null
  >(null);

  const handleOpen = (v: "edit" | "details" | "add" | null) =>
    setModalOpened(v);

  const { data: ListDevicesData } = useSWR(
    "devices_list",
    devicesService.getListDevices,
    { refreshInterval: 30000 }
  );

  const { data: ListRoomsData, error } = useSWR(
    "rooms_list",
    roomsService.getListRooms
  );

  return (
    <AppLayout
      title="Devices"
      headingCustom={
        <Button
          leftIcon={<Plus size={14} />}
          onClick={() => handleOpen("add")}
          variant={theme.colorScheme === "dark" ? "light" : "filled"}
          color="grape"
        >
          Add Device
        </Button>
      }
    >
      <DeviceAddModal
        opened={modalOpened === "add"}
        handleOpen={handleOpen}
        roomsData={ListRoomsData as ResponseListRooms}
      />
      <DeviceEditModal
        opened={modalOpened === "edit"}
        handleOpen={handleOpen}
        roomsData={ListRoomsData as ResponseListRooms}
      />
      <DeviceDetailModal
        opened={modalOpened === "details"}
        handleOpen={handleOpen}
      />

      <Box className={classes.contentWrapper}>
        {!ListDevicesData ? (
          <Grid>
            <Grid.Col lg={4} md={6} xs={6}>
              <Skeleton height={150} width="100%" radius="md" />
            </Grid.Col>
            <Grid.Col lg={4} md={6} xs={6}>
              <Skeleton height={150} width="100%" radius="md" />
            </Grid.Col>
          </Grid>
        ) : ListDevicesData.length === 0 ? (
          <Text size="xs">No device found</Text>
        ) : (
          <Grid>
            {ListDevicesData.map((device: Device) => (
              <Grid.Col lg={4} md={6} xs={6} key={device.id}>
                <Box className={classes.cardWrapper}>
                  <DeviceCard data={device} handleOpen={handleOpen} />
                </Box>
              </Grid.Col>
            ))}
          </Grid>
        )}
      </Box>
    </AppLayout>
  );
};

export default Devices;
