import axiosClient from "@/config/axios";
import {
  AddDevice,
  Device,
  EditDevice,
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
    body: EditDevice
  ): Promise<ResponseListDevices> {
    return axiosClient.put(`${url}?id=${id}`, body);
  },

  getDeviceById(id: number): Promise<Device> {
    return axiosClient.get(`${url}?id=${id}`);
  },
};

export type DevicesService = typeof devicesService;
