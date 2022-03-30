import AppLayout from "@/components/layout/AppLayout";
import { Box } from "@mantine/core";
import React from "react";

type SignUpProps = {};

const SignUp = ({}: SignUpProps) => {
  return (
    <AppLayout title="Sign Up">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 16 }}></Box>
    </AppLayout>
  );
};

export default SignUp;
