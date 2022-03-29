import AppLayout from "@/components/layout/AppLayout";
import { DevicesData } from "@/constants/devices-data";
import {
  Badge,
  Box,
  Button,
  Card,
  Grid,
  Image,
  Text,
  Tooltip,
} from "@mantine/core";
import { useModals } from "@mantine/modals";
import React from "react";
import { Plus } from "tabler-icons-react";

type DevicesProps = {};

const Devices = ({}: DevicesProps) => {
  const modals = useModals();

  const openAddDeviceModal = () =>
    modals.openConfirmModal({
      title: "Please confirm your action",
      closeOnConfirm: false,
      labels: { confirm: "Next modal", cancel: "Close modal" },
      centered: true,
      children: (
        <Text size="sm">
          This action is so important that you are required to confirm it with a
          modal. Please click one of these buttons to proceed.
        </Text>
      ),
      onConfirm: () =>
        modals.openConfirmModal({
          title: "This is modal at second layer",
          labels: { confirm: "Close modal", cancel: "Back" },
          closeOnConfirm: false,
          centered: true,
          children: (
            <Text size="sm">
              When this modal is closed modals state will revert to first modal
            </Text>
          ),
          onConfirm: () => modals.closeAll(),
        }),
    });

  return (
    <AppLayout
      title="Devices"
      headingCustom={
        <Button leftIcon={<Plus size={14} />} onClick={openAddDeviceModal}>
          Add Device
        </Button>
      }
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Grid>
          {DevicesData.map((device) => (
            <Grid.Col lg={4} md={6} xs={6} key={device.id}>
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  flexGrow: 1,
                  minHeight: 200,
                }}
              >
                <Card
                  sx={{
                    display: "flex",
                    flexGrow: 1,
                    flexDirection: "column",
                  }}
                >
                  <Box
                    sx={(theme) => ({
                      position: "absolute",
                      background: theme.colors.dark[5],
                      borderRadius: "99999px 99999px 0 0",
                      height: 70,
                      bottom: 50,
                      left: 0,
                      right: 0,
                    })}
                  />
                  <Box
                    sx={(theme) => ({
                      position: "absolute",
                      background: theme.colors.dark[5],
                      height: 50,
                      bottom: 0,
                      left: 0,
                      right: 0,
                    })}
                  />
                  <Box
                    sx={{
                      zIndex: 1,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                      }}
                    >
                      <Image
                        src="/images/device-image.png"
                        alt="Device"
                        fit="contain"
                        width={100}
                        height={100}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          top: 12,
                          zIndex: 1,
                          right: -25,
                          display: "flex",
                          borderRadius: 999,
                        }}
                      >
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
                            sx={(theme) => ({
                              padding: 12,
                              border: `5px solid ${theme.colors.dark[6]}`,
                              background: theme.colors.dark[4],
                            })}
                          >
                            {device.status.timeline.length}
                          </Badge>
                        </Tooltip>
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      zIndex: 1,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      sx={(theme) => ({
                        letterSpacing: theme.other.letterSpacing.trackingTight,
                        fontWeight: 700,
                      })}
                    >
                      {device.name}
                    </Text>
                    <Text>{device.status.uptimeSince}</Text>
                  </Box>
                </Card>
              </Box>
            </Grid.Col>
          ))}
        </Grid>
      </Box>
    </AppLayout>
  );
};

export default Devices;
