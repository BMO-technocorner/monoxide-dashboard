import axiosClient from "@/config/axios";
import { ResponseDevicesList } from "@/types/devices";

const url = "/client/devices";

export const devicesService = {
  getListDevices(): Promise<ResponseDevicesList> {
    return axiosClient.get(url);
  },
};

export type DevicesService = typeof devicesService;
