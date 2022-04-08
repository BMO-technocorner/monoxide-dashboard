import axiosClient from "@/config/axios";
import { AddRoom, ResponseDeleteRoom, ResponseListRooms } from "@/types/rooms";

const url = "/client/rooms";

export const roomsService = {
  getListRooms(): Promise<ResponseListRooms> {
    return axiosClient.get(url);
  },

  addRoom(body: AddRoom): Promise<ResponseListRooms> {
    return axiosClient.post(url, body);
  },

  removeRoom(id: number | string): Promise<ResponseDeleteRoom> {
    return axiosClient.delete(`${url}/?id=${id}`);
  },

  editRoom(id: number | string, body: AddRoom): Promise<ResponseListRooms> {
    return axiosClient.post(`${url}/?id=${id}`, body);
  },
};

export type RoomsService = typeof roomsService;
