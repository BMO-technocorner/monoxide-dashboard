import { Device } from "./devices";
import { UserProfile } from "./profile";

export interface Report {
  id: number;
  message: null | string;
  status: ReportStatus;
  level: ReportLevel;
  detectionLevel: ReportDetectionLevel;
  createdAt: string;
  updatedAt: string;
  device: Device;
  owner: UserProfile;
}

export interface EditReport {
  status: string;
  message: string;
}

export type ResponseListReports = Report[];

export enum ReportStatus {
  "OPEN",
  "ACCEPTED",
  "CLOSED",
  "DONE",
}

export enum ReportLevel {
  "CLIENT",
  "GUARD",
}

export enum ReportDetectionLevel {
  "LOW",
  "MEDIUM",
  "HIGH",
}
