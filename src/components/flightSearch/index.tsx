import { Button, Card, Form, InputNumber, Select } from "antd";
import React from "react";
import { DatePicker, Space } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

const { RangePicker } = DatePicker;
const disabledDate: RangePickerProps["disabledDate"] = (current) => {
  // Can not select days before today and today
  return current && current < dayjs().endOf("day");
};

const onFinish = (values: any) => {};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const FlightSearch = () => {
  const router = useRouter();
  return (
    <Card
      style={{
        zIndex: "33",
        boxShadow: "1px 1px 24px 1px rgba(208, 216, 243, 0.6)",
      }}
    >
      <Form
        name="basic"
        layout="vertical"
        onFinish={(values) => {
          const departureDate = dayjs(values.date[0].$d).format("DD-MM-YYYY");
          const arrivedDate = dayjs(values.date[1].$d).format("DD-MM-YYYY");
          const from = values.from;
          const to = values.to;

          router.push(
            `/flight-search?departureDate=${departureDate}&arrivedDate=${arrivedDate}&from=${from}&to=${to}`
          );
        }}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Form.Item
          label="Gidiş - Dönüş Tarihi"
          name="date"
          rules={[
            { required: true, message: "Lüfen Gidiş-Dönüş Tarihi Giriniz!" },
          ]}
        >
          <RangePicker name="date" disabledDate={disabledDate} />
        </Form.Item>

        <Form.Item
          label="Nereden"
          name="from"
          rules={[
            { required: true, message: "Lüfen Gidiş-Dönüş Tarihi Giriniz!" },
          ]}
          style={{ width: "15rem" }}
        >
          <Select>
            <Select.Option value="34-Istanbul">İstanbul</Select.Option>
            <Select.Option value="35-Izmir">İzmir</Select.Option>
            <Select.Option value="06-Ankara">Ankara</Select.Option>
            <Select.Option value="61-Trabzon">Trabzon</Select.Option>
            <Select.Option value="07-Antalya">Antalya</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Nereye"
          name="to"
          rules={[
            { required: true, message: "Lüfen Gidiş-Dönüş Tarihi Giriniz!" },
          ]}
          style={{ width: "15rem" }}
        >
          <Select>
            <Select.Option value="34-Istanbul">İstanbul</Select.Option>
            <Select.Option value="35-Izmir">İzmir</Select.Option>
            <Select.Option value="06-Ankara">Ankara</Select.Option>
            <Select.Option value="61-Trabzon">Trabzon</Select.Option>
            <Select.Option value="07-Antalya">Antalya</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Yolcu Sayısı"
          name="count"
          rules={[{ required: true, message: "Lüfen Yolcu Sayısı Giriniz!" }]}
          style={{ width: "15rem" }}
        >
          <InputNumber style={{ width: "15rem" }} min={1} max={10} />
        </Form.Item>
        <Button htmlType="submit" size="large">
          Uçuş Ara
        </Button>
      </Form>
    </Card>
  );
};

export default FlightSearch;
