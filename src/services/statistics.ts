import axiosClient from "@/config/axios";
import { ResponseStatisticsClientData } from "@/types/statistics";

const url = "/client/statistics";

export const statisticsClientService = {
  getListStatistics(): Promise<ResponseStatisticsClientData> {
    return axiosClient.get(url);
  },
};

export type StatisticsService = typeof statisticsClientService;
