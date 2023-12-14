"use client";
import { DeleteById, UserFlight } from "@/services/flightServices";
import { Button, Card, Col, Popconfirm, Row, Tag } from "antd";
import React, { FC, useState } from "react";
import dayjs from "dayjs";
import { UseMutateAsyncFunction, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type props = {
  userFlights?: UserFlight[];
  reFetchUserFlights: UseMutateAsyncFunction<any, Error, void, unknown>;
};

const UserFlightDetailCard: FC<props> = (props) => {
  const router = useRouter();
  const deleteFlightById = useMutation({
    mutationFn: DeleteById,
    mutationKey: ["deleteFlightById"],
    onSuccess: async (data) => {
      console.log(data);
      toast.success(data.message);
      await props.reFetchUserFlights();
    },
    onError: (e) => {
      toast.error(
        "Rezervasyon İptalinde Hata Meydana Geldi! Lütfen Terkrar Deneyiniz!"
      );
    },
  });

  const handleCancelReservation = async (
    e: React.MouseEvent<HTMLElement> | undefined,
    data: UserFlight
  ) => {
    await deleteFlightById.mutateAsync(data.id);
  };

  return (
    <>
      {props.userFlights?.map((data, i) => (
        <Card
          key={i}
          style={{ margin: "2rem 0" }}
          type="inner"
          title={`${data.flightNumber}`}
          extra={
            data.isActive ? (
              <Tag color="#108ee9">Onaylandı</Tag>
            ) : (
              <Tag color="#f50">İptal Edildi</Tag>
            )
          }
        >
          <Row>
            <Col span={12}>
              <h3>Uçuş Bilgileri</h3>
              <hr style={{ margin: ".5rem 0" }} />
              <div style={{ padding: ".5rem" }}>
                <p>
                  <strong>Nereden : </strong>
                  {data.from}
                </p>
                <p>
                  <strong>Nereye : </strong>
                  {data.to}
                </p>
                <p>
                  <strong>Kalkış Zamanı : </strong>
                  {dayjs(data.departureDateTime).format("DD-MM-YYYY HH:mm:ss")}
                </p>
                <p>
                  <strong>Varış Zamanı : </strong>
                  {dayjs(data.arrivalDateTime).format("DD-MM-YYYY HH:mm:ss")}
                </p>
                <p>
                  <strong>Fiyat : </strong>
                  {data.price}₺
                </p>
              </div>
            </Col>
            <Col span={12}>
              <h3>Yolcu Bilgileri</h3>
              <hr style={{ margin: ".5rem 0" }} />
              <div style={{ padding: ".5rem" }}>
                <p>
                  <strong>Ad Soyad : </strong>
                  {data.passengerInformation.name}{" "}
                  {data.passengerInformation.surname}
                </p>
                <p>
                  <strong>Email : </strong>
                  {data.passengerInformation.email}
                </p>
                <p>
                  <strong>Adres : </strong>
                  {data.passengerInformation.address}
                </p>
                <p>
                  <strong>Telefon : </strong>
                  {data.passengerInformation.phoneNumber}
                </p>
                <p>
                  <strong>Not : </strong>
                  {data.passengerInformation.description}
                </p>
              </div>
            </Col>
            <Col span={24}>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                {data.isActive && (
                  <Popconfirm
                    title="Rezervasyon İptali"
                    description="İptal Etmek İstediğinize Emin Misiniz?"
                    onConfirm={(e) => {
                      handleCancelReservation(e, data);
                    }}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button danger>İptal Et</Button>
                  </Popconfirm>
                )}
              </div>
            </Col>
          </Row>
        </Card>
      ))}
    </>
  );
};

export default UserFlightDetailCard;
