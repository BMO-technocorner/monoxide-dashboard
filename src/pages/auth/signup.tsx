import AuthLayout from "@/components/layout/AuthLayout";
import {
  ActionIcon,
  Anchor,
  Box,
  Button,
  Card,
  Center,
  Checkbox,
  createStyles,
  Divider,
  Text,
  TextInput,
} from "@mantine/core";
import React, { useState } from "react";
import { ArrowLeft, Eye, EyeOff, Leaf } from "tabler-icons-react";
import { useRouter } from "next/router";
import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";

type SignUpProps = {};

const useStyles = createStyles((theme) => ({
  contentWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
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

  titleWrapper: {
    display: "flex",
    gap: 8,
  },

  title: {
    fontWeight: "bold",
    letterSpacing: theme.other.letterSpacing.trackingTight,
  },

  form: {
    maxWidth: 400,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },

  card: {
    maxWidth: 400,
    width: "100%",
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    gap: 16,
    border: "1px solid #2C2E33",
  },

  link: {
    paddingTop: 2,
    color:
      theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6],
    fontWeight: 500,
    fontSize: theme.fontSizes.xs,
  },

  buttonWrapper: {
    maxWidth: 400,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },

  fullWidth: {
    width: "100%",
  },

  labelCheckbox: {
    fontSize: 12,
  },

  controlLogin: {
    width: "100%",
    textAlign: "center",
  },
}));

const registerSchema = z
  .object({
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
    password: z
      .string()
      .nonempty()
      .min(8, "Your password must be at least 8 character"),
    passwordConfirmation: z
      .string()
      .nonempty()
      .min(8, "Your password must be at least 8 character"),
    acceptTerms: z.literal(true),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  })
  .refine(
    (data) =>
      data.fullName || data.email || data.password || data.passwordConfirmation,
    {
      message: "Accept terms and condition before register",
      path: ["acceptTerms"],
    }
  );

type registerSchema = z.infer<typeof registerSchema>;

const SignUp = ({}: SignUpProps) => {
  const { classes } = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const form = useForm({
    schema: zodResolver(registerSchema),
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      acceptTerms: false,
    },
  });

  const handleChangeShowPassword = () => setShowPassword((v: boolean) => !v);

  return (
    <AuthLayout>
      <Box className={classes.contentWrapper} p={24}>
        <Box className={classes.titleWrapper}>
          <Leaf />
          <Text className={classes.title}>Monoxide</Text>
        </Box>

        <form
          onSubmit={form.onSubmit((values) => {
            console.log(values);
            router.push("/auth/signin");
          })}
          className={classes.form}
        >
          <Card className={classes.card}>
            <TextInput
              label="Full Name"
              placeholder="Input full name"
              classNames={classes}
              type="text"
              required
              {...form.getInputProps("fullName")}
            />
            <TextInput
              label="Email"
              placeholder="Input email address"
              classNames={classes}
              type="email"
              required
              {...form.getInputProps("email")}
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
                <ActionIcon onClick={handleChangeShowPassword}>
                  {showPassword ? <Eye size={12} /> : <EyeOff size={12} />}
                </ActionIcon>
              }
              label="Confirm Password"
              placeholder="Input password"
              classNames={classes}
              type={!showPassword ? "password" : "text"}
              className={classes.fullWidth}
              required
              {...form.getInputProps("passwordConfirmation")}
            />
            <Checkbox
              label="I agree to terms and condition"
              classNames={{
                label: classes.labelCheckbox,
              }}
              {...form.getInputProps("acceptTerms")}
            />
          </Card>

          <Box className={classes.buttonWrapper}>
            <Button
              className={classes.fullWidth}
              type="submit"
              disabled={
                form.values.fullName &&
                form.values.email &&
                form.values.password &&
                form.values.passwordConfirmation &&
                form.values.acceptTerms
                  ? false
                  : true
              }
            >
              Register
            </Button>
            <Anchor
              color="dimmed"
              size="sm"
              className={classes.controlLogin}
              onClick={() => router.push("/auth/signin")}
            >
              <Center inline>
                <ArrowLeft size={12} />
                <Box ml={5}>Back to login page</Box>
              </Center>
            </Anchor>
          </Box>
        </form>
      </Box>
    </AuthLayout>
  );
};

export default SignUp;
