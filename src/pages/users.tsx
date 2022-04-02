import AppLayout from "@/components/layout/AppLayout";
import UsersTable from "@/components/UsersTable";
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

const data = [
  {
    id: "1",
    avatar: "https://github.com/mhmdbhsk.png",
    name: "Muhammad Bhaska",
    deviceQty: 13,
    email: "me@bhsk.dev",
  },
  {
    id: "2",
    avatar: "https://github.com/ezralazuardy.png",
    name: "Ezra Lazuardy",
    deviceQty: 1,
    email: "ezralazuardy@students.undip.ac.id",
  },
  {
    id: "3",
    avatar: "https://github.com/salahudin-24.png",
    name: "Salahudin Al Ayubi",
    deviceQty: 3,
    email: "salahudinalayubi@students.undip.ac.id",
  },
];

const Users = ({}: UsersProps) => {
  const { classes } = useStyles();

  return (
    <AppLayout title="Users">
      <Box className={classes.contentWrapper}>
        <UsersTable data={data} />
      </Box>
    </AppLayout>
  );
};

export default Users;
