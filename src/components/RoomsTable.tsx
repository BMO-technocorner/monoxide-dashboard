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
} from "@mantine/core";
import { Pencil, Trash } from "tabler-icons-react";
import { ResponseListRooms } from "@/types/rooms";

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
}));

interface UsersTableProps {
  data: ResponseListRooms;
}

export default function UsersTable({ data }: UsersTableProps) {
  const { classes, cx } = useStyles();
  // const [selection, setSelection] = useState([] as string[]);
  // const toggleRow = (id: string) =>
  //   setSelection((current) =>
  //     current.includes(id)
  //       ? current.filter((item) => item !== id)
  //       : [...current, id]
  //   );
  // const toggleAll = () =>
  //   setSelection((current) =>
  //     current.length === data.length
  //       ? []
  //       : data.map((item) => item.id.toString())
  //   );

  const rows = data.map((item) => {
    const id = item.id.toString();
    // const selected = selection.includes(id);

    return (
      // <tr key={id} className={cx({ [classes.rowSelected]: selected })}>
      <tr key={id}>
        {/* <td>
          <Checkbox
            checked={selection.includes(id)}
            onChange={() => toggleRow(id)}
            transitionDuration={0}
          />
        </td> */}
        <td>
          <Group spacing="sm">
            <Text size="sm" weight={500}>
              {item.name}
            </Text>
          </Group>
        </td>
        <td>
          <Group spacing={0} position="right">
            <ActionIcon>
              <Pencil size={16} />
            </ActionIcon>
            <Menu transition="pop" withArrow placement="end">
              <Menu.Item icon={<Trash size={16} />} color="red">
                Remove rooms
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
            {/* <th style={{ width: 40 }}>
              <Checkbox
                onChange={toggleAll}
                checked={selection.length === data.length}
                indeterminate={
                  selection.length > 0 && selection.length !== data.length
                }
                transitionDuration={0}
              />
            </th> */}
            <th>Device</th>
            <th />
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
