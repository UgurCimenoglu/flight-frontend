"use client";
import UserFlightDetailCard from "@/components/userFlightDetailCard";
import { GetAllCurrentUserFlight } from "@/services/flightServices";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useLayoutEffect } from "react";

const MyProfile = () => {
  const { mutateAsync, isPending, error, data } = useMutation({
    mutationKey: ["currentUserFlights"],
    mutationFn: GetAllCurrentUserFlight,
  });
  useLayoutEffect(() => {
    mutateAsync();
  }, []);
  return (
    <>
      {isPending && <p>Yükleniyor</p>}
      <div style={{ marginTop: "2rem" }}>
        <h3>Rezervasyonlarım</h3>
      </div>
      <div style={{ marginTop: "2rem" }}>
        <UserFlightDetailCard
          userFlights={data?.data}
          reFetchUserFlights={mutateAsync}
        />
      </div>
    </>
  );
};

export default MyProfile;
