import AppLayout from "@/components/layout/AppLayout";
import { Box, createStyles } from "@mantine/core";
import React from "react";

type UsersProps = {};

const useStyles = createStyles({
  contentWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
});

const Users = ({}: UsersProps) => {
  const { classes } = useStyles();

  return (
    <AppLayout title="Users">
      <Box className={classes.contentWrapper}></Box>
    </AppLayout>
  );
};

export default Users;
