import React, { useState } from 'react';
import {
  createStyles,
  Table as MantineTable,
  Checkbox,
  Group,
  Avatar,
  Text,
  Box,
  Menu,
  Divider,
  Badge,
  ScrollArea,
} from '@mantine/core';
import {
  Trash,
  Checkbox as CheckboxIcon,
  InfoCircle,
} from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
}));

interface TableSelectionProps {
  data: {
    user: {
      id: string;
      name: string;
      avatar: string;
    };
    report: {
      message: string;
      code: number;
    };
    status: {
      id: string;
      code: number;
      message: string;
    }[];
    id: string;
  }[];
}

export default function Table({ data }: TableSelectionProps) {
  const { classes, cx } = useStyles();
  const [selection, setSelection] = useState<string[]>([]);

  const toggleRow = (id: string) =>
    setSelection((current) =>
      current?.includes(id)
        ? current?.filter((item) => item !== id)
        : [...current, id]
    );
  const toggleAll = () =>
    setSelection((current) =>
      current.length === data.length ? [] : data.map((item) => item.id)
    );

  const rows = data.map((item) => {
    const selected = selection.includes(item.id);

    const renderStatus = item.status.map((val) => (
      <Badge
        key={val.id}
        color={val.code === 1 ? 'blue' : val.code === 2 ? 'yellow' : 'red'}
      >
        {val.code === 1 ? 'LOW' : val.code === 2 ? 'MEDIUM' : 'HIGH'}
      </Badge>
    ));

    return (
      <tr key={item.id} className={cx({ [classes.rowSelected]: selected })}>
        <td>
          <Box px={8}>
            <Checkbox
              checked={selection.includes(item.id)}
              onChange={() => toggleRow(item.id)}
              transitionDuration={0}
            />
          </Box>
        </td>
        <td>
          <Group spacing='sm'>
            <Avatar size={26} src={item.user.avatar} radius={26} />
            <Text size='sm' weight={500}>
              {item.user.name}
            </Text>
          </Group>
        </td>
        <td>{item.report.message}</td>
        <td>{renderStatus}</td>
        <td>
          <Menu>
            <Menu.Item icon={<Trash size={14} />}>Delete</Menu.Item>
            <Menu.Item icon={<CheckboxIcon size={14} />}>Resolve</Menu.Item>
            <Divider />
            <Menu.Item icon={<InfoCircle size={14} />}>Detail</Menu.Item>
          </Menu>
        </td>
      </tr>
    );
  });

  return (
    <ScrollArea>
      <Box
        sx={(theme) => ({
          border: `1px solid ${theme.colors.dark[5]}`,
          borderRadius: 16,
        })}
      >
        <MantineTable sx={{ width: 800 }} verticalSpacing='sm'>
          <thead>
            <tr>
              <th
                style={{ width: 40, paddingTop: '16px', paddingBottom: '16px' }}
              >
                <Box px={8}>
                  <Checkbox
                    onChange={toggleAll}
                    checked={selection.length === data.length}
                    indeterminate={
                      selection.length > 0 && selection.length !== data.length
                    }
                    transitionDuration={0}
                  />
                </Box>
              </th>
              <th>User</th>
              <th>Report</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </MantineTable>
      </Box>
    </ScrollArea>
  );
}
