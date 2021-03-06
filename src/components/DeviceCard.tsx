import { getMinutesBetweenDates, getQueryVariable } from "@/lib/helper";
import { Device } from "@/types/devices";
import { Badge, Box, Card, createStyles, Image, Text } from "@mantine/core";
import React, { Fragment } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { devicesService } from "@/services/devices";

type DeviceCardProps = {
  data: Device;
  handleOpen: (v: "add" | "edit" | "details" | null) => void;
};

const useStyles = createStyles((theme) => {
  return {
    card: {
      border: `1px solid ${
        theme.colorScheme === "dark" ? "#2C2E33" : theme.colors.gray[3]
      }`,
      borderRadius: 8,
      display: "flex",
      flexGrow: 1,
      flexDirection: "column",
      cursor: "pointer",
    },

    staticBgRound: {
      position: "absolute",
      background:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
      borderRadius: "99999px 99999px 0 0",
      height: 70,
      bottom: 30,
      left: 0,
      right: 0,
    },

    staticBgSquare: {
      position: "absolute",
      background:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
      height: 40,
      bottom: 0,
      left: 0,
      right: 0,
    },

    deviceImageWrapper: {
      zIndex: 1,
      display: "flex",
      justifyContent: "center",
      position: "relative",
    },

    deviceImageStatusWrapper: {
      position: "absolute",
      top: 12,
      zIndex: 1,
      right: -50,
      display: "flex",
      borderRadius: 999,
    },

    deviceImageStatusBadge: {
      padding: 12,
      border: `5px solid ${
        theme.colorScheme === "dark" ? theme.colors.dark[6] : "#fff"
      }`,
      background:
        theme.colorScheme === "dark"
          ? theme.colors.gray[1]
          : theme.colors.dark[6],
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[1],
    },

    contentWrapper: {
      zIndex: 1,
      display: "flex",
      justifyContent: "center",
    },

    deviceNameText: {
      letterSpacing: theme.other.letterSpacing.trackingTight,
      fontWeight: 700,
    },
  };
});

const DeviceCard = ({ data, handleOpen }: DeviceCardProps) => {
  const { classes } = useStyles();
  const deviceIdleTime = getMinutesBetweenDates(data.deviceSync.updatedAt);
  const deviceStatus = deviceIdleTime <= 1 ? "Online" : "Offline";
  const router = useRouter();

  return (
    <Fragment>
      <Card
        className={classes.card}
        onClick={() => {
          router.push(
            `${router.pathname}`,
            `${router.pathname}/?id=${data.id}`,
            {
              shallow: true,
            }
          );
          handleOpen("details");
        }}
      >
        {/* Static background */}
        <Box className={classes.staticBgRound} />
        <Box className={classes.staticBgSquare} />

        {/* Device Image */}
        <Box className={classes.deviceImageWrapper}>
          <Box sx={{ position: "relative" }}>
            <Image
              src="/images/device-image.png"
              alt="Device"
              fit="contain"
              width={100}
              height={100}
            />
            <Box className={classes.deviceImageStatusWrapper}>
              <Badge
                color={deviceStatus === "Online" ? "green" : "red"}
                variant="dot"
                className={classes.deviceImageStatusBadge}
              >
                {deviceStatus}
              </Badge>
            </Box>
          </Box>
        </Box>

        {/* Card content */}
        <Box className={classes.contentWrapper}>
          <Text className={classes.deviceNameText}>{data.name}</Text>
        </Box>
      </Card>
    </Fragment>
  );
};

export default DeviceCard;
