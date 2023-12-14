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
    .catch((e) => e);
};

type AddFlightRequest = {
  arrivalDateTime: string;
  departureDateTime: string;
  flightNumber: string;
  from: string;
  to: string;
  price: number;
  passengerInformation: {
    name: string;
    surname: string;
    email: string;
    phoneNumber: string;
    address: string;
    description?: string;
  };
};
type AddFlightResponse = Result<any>;
export const AddFlight = async (
  data: Partial<AddFlightRequest>
): Promise<AddFlightResponse> => {
  return await (
    await AxiosInstance()
  )
    .post<AddFlightResponse>("/Flights/Add", JSON.stringify(data))
    .then((res) => res.data)
    .catch((e) => {throw new Error(e)});
};

export type UserFlight = {
  id: string;
  arrivalDateTime: string;
  departureDateTime: string;
  flightNumber: string;
  price: number;
  from: string;
  to: string;
  description?: string;
  isActive: boolean;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  passengerInformation: {
    id: string;
    name: string;
    surname: string;
    email: string;
    phoneNumber: string;
    address: string;
    description: string;
  };
};
type GetAllCurrentUserFlightsResponse = Result<UserFlight[]>;
export const GetAllCurrentUserFlight =
  async (): Promise<GetAllCurrentUserFlightsResponse> => {
    return await (
      await AxiosInstance()
    )
      .get<GetAllCurrentUserFlightsResponse>("/Flights/GetAllCurrentUserFlight")
      .then((res) => res.data)
      .catch((e) => e);
  };

export const DeleteById = async (query: string): Promise<Result<any>> => {
  return (await AxiosInstance())
    .delete<Result<any>>(`/Flights/DeleteById?id=${query}`)
    .then((res) => res.data)
    .catch((e) => e);
};
