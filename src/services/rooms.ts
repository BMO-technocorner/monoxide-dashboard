import axiosClient from "@/config/axios";
import { AddRoom, ResponseListRooms } from "@/types/rooms";

const url = "/client/rooms";

export const roomsService = {
  getListRooms(): Promise<ResponseListRooms> {
    return axiosClient.get(url);
  },
  addRoom(body: AddRoom): Promise<ResponseListRooms> {
    return axiosClient.post(url, body);
  },
};

export type RoomsService = typeof roomsService;
