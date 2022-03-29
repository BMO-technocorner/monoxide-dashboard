import {
  ActionIcon,
  Badge,
  Box,
  Card,
  createStyles,
  Divider,
  Group,
  Text,
  Tooltip,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React from "react";
import { Check, ExternalLink, PhoneCall } from "tabler-icons-react";
import * as timeago from "timeago.js";
import { ReportModalType } from "./ReportModal";

type DataProps = {
  id: string;
  code: number;
  message: string;
  createdAt: string;
  updatedAt: string;
  device: {
    id: string;
    name: string;
    location: {
      lng: number;
      lat: number;
      geocode: string;
    };
    contact: {
      id: string;
      name: string;
      phoneNumber: string;
    }[];
  };
};

type ReportCardProps = {
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  status: DataProps[];
  data: DataProps;
  handleOpen: (v: ReportModalType) => void;
};

const useStyles = createStyles((theme) => {
  const largeScreen = useMediaQuery("(min-width: 900px)");

  return {
    card: {
      border: "1px solid #2C2E33",
      borderRadius: 8,
      display: "flex",
      gap: 16,
      flexDirection: largeScreen ? "row" : "column",
      justifyContent: "space-between",
    },

    mainSection: {
      borderRadius: 8,
      display: "flex",
      flexDirection: "column",
      gap: 16,
    },

    messageText: {
      letterSpacing: theme.other.letterSpacing.trackingTight,
      fontWeight: 700,
    },

    severityWrapper: {
      display: "flex",
      gap: 8,
    },

    reportedWrapper: {
      display: "flex",
      gap: 16,
      alignItems: "center",
    },

    placeWrapper: {
      display: "flex",
      gap: 4,
      alignItems: "center",
      cursor: "pointer",
    },

    placeText: {
      color: theme.colors.dark[0],
      fontSize: largeScreen ? 14 : 12,
      textDecoration: "underline",
      textDecorationColor: theme.colors.dark[3],
    },

    actionSection: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: largeScreen ? "flex-end" : "flex-start",
      gap: 16,
    },
  };
});

const ReportCard = ({ data, status, user, handleOpen }: ReportCardProps) => {
  const { classes } = useStyles();
  const largeScreen = useMediaQuery("(min-width: 900px)");

  return (
    <Card p={16} className={classes.card}>
      <Box className={classes.mainSection}>
        <Box>
          <Text
            size={largeScreen ? "sm" : "xs"}
            className={classes.messageText}
          >
            {data.message}
          </Text>
        </Box>
        <Box className={classes.severityWrapper}>
          <Text size="xs" color="dimmed">
            Severity
          </Text>
          {status.map((stat) => (
            <Badge
              key={stat.id}
              color={
                stat.code === 1 ? "red" : stat.code === 2 ? "orange" : "yellow"
              }
            >
              {stat.code === 1 ? "HIGH" : stat.code === 2 ? "MEDIUM" : "LOW"}
            </Badge>
          ))}
        </Box>
        <Box className={classes.reportedWrapper}>
          <Box>
            <Text size="xs" color="dimmed">
              Reported from / by
            </Text>
            <Text size={largeScreen ? "sm" : "xs"}>{user.name}</Text>
          </Box>
          <Divider />
          <Box>
            <Text size="xs" color="dimmed">
              Location
            </Text>
            <Box<"a">
              className={classes.placeWrapper}
              component="a"
              href={`https://maps.google.com/?q=${data.device.location.lat},${data.device.location.lng}`}
              target="_blank"
            >
              <Text className={classes.placeText}>
                {data.device.location.geocode}
              </Text>
              <ExternalLink color="#909296" size={12} />
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className={classes.actionSection}>
        <Box>
          <Text size="xs" color="dimmed">
            {timeago.format(data.createdAt)}
          </Text>
        </Box>
        <Group spacing={"xs"}>
          <Tooltip
            label="Call emergency contacts"
            withArrow
            transition="fade"
            transitionDuration={200}
          >
            <ActionIcon
              variant="light"
              color="red"
              size={"lg"}
              onClick={() => handleOpen("contact")}
            >
              <PhoneCall size={16} />
            </ActionIcon>
          </Tooltip>
          <Tooltip
            label="Resolve report"
            withArrow
            transition="fade"
            transitionDuration={200}
          >
            <ActionIcon
              variant="light"
              color="green"
              size={"lg"}
              onClick={() => handleOpen("resolve")}
            >
              <Check size={16} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Box>
    </Card>
  );
};

export default ReportCard;
