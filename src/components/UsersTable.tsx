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

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
}));

interface UsersTableProps {
  data: {
    avatar: string;
    name: string;
    email: string;
    deviceQty: number;
    id: string;
  }[];
}

export default function UsersTable({ data }: UsersTableProps) {
  const { classes, cx } = useStyles();
  const [selection, setSelection] = useState([] as string[]);
  const toggleRow = (id: string) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  const toggleAll = () =>
    setSelection((current) =>
      current.length === data.length ? [] : data.map((item) => item.id)
    );

  const rows = data.map((item) => {
    const selected = selection.includes(item.id);
    return (
      <tr key={item.id} className={cx({ [classes.rowSelected]: selected })}>
        <td>
          <Checkbox
            checked={selection.includes(item.id)}
            onChange={() => toggleRow(item.id)}
            transitionDuration={0}
          />
        </td>
        <td>
          <Group spacing="sm">
            <Avatar size={26} src={item.avatar} radius={26} />
            <Text size="sm" weight={500}>
              {item.name}
            </Text>
          </Group>
        </td>
        <td>{item.email}</td>
        <td>{item.deviceQty}</td>
        <td>
          <Group spacing={0} position="right">
            <ActionIcon>
              <Pencil size={16} />
            </ActionIcon>
            <Menu transition="pop" withArrow placement="end">
              <Menu.Item icon={<Trash size={16} />} color="red">
                Remove user
              </Menu.Item>
            </Menu>
          </Group>
        </td>
      </tr>
    );
  });

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="sm" highlightOnHover>
        <thead>
          <tr>
            <th style={{ width: 40 }}>
              <Checkbox
                onChange={toggleAll}
                checked={selection.length === data.length}
                indeterminate={
                  selection.length > 0 && selection.length !== data.length
                }
                transitionDuration={0}
              />
            </th>
            <th>User</th>
            <th>Email</th>
            <th>Device</th>
            <th />
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
