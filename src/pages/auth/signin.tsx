import AppLayout from "@/components/layout/AppLayout";
import { Box } from "@mantine/core";
import React from "react";

type SignInProps = {};

const SignIn = ({}: SignInProps) => {
  return (
    <AppLayout title="Sign In">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 16 }}></Box>
    </AppLayout>
  );
};

export default SignIn;
