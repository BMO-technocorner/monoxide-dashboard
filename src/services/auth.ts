import axiosClient from "@/config/axios";
import { ResponseSignIn, SignIn } from "@/types/auth";

const url = "/auth";

export const authService = {
  signIn(body: SignIn): Promise<ResponseSignIn> {
    return axiosClient.post(`${url}/signin`, body);
  },
};

export type AuthService = typeof authService;
