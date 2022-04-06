import AuthLayout from "@/components/layout/AuthLayout";
import {
  ActionIcon,
  Anchor,
  Box,
  Button,
  Card,
  Center,
  createStyles,
  Group,
  Text,
  TextInput,
} from "@mantine/core";
import { useState } from "react";
import { Eye, EyeOff, Leaf } from "tabler-icons-react";
import { useRouter } from "next/router";
import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import { authService } from "@/services/auth";
import { useAuthDispatch } from "@/store/AuthContext";
import { setCookies } from "cookies-next";

type SignInProps = {};

const loginSchema = z.object({
  email: z.string().nonempty().email("Not a valid email"),
  password: z
    .string()
    .nonempty()
    .min(8, "Your password must be at least 8 character"),
});

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
    border: `1px solid ${
      theme.colorScheme === "dark" ? "#2C2E33" : theme.colors.gray[3]
    }`,
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

  controlRegister: {
    width: "100%",
    textAlign: "center",
  },
}));

const SignIn = ({}: SignInProps) => {
  const { classes, theme } = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useAuthDispatch();
  const form = useForm({
    schema: zodResolver(loginSchema),
    initialValues: {
      email: "",
      password: "",
    },
  });

  const handleChangeShowPassword = () => setShowPassword((v: boolean) => !v);

  const handleLogin = async (values: any) => {
    setIsLoading(true);
    try {
      const res = await authService.signIn(values);

      dispatch({
        type: "LOGIN",
        payload: res,
      });

      setCookies("user", res);
      setCookies("token", res.token);

      router.push("/");
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Box className={classes.contentWrapper} p={24}>
        <Box className={classes.titleWrapper}>
          <Leaf />
          <Text className={classes.title}>Monoxide</Text>
        </Box>

        <form onSubmit={form.onSubmit(handleLogin)} className={classes.form}>
          <Card className={classes.card}>
            <TextInput
              label="Email"
              placeholder="Input email address"
              classNames={classes}
              type="email"
              required
              {...form.getInputProps("email")}
            />
            <Group direction="column" position="right">
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
              <Anchor<"a">
                href="#"
                onClick={(event) => event.preventDefault()}
                className={classes.link}
              >
                Forgot your password?
              </Anchor>
            </Group>
          </Card>

          <Box className={classes.buttonWrapper}>
            <Button
              variant={theme.colorScheme === "dark" ? "light" : "filled"}
              color="grape"
              className={classes.fullWidth}
              type="submit"
              disabled={
                form.values.email && form.values.password ? false : true
              }
              loading={isLoading}
            >
              Login
            </Button>
            <Anchor
              color="dimmed"
              size="sm"
              className={classes.controlRegister}
              onClick={() => router.push("/auth/signup")}
            >
              <Center inline>
                <Box ml={5}>Dont have account? Register</Box>
              </Center>
            </Anchor>
          </Box>
        </form>
      </Box>
    </AuthLayout>
  );
};

export default SignIn;
