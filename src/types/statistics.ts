export interface ResponseStatisticsClientData {
  room: {
    total: number;
  };
  device: {
    total: number;
    onlineCount: number;
  };
  report: {
    currentMonthTotal: number;
    lastMonthTotal: number;
    performance: {
      total: number;
      openTotal: number;
      acceptedTotal: number;
      closedTotal: number;
      percentage: string;
    };
  };
}
