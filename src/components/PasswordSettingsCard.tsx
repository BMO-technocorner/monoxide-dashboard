import React, { useState } from "react";
import {
  createStyles,
  Card,
  Group,
  Text,
  TextInput,
  ActionIcon,
  Button,
} from "@mantine/core";
import { Eye, EyeOff } from "tabler-icons-react";
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

  fullWidth: {
    width: "100%",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
}));

interface PasswordSettingsCardProps {}

const passwordSchema = z
  .object({
    passwordOld: z
      .string()
      .nonempty()
      .min(8, "Your password must be at least 8 character"),
    password: z
      .string()
      .nonempty()
      .min(8, "Your password must be at least 8 character"),
    passwordConfirmation: z
      .string()
      .nonempty()
      .min(8, "Your password must be at least 8 character"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });

export default function PasswordSettingsCard({}: PasswordSettingsCardProps) {
  const { classes } = useStyles();
  const [showPasswordOld, setShowPasswordOld] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const form = useForm({
    schema: zodResolver(passwordSchema),
    initialValues: {
      passwordOld: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const handleChangeShowPasswordOld = () =>
    setShowPasswordOld((v: boolean) => !v);
  const handleChangeShowPassword = () => setShowPassword((v: boolean) => !v);
  const handleChangeShowPasswordConfirmation = () =>
    setShowPasswordConfirmation((v: boolean) => !v);

  return (
    <Card withBorder radius="md" p="xl" className={classes.card}>
      <Text size="md" className={classes.title} weight={500}>
        Password Settings
      </Text>
      <Text size="xs" color="dimmed" mt={3} mb="xl">
        Update your account password personalization
      </Text>

      <form
        onSubmit={form.onSubmit((values) => {
          console.log(values);
        })}
        className={classes.form}
      >
        <TextInput
          rightSection={
            <ActionIcon onClick={handleChangeShowPasswordOld}>
              {showPassword ? <Eye size={12} /> : <EyeOff size={12} />}
            </ActionIcon>
          }
          label="Old Password"
          placeholder="Input password"
          classNames={classes}
          type={!showPasswordOld ? "password" : "text"}
          className={classes.fullWidth}
          required
          {...form.getInputProps("passwordOld")}
        />
        <TextInput
          rightSection={
            <ActionIcon onClick={handleChangeShowPassword}>
              {showPassword ? <Eye size={12} /> : <EyeOff size={12} />}
            </ActionIcon>
          }
          label="Password"
          placeholder="Input password"
          classNames={classes}
          type={!showPassword ? "password" : "text"}
          className={classes.fullWidth}
          required
          {...form.getInputProps("password")}
        />
        <TextInput
          rightSection={
            <ActionIcon onClick={handleChangeShowPasswordConfirmation}>
              {showPassword ? <Eye size={12} /> : <EyeOff size={12} />}
            </ActionIcon>
          }
          label="Confirm Password"
          placeholder="Input password"
          classNames={classes}
          type={!showPasswordConfirmation ? "password" : "text"}
          className={classes.fullWidth}
          required
          {...form.getInputProps("passwordConfirmation")}
        />
        <Button
          type="submit"
          sx={{ width: 150, fontSize: 12 }}
          variant="light"
          color="grape"
        >
          Change Password
        </Button>
      </form>
    </Card>
  );
}
