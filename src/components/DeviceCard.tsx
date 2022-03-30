import {
  Badge,
  Box,
  Card,
  createStyles,
  Image,
  Text,
  Tooltip,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React from "react";
import { DevicesModalType } from "./DevicesModal";

type DeviceProps = {
  id: string;
  name: string;
  location: {
    lng: number;
    lat: number;
    geocode: string;
  };
  icon: {
    url: string;
    alt: string;
  };
  status: {
    power: boolean;
    uptime: string;
    timeline: {
      id: string;
      code: number;
      message: string;
      createdAt: string;
    }[];
  };
};

type DeviceCardProps = {
  device: DeviceProps;
  handleOpen: (v: DevicesModalType) => void;
};

const useStyles = createStyles((theme) => {
  const largeScreen = useMediaQuery("(min-width: 900px)");

  return {
    card: {
      border: "1px solid #2C2E33",
      borderRadius: 8,
      display: "flex",
      flexGrow: 1,
      flexDirection: "column",
      cursor: "pointer",
    },

    staticBgRound: {
      position: "absolute",
      background: theme.colors.dark[5],
      borderRadius: "99999px 99999px 0 0",
      height: 70,
      bottom: 30,
      left: 0,
      right: 0,
    },

    staticBgSquare: {
      position: "absolute",
      background: theme.colors.dark[5],
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
      right: 12,
      display: "flex",
      borderRadius: 999,
    },

    deviceImageStatusBadge: {
      padding: 12,
      border: `5px solid ${theme.colors.dark[6]}`,
      background: theme.colors.dark[4],
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

const DeviceCard = ({ device, handleOpen }: DeviceCardProps) => {
  const { classes } = useStyles();
  const largeScreen = useMediaQuery("(min-width: 900px)");

  return (
    <Card className={classes.card}>
      {/* Static background */}
      <Box className={classes.staticBgRound} />
      <Box className={classes.staticBgSquare} />

      {/* Device Image */}
      <Box className={classes.deviceImageWrapper}>
        <Image
          src="/images/device-image.png"
          alt="Device"
          fit="contain"
          width={100}
          height={100}
        />
        <Box className={classes.deviceImageStatusWrapper}>
          <Tooltip
            label={
              device.status.power
                ? `Device Online - ${device.status.timeline.length} alerts`
                : `Device Offline - ${device.status.timeline.length} alerts`
            }
            withArrow
            transition="fade"
            transitionDuration={200}
          >
            <Badge
              color={device.status.power ? "green" : "red"}
              variant="dot"
              className={classes.deviceImageStatusBadge}
            >
              {device.status.timeline.length}
            </Badge>
          </Tooltip>
        </Box>
      </Box>

      {/* Card content */}
      <Box className={classes.contentWrapper}>
        <Text className={classes.deviceNameText}>{device.name}</Text>
        <Text>{device.status.uptime}</Text>
      </Box>
    </Card>
  );
};

export default DeviceCard;
