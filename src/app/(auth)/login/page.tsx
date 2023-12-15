"use client";
import React from "react";
import { Button, Form, Input } from "antd";
import { useMutation } from "@tanstack/react-query";
import { Login, Register } from "@/services/userServices/index";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const UserLogin = () => {
  const router = useRouter();
  const { data, mutateAsync, isPending, error } = useMutation({
    mutationFn: Login,
    mutationKey: ["login"],
    onSuccess: (data) => {
      toast.success("Giriş Başarılı");
      if (data.data?.token) {
        localStorage.setItem("token", data.data?.token);
        router.push("/");
      }
    },
    onError: (e) => {
      toast.error("Hata Meydana Geldi!");
    },
  });

  type FieldType = {
    email: string;
    password: string;
  };

  const onFinish = async (values: FieldType) => {
    await mutateAsync(values);
  };

  const onFinishFailed = (errorInfo: any) => {};

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ marginTop: "12rem" }}>Giriş Yap</h1>
      <Form
        style={{ width: "500px" }}
        name="basic"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
              required: true,
              message: "ütfen geçerli formatta bir email giriniz!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[
            {
              min: 3,
              required: true,
              message: "Lütfen en az 3 karakter içeren bir şifre giriniz!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item style={{ float: "right" }}>
          <Button type="primary" htmlType="submit">
            Giriş
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserLogin;
