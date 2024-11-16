import React from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose }) => {
  const handleSignup = async (values: any) => {
    try {
      const response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (response.ok) {
        message.success("Signup Successful!");
        onClose();
      } else {
        message.error(data.message || "Signup Failed");
      }
    } catch (error) {
      message.error("Network Error");
    }
  };

  return (
    <Modal
      title="Sign Up"
      visible={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <Form name="signup_form" onFinish={handleSignup} layout="vertical">
        <Form.Item
          name="firstName"
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="First Name" />
        </Form.Item>

        <Form.Item
          name="lastName"
          rules={[{ required: true, message: "Please input your last name!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Last Name" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" type="email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="signup-button">
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SignupModal;
