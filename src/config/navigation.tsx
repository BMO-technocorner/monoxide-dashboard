import {
  Home2,
  BrandAppleArcade,
  Report,
  Users,
  Settings,
  Box,
} from "tabler-icons-react";

export const appLinks = [
  { path: "/", label: "Overview", icon: <Home2 /> },
  { path: "/rooms", label: "Rooms", icon: <Box /> },
  { path: "/devices", label: "Devices", icon: <BrandAppleArcade /> },
  { path: "/reports", label: "Report", icon: <Report /> },
  { path: "/users", label: "Users", icon: <Users /> },
  { path: "/settings", label: "Settings", icon: <Settings /> },
];
