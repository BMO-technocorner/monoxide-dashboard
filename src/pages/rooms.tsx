import AppLayout from "@/components/layout/AppLayout";
import RoomsTable from "@/components/RoomsTable";
import { roomsService } from "@/services/rooms";
import { Box, Button, createStyles, Text } from "@mantine/core";
import { useModals } from "@mantine/modals";
import React from "react";
import useSWR from "swr";
import { List, Plus } from "tabler-icons-react";
import { ResponseListRooms } from "../types/rooms";

type RoomsProps = {};

const useStyles = createStyles({
  contentWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
});

const Rooms = ({}: RoomsProps) => {
  const { classes, theme } = useStyles();
  const modals = useModals();
  const { data: ListRoomsData, error } = useSWR(
    "rooms_list",
    roomsService.getListRooms
  );

  console.log(ListRoomsData);

  const openAddDeviceModal = () =>
    modals.openConfirmModal({
      title: "Add Rooms Information",
      closeOnConfirm: false,
      labels: { confirm: "Next", cancel: "Cancel" },
      confirmProps: {
        color: "grape",
        variant: theme.colorScheme === "dark" ? "light" : "filled",
      },
      centered: true,
      children: <Text>Test</Text>,
      onConfirm: () => modals.closeAll(),
    });

  return (
    <AppLayout
      title="Rooms"
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
        <RoomsTable data={ListRoomsData as ResponseListRooms} />
      </Box>
    </AppLayout>
  );
};

export default Rooms;
