import AxiosInstance from "@/lib/axios";
import { Result } from "@/utilities/Result";

type RegisterRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type RegisterResponse = Result<any>;

export const Register = async (
  data: Partial<RegisterRequest>
): Promise<RegisterResponse> => {
  return await (
    await AxiosInstance()
  )
    .post<RegisterResponse>("/Auth/Register", JSON.stringify(data))
    .then((res) => res.data)
    .catch((e) => {
      throw new Error(e);
    });
};

type LoginRequest = {
  email: string;
  password: string;
};
type LoginToken = {
  token: string;
  expiration: string;
};
export type LoginResponse = Result<LoginToken>;

export const Login = async (
  data: Partial<LoginRequest>
): Promise<LoginResponse> => {
  return await (
    await AxiosInstance()
  )
    .post<LoginResponse>("/Auth/Login", JSON.stringify(data))
    .then((res) => res.data)
    .catch((e) => {
      throw new Error(e);
    });
};
