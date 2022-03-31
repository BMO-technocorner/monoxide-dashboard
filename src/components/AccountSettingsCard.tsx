import React, { useState } from "react";
import {
  createStyles,
  Card,
  Group,
  Switch,
  Text,
  TextInput,
  Tooltip,
  Center,
  Button,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";

const useStyles = createStyles((theme) => ({
  card: {
    border: "1px solid #2C2E33",
  },

  item: {
    "& + &": {
      paddingTop: theme.spacing.sm,
      marginTop: theme.spacing.sm,
      borderTop: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },
  },

  switch: {
    "& *": {
      cursor: "pointer",
    },
  },

  title: {
    lineHeight: 1,
  },

  root: {
    position: "relative",
  },

  input: {
    height: "auto",
    paddingTop: 18,
  },

  label: {
    position: "absolute",
    pointerEvents: "none",
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: theme.spacing.sm / 2,
    zIndex: 1,
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
}));

interface AccountSettingsCardProps {}

const userSchema = z.object({
  fullName: z
    .string({
      required_error: "First name is required",
    })
    .nonempty(),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Not a valid email")
    .nonempty(),
});

export default function AccountSettingsCard({}: AccountSettingsCardProps) {
  const { classes } = useStyles();
  const [editProfile, setEditProfile] = useState(false);
  const form = useForm({
    schema: zodResolver(userSchema),
    initialValues: {
      fullName: "Muhammad Bhaska",
      email: "me@bhsk.dev",
    },
  });

  const handleChangeEditProfile = () => setEditProfile((v: boolean) => !v);

  return (
    <Card withBorder radius="md" p="xl" className={classes.card}>
      <Text size="md" className={classes.title} weight={500}>
        Account Settings
      </Text>
      <Text size="xs" color="dimmed" mt={3} mb="xl">
        Update your account personalization
      </Text>

      <form
        onSubmit={form.onSubmit((values) => {
          console.log(values);
        })}
        className={classes.form}
      >
        <TextInput
          label="Full Name"
          placeholder="Input your name"
          readOnly={!editProfile}
          classNames={classes}
          sx={{ width: "100%" }}
          {...form.getInputProps("fullName")}
        />
        <TextInput
          label="Email"
          placeholder="Input your email"
          readOnly={!editProfile}
          classNames={classes}
          sx={{ width: "100%" }}
          {...form.getInputProps("email")}
        />

        <Button
          type="submit"
          sx={{ width: 150, fontSize: 12 }}
          onClick={() =>
            !editProfile ? handleChangeEditProfile() : console.log("test")
          }
          variant="light"
          color="grape"
        >
          {!editProfile ? "Edit Profile" : "Save changes"}
        </Button>
      </form>
    </Card>
  );
}
