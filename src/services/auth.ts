import axiosClient from "@/config/axios";

export const authSignIn = async (body: {
  body: { email: string; password: string };
}) => {
  const res = await axiosClient.post("/auth/signin", body);

  return res;
};
