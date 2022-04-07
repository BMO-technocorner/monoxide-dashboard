import axiosClient from "@/config/axios";
import { ResponseListDevices } from "@/types/devices";

const url = "/client/devices";

export const devicesService = {
  getListDevices(): Promise<ResponseListDevices> {
    return axiosClient.get(url);
  },
};

export type DevicesService = typeof devicesService;
