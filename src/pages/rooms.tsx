import AppLayout from "@/components/layout/AppLayout";
import RoomAddModal from "@/components/RoomAddModal";
import RoomsTable from "@/components/RoomsTable";
import { roomsService } from "@/services/rooms";
import { Box, Button, createStyles, Skeleton, Text } from "@mantine/core";
import React, { useState } from "react";
import useSWR from "swr";
import { Plus } from "tabler-icons-react";
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
  const [roomAddModalOpened, setRoomAddModalOpened] = useState<boolean>(false);

  const handleOpen = () => setRoomAddModalOpened((prevState) => !prevState);

  const { data: ListRoomsData, error } = useSWR(
    "rooms_list",
    roomsService.getListRooms
  );

  return (
    <AppLayout
      title="Rooms"
      headingCustom={
        <Button
          leftIcon={<Plus size={14} />}
          onClick={handleOpen}
          variant={theme.colorScheme === "dark" ? "light" : "filled"}
          color="grape"
        >
          Add Device
        </Button>
      }
    >
      <RoomAddModal opened={roomAddModalOpened} handleOpen={handleOpen} />
      <Box className={classes.contentWrapper}>
        {!ListRoomsData ? (
          <Skeleton width="100%" height={32} />
        ) : ListRoomsData.length === 0 ? (
          <Text>No rooms found</Text>
        ) : (
          <RoomsTable
            data={ListRoomsData as ResponseListRooms}
            editModal={() => console.log("Edit")}
          />
        )}
      </Box>
    </AppLayout>
  );
};

export default Rooms;
