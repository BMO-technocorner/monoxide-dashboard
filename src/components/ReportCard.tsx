import { Report, ReportStatus } from "@/types/reports";
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
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React from "react";
import { Check, PhoneCall, X } from "tabler-icons-react";
import TimeAgo from "timeago-react";

type ReportCardProps = {
  data: Report;
  handleOpen: (v: "accept" | "reject" | null) => void;
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

const ReportCard = ({ data, handleOpen }: ReportCardProps) => {
  const { classes, theme } = useStyles();
  const largeScreen = useMediaQuery("(min-width: 900px)");
  const router = useRouter();

  return (
    <Card p={16} className={classes.card}>
      <Box className={classes.mainSection}>
        <Box className={classes.severityWrapper}>
          <Text size="xs" color="dimmed">
            Severity
          </Text>
          {
            <Badge
              color={
                data?.detectionLevel === 1
                  ? "red"
                  : data?.detectionLevel === 2
                  ? "orange"
                  : "yellow"
              }
            >
              {data?.detectionLevel === 1
                ? "HIGH"
                : data?.detectionLevel === 2
                ? "MEDIUM"
                : "LOW"}
            </Badge>
          }
        </Box>
        <Box className={classes.reportedWrapper}>
          <Box>
            <Text size="xs" color="dimmed">
              Reported from / by
            </Text>
            <Text size={largeScreen ? "sm" : "xs"}>{data?.owner?.name}</Text>
          </Box>
          <Divider />
          <Box>
            <Text size="xs" color="dimmed">
              Location
            </Text>

            <Text size="xs">{data?.device.name}</Text>
          </Box>
        </Box>
      </Box>

      <Box className={classes.actionSection}>
        <Box>
          <Text size="xs" color="dimmed">
            <TimeAgo
              datetime={data?.createdAt}
              title={dayjs(data?.createdAt).format("ddd, MMM D, YYYY h:mm A")}
            />
          </Text>
        </Box>
        {/* @ts-ignore */}
        {data?.status === "OPEN" && (
          <Group spacing={"xs"}>
            <Tooltip
              label="Reject report"
              withArrow
              transition="fade"
              transitionDuration={200}
            >
              <ActionIcon
                variant={theme.colorScheme === "dark" ? "light" : "filled"}
                color="red"
                size={"lg"}
                onClick={() => {
                  router.push(
                    `${router.pathname}`,
                    `${router.pathname}/?id=${data?.id}`,
                    {
                      shallow: true,
                    }
                  );
                  handleOpen("reject");
                }}
              >
                <X size={16} />
              </ActionIcon>
            </Tooltip>
            <Tooltip
              label="Accept report"
              withArrow
              transition="fade"
              transitionDuration={200}
            >
              <ActionIcon
                variant={theme.colorScheme === "dark" ? "light" : "filled"}
                color="green"
                size={"lg"}
                onClick={() => {
                  router.push(
                    `${router.pathname}`,
                    `${router.pathname}/?id=${data?.id}`,
                    {
                      shallow: true,
                    }
                  );
                  handleOpen("accept");
                }}
              >
                <Check size={16} />
              </ActionIcon>
            </Tooltip>
          </Group>
        )}
      </Box>
    </Card>
  );
};

export default ReportCard;
