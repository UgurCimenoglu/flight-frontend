"use client";
/* eslint-disable @next/next/no-img-element */
import { LogoutOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, MenuProps } from "antd";
import React from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const items: MenuProps["items"] = [
    {
      label: "Profil",
      key: "profile",
      onClick: () => {
        router.push("my-profile");
      },
    },
    {
      icon: <LogoutOutlined />,
      label: "Çıkış Yap",
      key: "logout",
      onClick: () => {
        localStorage.removeItem("token");
        router.push("/login");
      },
    },
  ];
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "4rem",
          padding: "0 1rem",
        }}
      >
        <div>
          <img
            style={{ cursor: "pointer" }}
            onClick={() => {
              router.push("/");
            }}
            src="https://www.biletbank.com/wp-content/uploads/thegem-logos/logo_bae4158c2e9d0d3c7e2a369842f4c823_1x.png"
            alt="photo"
          />
        </div>
        <div style={{ paddingRight: "1rem" }}>
          <Dropdown menu={{ items }} placement="bottomRight">
            <Avatar
              size="default"
              src={"https://cdn-icons-png.flaticon.com/512/9131/9131529.png"}
            />
          </Dropdown>
        </div>
      </div>
      <hr style={{ opacity: ".1" }} />
    </div>
  );
};

export default Navbar;
