import { Carousel } from "antd";
import Image from "next/image";
import React from "react";

const CarouselComp = () => {
  const contentStyle: React.CSSProperties = {
    margin: 0,
    height: "360px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  return (
    <Carousel autoplay>
      <div>
        <img
          width={"100%"}
          height={"460px"}
          style={{ objectFit: "cover" }}
          src="https://plus.unsplash.com/premium_photo-1679830513990-82a4280f41b4?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="slider1"
        />
      </div>
      <div>
        <img
          width={"100%"}
          height={"460px"}
          style={{ objectFit: "cover" }}
          src="https://images.unsplash.com/photo-1529074963764-98f45c47344b?q=80&w=2686&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="slider1"
        />
      </div>
      <div>
        <img
          width={"100%"}
          height={"460px"}
          style={{ objectFit: "cover" }}
          src="https://images.unsplash.com/photo-1553431340-5da1bd9101e9?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="slider1"
        />
      </div>
    </Carousel>
  );
};

export default CarouselComp;
