"use client";
import React from "react";
import { Button, Form, Input } from "antd";
import { useMutation } from "@tanstack/react-query";
import { Register } from "@/services/userServices/index";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const UserRegister = () => {
  const router = useRouter();
  const { data, mutateAsync, isPending, error } = useMutation({
    mutationFn: Register,
    mutationKey: ["register"],
    onSuccess: (data) => {
      toast.success("Kayıt Başarılı, Giriş Ekranına Yönlendiriliyorsunuz!");
      router.push("/login");
    },
    onError: (e) => {
      toast.error("Hata Meydana Geldi!");
    },
  });

  type FieldType = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };

  const onFinish = async (values: FieldType) => {
    await mutateAsync(values);
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ marginTop: "12rem" }}>Kayıt Ol</h1>
      <Form
        style={{ width: "500px" }}
        name="basic"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="FirstName"
          name="firstName"
          rules={[
            {
              min: 3,
              required: true,
              message: "Lütfen en az 3 karakter içeren bir isim giriniz!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="LastName"
          name="lastName"
          rules={[
            {
              min: 3,
              required: true,
              message: "Lütfen en az 3 karakter içeren bir soyisim giriniz!",
            },
          ]}
        >
          <Input />
        </Form.Item>

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
            Kayıt Ol
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserRegister;
