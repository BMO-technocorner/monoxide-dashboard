import AppLayout from "@/components/layout/AppLayout";
import RoomAddModal from "@/components/RoomAddModal";
import RoomAddForm from "@/components/RoomAddModal";
import RoomsTable from "@/components/RoomsTable";
import { roomsService } from "@/services/rooms";
import {
  Box,
  Button,
  createStyles,
  Skeleton,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useModals } from "@mantine/modals";
import React, { useState } from "react";
import useSWR, { mutate } from "swr";
import { Plus } from "tabler-icons-react";
import { z } from "zod";
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
  const [roomAddOpened, setRoomAddOpened] = useState<boolean>(false);

  const handleOpen = () => setRoomAddOpened((prevState) => !prevState);

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
      <RoomAddModal opened={roomAddOpened} handleOpen={handleOpen} />
      <Box className={classes.contentWrapper}>
        {ListRoomsData ? (
          <RoomsTable
            data={ListRoomsData as ResponseListRooms}
            editModal={() => console.log("Edit")}
          />
        ) : (
          <Skeleton width="100%" height={32} />
        )}
      </Box>
    </AppLayout>
  );
};

export default Rooms;
