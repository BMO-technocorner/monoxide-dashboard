import AppLayout from '@/components/layout/AppLayout';
import { ReportData } from '@/constants/report-data';
import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Group,
  Text,
  Tooltip,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Image from 'next/image';
import React, { useState } from 'react';
import { Check, ExternalLink, PhoneCall } from 'tabler-icons-react';
import * as timeago from 'timeago.js';
import ReportModal from '@/components/ReportModal';

type ReportProps = {};

export type ReportModalType = 'contact' | 'resolve' | 'details' | null;

const Report = ({}: ReportProps) => {
  const largeScreen = useMediaQuery('(min-width: 900px)');
  const mobileScreen = useMediaQuery('(max-width: 444px)');
  const [opened, setOpened] = useState<ReportModalType>(null);

  const handleOpen = (v: ReportModalType) => setOpened(v);

  return (
    <AppLayout title='Report'>
      <ReportModal opened={opened} handleOpen={handleOpen} />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {ReportData.map(({ status, user }) =>
          status.map(({ code, createdAt, device, id, message, updatedAt }) => (
            <Card
              key={id}
              p={16}
              sx={{
                border: '1px solid #2C2E33',
                borderRadius: 8,
                display: 'flex',
                gap: 16,
                flexDirection: largeScreen ? 'row' : 'column',
                justifyContent: 'space-between',
              }}
            >
              <Box
                sx={{
                  borderRadius: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                }}
              >
                <Box>
                  <Text
                    size={largeScreen ? 'sm' : 'xs'}
                    sx={(theme) => ({
                      letterSpacing: theme.other.letterSpacing.trackingTight,
                      fontWeight: 700,
                    })}
                  >
                    {message}
                  </Text>
                </Box>
                <Box sx={{ display: 'flex', gap: 8 }}>
                  <Text size='xs' color='dimmed'>
                    Severity
                  </Text>
                  {status.map((stat) => (
                    <Badge
                      key={stat.id}
                      color={
                        stat.code === 1
                          ? 'red'
                          : stat.code === 2
                          ? 'orange'
                          : 'yellow'
                      }
                    >
                      {stat.code === 1
                        ? 'HIGH'
                        : stat.code === 2
                        ? 'MEDIUM'
                        : 'LOW'}
                    </Badge>
                  ))}
                </Box>
                <Box sx={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <Box>
                    <Text size='xs' color='dimmed'>
                      Reported from / by
                    </Text>
                    <Text size={largeScreen ? 'sm' : 'xs'}>{user.name}</Text>
                  </Box>
                  <Divider />
                  <Box>
                    <Text size='xs' color='dimmed'>
                      Location
                    </Text>
                    <Box<'a'>
                      sx={{
                        display: 'flex',
                        gap: 4,
                        alignItems: 'center',
                        cursor: 'pointer',
                      }}
                      component='a'
                      href={`https://maps.google.com/?q=${device.location.lat},${device.location.lng}`}
                      target='_blank'
                    >
                      <Text
                        sx={(theme) => ({
                          color: theme.colors.dark[0],
                          fontSize: largeScreen ? 14 : 12,
                          textDecoration: 'underline',
                          textDecorationColor: theme.colors.dark[3],
                        })}
                      >
                        {device.location.geocode}
                      </Text>
                      <ExternalLink color='#909296' size={12} />
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: largeScreen ? 'flex-end' : 'flex-start',
                  gap: 16,
                }}
              >
                <Box>
                  <Text size='xs' color='dimmed'>
                    {timeago.format(createdAt)}
                  </Text>
                </Box>
                <Group spacing={'xs'}>
                  <Tooltip
                    label='Call emergency contacts'
                    withArrow
                    transition='fade'
                    transitionDuration={200}
                  >
                    <ActionIcon
                      variant='light'
                      color='red'
                      size={'lg'}
                      onClick={() => handleOpen('contact')}
                    >
                      <PhoneCall size={16} />
                    </ActionIcon>
                  </Tooltip>
                  <Tooltip
                    label='Resolve report'
                    withArrow
                    transition='fade'
                    transitionDuration={200}
                  >
                    <ActionIcon
                      variant='light'
                      color='green'
                      size={'lg'}
                      onClick={() => handleOpen('resolve')}
                    >
                      <Check size={16} />
                    </ActionIcon>
                  </Tooltip>
                </Group>
              </Box>
            </Card>
          ))
        )}
      </Box>
    </AppLayout>
  );
};

export default Report;
