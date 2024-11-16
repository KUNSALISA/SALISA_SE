import React, { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import SignupModal from "./SignupModal";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const { Title, Text } = Typography;

const LoginPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values: any) => {
    try {
      const response = await fetch("http://localhost:8080/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (response.ok) {
        message.success("Login Successful!");
        localStorage.setItem("token", data.token);
        localStorage.setItem("accessLevel", data.accessLevel);

        // ตรวจสอบ AccessLevel และนำทางไปยังหน้าแดชบอร์ดที่เหมาะสม
        switch (data.accessLevel) {
          case "Manager":
            navigate("/manager-dashboard");
            break;
          case "A":
            navigate("/a-dashboard");
            break;
          case "B":
            navigate("/b-dashboard");
            break;
          case "C":
            navigate("/c-dashboard");
            break;
          case "D":
            navigate("/d-dashboard");
            break;
          default:
            message.error("Access Level not recognized");
        }
      } else {
        message.error(data.message || "Login Failed");
      }
    } catch (error) {
      message.error("Network Error");
    }
  };

  return (
    <div className="login-container">
      <Title level={2}>Login</Title>
      <Form
        name="login_form"
        onFinish={handleLogin}
        layout="vertical"
        className="login-form"
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Email" type="email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-button">
            Login
          </Button>
        </Form.Item>
        <Text>
          Don't have an account?{" "}
          <Text
            type="secondary"
            className="signup-link"
            onClick={() => setIsModalOpen(true)}
          >
            Sign Up
          </Text>
        </Text>
      </Form>

      <SignupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default LoginPage;
