import AppLayout from "@/components/layout/AppLayout";
import { ReportData } from "@/constants/report-data";
import { Box } from "@mantine/core";
import React, { useState } from "react";
import ReportModal, { ReportModalType } from "@/components/ReportModal";
import ReportCard from "@/components/ReportCard";

type ReportProps = {};

const Report = ({}: ReportProps) => {
  const [opened, setOpened] = useState<ReportModalType>(null);

  const handleOpen = (v: ReportModalType) => setOpened(v);

  return (
    <AppLayout title="Report">
      <ReportModal opened={opened} handleOpen={handleOpen} />

      <Box sx={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {ReportData.map(({ status, user }) =>
          status.map((item) => (
            <ReportCard
              key={item.id}
              data={item}
              status={status}
              user={user}
              handleOpen={handleOpen}
            />
          ))
        )}
      </Box>
    </AppLayout>
  );
};

export default Report;
