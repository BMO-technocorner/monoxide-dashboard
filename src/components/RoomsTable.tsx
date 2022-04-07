import { useState } from "react";
import {
  createStyles,
  Table,
  Checkbox,
  ScrollArea,
  Group,
  Avatar,
  Text,
  ActionIcon,
  Menu,
  Skeleton,
} from "@mantine/core";
import { Pencil, Trash } from "tabler-icons-react";
import { ResponseListRooms } from "@/types/rooms";

interface UsersTableProps {
  data: ResponseListRooms;
  editModal: () => void;
}

export default function UsersTable({ data, editModal }: UsersTableProps) {
  const rows = data?.map((item) => {
    const id = item.id.toString();

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
            <ActionIcon onClick={editModal}>
              <Pencil size={16} />
            </ActionIcon>
            <Menu transition="pop" withArrow placement="end">
              <Menu.Item icon={<Trash size={16} />} color="red">
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
