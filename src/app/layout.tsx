"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomQueryClient from "@/components/QueryClientProvider/QueryClientProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ConfigProvider, theme } from "antd";
import trTR from "antd/locale/tr_TR";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CustomQueryClient>
          <ConfigProvider
            theme={{
              algorithm: theme.defaultAlgorithm,
            }}
            locale={trTR}
          >
            <ToastContainer />
            {children}
          </ConfigProvider>
        </CustomQueryClient>
      </body>
    </html>
  );
}
