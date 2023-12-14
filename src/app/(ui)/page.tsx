"use client";
import React from "react";
import { DatePicker, Space } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import FlightSearch from "../../components/flightSearch";
import ExampleCitiyCards from "../../components/exampleCitiyCards";

const { RangePicker } = DatePicker;
const disabledDate: RangePickerProps["disabledDate"] = (current) => {
  // Can not select days before today and today
  return current && current < dayjs().endOf("day");
};

const page = () => {
  return (
    <div style={{ position: "relative", top: "-50px" }}>
      <FlightSearch />
      <ExampleCitiyCards />
    </div>
  );
};

export default page;
