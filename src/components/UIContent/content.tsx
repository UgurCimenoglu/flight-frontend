import { Content } from "antd/es/layout/layout";
import React from "react";
import CarouselComp from "../homeCarousel/carousel";

const UIContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <Content
      style={{
        minHeight: "90vh",
        backgroundColor: "white",
      }}
    >
      <CarouselComp />
      <div className="container">{children}</div>
    </Content>
  );
};

export default UIContent;
