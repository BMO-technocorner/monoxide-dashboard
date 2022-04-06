export interface ResponseReport {
  id: number;
  ownerId: number;
  message: null | string;
  status: ReportStatus;
  level: ReportLevel;
  detectionLevel: ReportDetectionLevel;
  deviceId: number;
  createdAt: string;
  updatedAt: string;
}

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
