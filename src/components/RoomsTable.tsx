import { useState } from "react";
import {
  Table,
  ScrollArea,
  Group,
  Text,
  ActionIcon,
  Menu,
} from "@mantine/core";
import { Pencil, Trash } from "tabler-icons-react";
import { ResponseListRooms } from "@/types/rooms";
import { roomsService } from "@/services/rooms";
import { mutate } from "swr";
import { showNotification, updateNotification } from "@mantine/notifications";
import { useRouter } from "next/router";

interface UsersTableProps {
  data: ResponseListRooms;
  handleOpen: (v: "edit" | "add" | null) => void;
}

export default function UsersTable({ data, handleOpen }: UsersTableProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const rows = data?.map((item) => {
    const id = item.id.toString();

    const handleDeleteRoom = async (values: any) => {
      setIsLoading(true);
      showNotification({
        id: "delete_room",
        title: "Deleting",
        message: "Please wait for the data to be deleted",
        loading: true,
        disallowClose: true,
      });
      try {
        const res = await roomsService.removeRoom(id);

        mutate("rooms_list");

        updateNotification({
          id: "delete_room",
          title: "Done",
          message: `Room ${id} deleted!`,
          loading: false,
          disallowClose: false,
          autoClose: 3000,
          color: "grape",
        });
        setIsLoading(false);
      } catch (err) {
        updateNotification({
          id: "delete_room",
          title: "Error",
          message: err as string,
          loading: false,
          disallowClose: false,
          autoClose: 3000,
          color: "red",
        });
        setIsLoading(false);
      }
    };

    return (
      <tr key={id}>
        <td>
          <Group spacing="sm">
            <Text size="sm" weight={500}>
              {item.name}
            </Text>
          </Group>
        </td>
        <td>
          <Group spacing={0} position="right">
            <ActionIcon
              onClick={() => {
                router.push(
                  `${router.pathname}`,
                  `${router.pathname}/?id=${id}`,
                  {
                    shallow: true,
                  }
                );
                handleOpen("edit");
              }}
            >
              <Pencil size={16} />
            </ActionIcon>
            <Menu transition="pop" withArrow placement="end">
              <Menu.Item
                icon={<Trash size={16} />}
                color="red"
                onClick={handleDeleteRoom}
              >
                Remove room
              </Menu.Item>
            </Menu>
          </Group>
        </td>
      </tr>
    );
  });

  return (
    <ScrollArea>
      <Table sx={{ minWidth: "100%" }} verticalSpacing="sm" highlightOnHover>
        <thead>
          <tr>
            <th>Name</th>
            <th>
              <Group spacing={0} position="right">
                Action
              </Group>
            </th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
