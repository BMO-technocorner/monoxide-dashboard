import axiosClient from "@/config/axios";
import {
  AddDevice,
  ResponseDeleteDevice,
  ResponseListDevices,
} from "@/types/devices";

const url = "/client/devices";

export const devicesService = {
  getListDevices(): Promise<ResponseListDevices> {
    return axiosClient.get(url);
  },

  addDevice(body: AddDevice): Promise<ResponseListDevices> {
    return axiosClient.post(url, body);
  },

  removeDevice(id: number | string): Promise<ResponseDeleteDevice> {
    return axiosClient.delete(`${url}/?id=${id}`);
  },

  editDevice(
    id: number | string,
    body: AddDevice
  ): Promise<ResponseListDevices> {
    return axiosClient.post(`${url}/?id=${id}`, body);
  },
};

export type DevicesService = typeof devicesService;
