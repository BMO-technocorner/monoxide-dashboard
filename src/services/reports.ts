import axiosClient from "@/config/axios";
import { EditReport, ResponseListReports } from "@/types/reports";

const url = "/client/reports";

export const reportsService = {
  getListReports(): Promise<ResponseListReports> {
    return axiosClient.get(url);
  },

  editReport(
    id: number | string,
    body: EditReport
  ): Promise<ResponseListReports> {
    return axiosClient.put(`${url}?id=${id}`, body);
  },
};

export type reportsService = typeof reportsService;
