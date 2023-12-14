"use client";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { GetFlights } from "@/services/flightServices";
import { useMutation } from "@tanstack/react-query";
import ProTable, { ProColumns } from "@ant-design/pro-table";
import { Button } from "antd";
import { FLIGHT } from "@/contracts/Flight";
import ExampleCitiyCards from "@/components/exampleCitiyCards";
import dayjs from "dayjs";

const FlightSearch = () => {
  const searchParams = useSearchParams();
  const departureDate = searchParams.get("departureDate");
  const arrivedDate = searchParams.get("arrivedDate");
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const { data, mutateAsync, isPending, error } = useMutation({
    mutationFn: GetFlights,
    mutationKey: ["getFlights"],
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (e) => console.log(e),
  });

  useEffect(() => {
    mutateAsync({
      departureDate: new Date(),
      destination: to?.toString(),
      origin: "",
    });
  }, []);

  const columns: ProColumns<FLIGHT>[] = [
    {
      title: "Uçuş Kodu",
      key: "flightNumber",
      dataIndex: "flightNumber",
      width: "max-content",
    },
    {
      title: "Kalkış Zamanı",
      key: "departureDateTime",
      dataIndex: "departureDateTime",
      width: "max-content",
      render: (_, record) => {
        return dayjs(record.departureDateTime).format("DD-MM-YYYY HH:mm:ss");
      },
    },
    {
      title: "Varış Zamanı",
      key: "arrivalDateTime",
      dataIndex: "arrivalDateTime",
      width: "max-content",
      render: (_, record) => {
        return dayjs(record.arrivalDateTime).format("DD-MM-YYYY HH:mm:ss");
      },
    },
    {
      title: "Fiyat",
      key: "operations",
      width: "max-content",
      render(dom, entity) {
        return <p>{entity.price}₺</p>;
      },
    },
    {
      title: "İşlemler",
      dataIndex: "option",
      valueType: "option",
      render: (_, record) => <Button type="default">Rezervasyon Yap</Button>,
      width: "max-content",
    },
  ];

  return (
    <div style={{ marginTop: "3rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "2rem",
        }}
      >
        <h1>UÇUŞ LİSTESİ</h1>
      </div>
      <ProTable
        columns={columns}
        dataSource={data?.data?.flightOptions || []}
        toolBarRender={false}
        search={false}
        loading={isPending}
      />
      <ExampleCitiyCards />
    </div>
  );
};

export default FlightSearch;
