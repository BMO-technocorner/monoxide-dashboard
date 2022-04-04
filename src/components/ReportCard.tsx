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
import { useModals } from "@mantine/modals";
import dayjs from "dayjs";
import React from "react";
import { Check, ExternalLink, PhoneCall } from "tabler-icons-react";
import TimeAgo from "timeago-react";
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
      border: `1px solid ${
        theme.colorScheme === "dark" ? "#2C2E33" : theme.colors.gray[3]
      }`,
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
  const { classes, theme } = useStyles();
  const largeScreen = useMediaQuery("(min-width: 900px)");
  const modals = useModals();

  const openResolveConfirmModal = () =>
    modals.openConfirmModal({
      title: "Please confirm your action",
      children: (
        <Text size="sm">
          This action is so important that you are required to confirm it with a
          modal. Please click one of these buttons to proceed.
        </Text>
      ),
      centered: true,
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => console.log("Confirmed"),
    });

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
              <Text
                color={theme.colorScheme === "dark" ? "dimmed" : "#000"}
                className={classes.placeText}
              >
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
            <TimeAgo
              datetime={data.createdAt}
              title={dayjs(data.createdAt).format("ddd, MMM D, YYYY h:mm A")}
            />
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
              variant={theme.colorScheme === "dark" ? "light" : "filled"}
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
              variant={theme.colorScheme === "dark" ? "light" : "filled"}
              color="green"
              size={"lg"}
              onClick={openResolveConfirmModal}
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
