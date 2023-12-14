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
      Authorization: `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjE0MGQzN2ZmLTg4YzUtNGFlNi02ZTJkLTA4ZGJmYTljNzU0MSIsIm5iZiI6MTcwMjUxNjUxNiwiZXhwIjoxNzAyNTE3MTE2LCJpc3MiOiJ1Z3VyQHVndXIuY29tIiwiYXVkIjoidWd1ckB1Z3VyLmNvbSJ9.Wi1PpUFdHQf4f5gJG_nV2UAgvmmEttOSkN88Qszs5FFpCtmZG3f1NRidAW5IQ51viC3qtj8rotviIs8gOYi1XQ`,
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
