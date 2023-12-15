"use client";
import { Spin } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

const CustomAuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const token = localStorage.getItem("token");

  if (typeof window !== "undefined" && token === null) router.push("/login");

  if (!token) return <Spin fullscreen />;

  return children;
};

export default CustomAuthGuard;
