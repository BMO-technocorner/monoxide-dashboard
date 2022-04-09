import AppLayout from "@/components/layout/AppLayout";
import { Box, Skeleton, Text } from "@mantine/core";
import React, { useState } from "react";
import ReportCard from "@/components/ReportCard";
import useSWR from "swr";
import { reportsService } from "@/services/reports";
import ReportStateModal from "@/components/ReportStateModal";

type ReportProps = {};

const Report = ({}: ReportProps) => {
  const [modalOpened, setModalOpened] = useState<"accept" | "reject" | null>(
    null
  );

  const handleOpen = (v: "accept" | "reject" | null) => setModalOpened(v);

  const { data: ListReportsData } = useSWR(
    "reports_list",
    reportsService.getListReports,
    { refreshInterval: 30000 }
  );

  return (
    <AppLayout title="Report">
      <ReportStateModal opened={modalOpened} handleOpen={handleOpen} />

      <Box sx={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {!ListReportsData ? (
          <Skeleton height={150} width="100%" radius="md" />
        ) : ListReportsData.length === 0 ? (
          <Text size="xs">No device found</Text>
        ) : (
          ListReportsData.map((report) => (
            <ReportCard key={report.id} data={report} handleOpen={handleOpen} />
          ))
        )}
      </Box>
    </AppLayout>
  );
};

export default Report;
