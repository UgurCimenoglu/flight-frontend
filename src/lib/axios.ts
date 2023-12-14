import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
const https = require("https");

const backendUrl = process.env.NEXT_PUBLIC_BASE_URL;

const AxiosInstance = async () => {
  const axiosIns = axios.create({
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
    baseURL: backendUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  axiosIns.interceptors.response.use(
    (res) => res,
    async (error: any) => {
      console.log("errrr", error);
      if (error.response?.status === 401) {
        toast.error(
          "Oturum süresi doldu, giriş ekranına yönlendiriliyorsunuz, lütfen tekrar giriş yapınız!"
        );
      }
      if (error.response?.status === 400) {
        console.log("axs err", error);
        if (typeof error.response.data === "string") {
          toast.error(error.response.data);
        }
        if (error.response.data) {
          toast.error(error.response.data.message);
        }
      }
    }
  );

  return axiosIns;
};
export default AxiosInstance;
