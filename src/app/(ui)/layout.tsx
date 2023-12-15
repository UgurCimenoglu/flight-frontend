"use client";

import { ConfigProvider, Layout, theme } from "antd";
import React from "react";
import Navbar from "../../components/navbar/navbar";
import FooterComp from "../../components/footer/footer";
import UIContent from "../../components/UIContent/content";
import CustomAuthGuard from "@/components/authGuard";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <CustomAuthGuard>
      <>
        <Navbar />
        <Layout>
          <UIContent>{children}</UIContent>
        </Layout>
        <FooterComp />
      </>
    </CustomAuthGuard>
  );
}
