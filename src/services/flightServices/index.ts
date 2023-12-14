"use client";
import { FLIGHT } from "@/contracts/Flight";
import AxiosInstance from "@/lib/axios";
import { Result } from "@/utilities/Result";

type GetFlightRequest = {
  departureDate: Date;
  destination: string;
  origin: string;
};
type Flight = {
  flightOptions: FLIGHT[] | null;
};
export type GetFlightResponse = Result<Flight>;

export const GetFlights = async (
  data: Partial<GetFlightRequest>
): Promise<GetFlightResponse> => {
  return await (
    await AxiosInstance()
  )
    .post<GetFlightResponse>("/Flights/GetFlights", JSON.stringify(data))
    .then((res) => res.data)
    .catch((e) => {
      return e;
    });
};
