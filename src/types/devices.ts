import { UserProfile } from "./profile";
import { ResponseReport } from "./report";
import { Room } from "./rooms";

export interface Device {
  id: number;
  ownerId: number;
  roomId: number;
  deviceSyncId: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  owner: UserProfile;
  room: Room;
  deviceSync: DeviceSync;
  reports: ResponseReport[];
}

export type ResponseListDevices = Device[];

export interface DeviceSync {
  id: 1;
  uid: string;
  createdAt: string;
  updatedAt: string;
}
