import React from "react";
import {
  useMantineColorScheme,
  SegmentedControl,
  Group,
  Center,
  Box,
} from "@mantine/core";
import { Sun, Moon } from "tabler-icons-react";

export default function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Group position="center">
      <SegmentedControl
        value={colorScheme}
        onChange={() => toggleColorScheme()}
        data={[
          {
            value: "light",
            label: (
              <Center>
                <Sun size={16} />
                <Box ml={10}>Light</Box>
              </Center>
            ),
          },
          {
            value: "dark",
            label: (
              <Center>
                <Moon size={16} />
                <Box ml={10}>Dark</Box>
              </Center>
            ),
          },
        ]}
      />
    </Group>
  );
}
