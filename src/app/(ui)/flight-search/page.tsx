"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AddFlight, GetFlights } from "@/services/flightServices";
import { useMutation } from "@tanstack/react-query";
import ProTable, { ProColumns } from "@ant-design/pro-table";
import { Button, Col, Form, Input, Modal, Row } from "antd";
import { FLIGHT } from "@/contracts/Flight";
import ExampleCitiyCards from "@/components/exampleCitiyCards";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const FlightSearch = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
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

  const addFlight = useMutation({
    mutationFn: AddFlight,
    mutationKey: ["addFlights"],
    onSuccess: (data) => {
      handleCloseModal();
      toast.success(
        "Rezervasyon Başarıyla Oluşturuldu! Anasayfaya Yönlendiriliyorsunuz"
      );
      router.push("/");
    },
    onError: (e) => {
      toast.error(
        "Rezervasyon Oluşturulurken Hata Meydana Geldi! Lütfen Bilgilerinizi Kontrol Ediniz!"
      );
    },
  });

  const [form] = Form.useForm();

  const [currentFlight, setCurrentFlight] = useState<FLIGHT | null>(null);

  const handleCloseModal = () => {
    setCurrentFlight(null);
    form.resetFields();
  };

  const onHandleFinishForm = (values: any) => {
    addFlight.mutateAsync({
      arrivalDateTime: currentFlight?.arrivalDateTime,
      departureDateTime: currentFlight?.departureDateTime,
      flightNumber: currentFlight?.flightNumber,
      price: currentFlight?.price,
      from: from || "",
      to: to || "",
      passengerInformation: {
        name: values.Name,
        surname: values.Surname,
        email: values.Email,
        address: values.Address,
        phoneNumber: values.PhoneNumber,
        description: values.Description,
      },
    });
  };

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
      render: (_, record) => (
        <Button type="default" onClick={() => setCurrentFlight(record)}>
          Rezervasyon Yap
        </Button>
      ),
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
      <Modal open={!!currentFlight} footer={null} onCancel={handleCloseModal}>
        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
          layout="horizontal"
          form={form}
          onValuesChange={() => {}}
          onFinish={(values) => {
            onHandleFinishForm(values);
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "1rem 0",
            }}
          >
            <h2>Uçuş Bilgileri</h2>
          </div>
          <Row>
            <Col span={12} style={{ padding: ".5rem 0" }}>
              <p>
                <strong>Nereden : </strong>
                {from}
              </p>
            </Col>
            <Col span={12} style={{ padding: ".5rem 0" }}>
              <p>
                <strong>Nereye : </strong>
                {to}
              </p>
            </Col>

            <Col span={12} style={{ padding: ".5rem 0 1rem 0" }}>
              <p>
                <strong>Kalkış Saati : </strong>
                {dayjs(currentFlight?.departureDateTime).format(
                  "DD-MM-YYYY HH:mm:ss"
                )}
              </p>
            </Col>
            <Col span={12} style={{ padding: ".5rem 0 1rem 0" }}>
              <p>
                <strong>Varış Saati : </strong>
                {dayjs(currentFlight?.arrivalDateTime).format(
                  "DD-MM-YYYY HH:mm:ss"
                )}
              </p>
            </Col>
          </Row>

          <Form.Item
            label="Name"
            name="Name"
            rules={[
              {
                required: true,
                min: 3,
                message: "Lüfen En Az 3 Karakter İçeren Bir İsim Giriniz!",
              },
            ]}
          >
            <Input placeholder="Name" />
          </Form.Item>

          <Form.Item
            label="Surname"
            name="Surname"
            rules={[
              {
                required: true,
                min: 3,
                message: "Lüfen En Az 3 Karakter İçeren Bir Soyisim Giriniz!",
              },
            ]}
          >
            <Input placeholder="Surname" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="Email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Lüfen Geçerli Formatta Bir Email Giriniz!",
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="PhoneNumber"
            rules={[
              {
                required: true,
                min: 10,
                message: "Lüfen Başında Sıfır İçermeyen Bir Telefon Giriniz!",
              },
            ]}
          >
            <Input placeholder="Phone" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="Address"
            rules={[
              {
                required: true,
                min: 3,
                message: "Lüfen En Az 3 Karakter İçeren Bir Adres Giriniz!",
              },
            ]}
          >
            <Input placeholder="Address" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="Description"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input placeholder="Description" />
          </Form.Item>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "1rem",
            }}
          >
            <p>
              <strong>Toplam: </strong>
              {currentFlight?.price}₺
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div>
              <Button htmlType="submit" type="primary">
                Submit
              </Button>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default FlightSearch;
