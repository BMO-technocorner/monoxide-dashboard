import axiosClient from "@/config/axios";
import { ResponseListRooms } from "@/types/rooms";

const url = "/client/rooms";

export const roomsService = {
  getListRooms(): Promise<ResponseListRooms> {
    return axiosClient.get(url);
  },
};

export type RoomsService = typeof roomsService;
