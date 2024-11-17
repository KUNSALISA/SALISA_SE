// import { SignIn } from "../services/https/index";
// import { useNavigate } from "react-router-dom";
// import { Form, Input, Button, message } from "antd";
// import {SignInInterface} from '../interfaces/SignIn';
// import {EmployeeInterface} from '../interfaces/InterfaceFull';

// function SignInPages() {
//   const navigate = useNavigate();
//   const [messageApi, contextHolder] = message.useMessage();

//   const onFinish = async (values: SignInInterface) => {
//     let res = await SignIn(values);

//     if (res.status === 200) {
//       const { token, token_type, id, access_level } = res.data;

//       messageApi.success("Sign-in successful");

//       localStorage.setItem("isLogin", "true");
//       localStorage.setItem("token", token);
//       localStorage.setItem("token_type", token_type);
//       localStorage.setItem("id", id);
//       localStorage.setItem("access_level", access_level);

//       // Redirect based on access_level
//       switch (access_level) {
//         case "Manager":
//           navigate("/manager");
//           break;
//         case "A":
//           navigate("/page-a");
//           break;
//         case "B":
//           navigate("/page-b");
//           break;
//         case "C":
//           navigate("/page-c");
//           break;
//         case "D":
//           navigate("/page-d");
//           break;
//         default:
//           navigate("/dashboard");
//       }
//     } else {
//       messageApi.error(res.data.error || "Sign-in failed");
//     }
//   };

//   return (
//     <>
//       {contextHolder}
//       <Form name="signIn" onFinish={onFinish} autoComplete="off" layout="vertical">
//         <Form.Item
//           label="Email"
//           name="Email"
//           rules={[{ required: true, message: "Please input your email!" }]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           label="Password"
//           name="Password"
//           rules={[{ required: true, message: "Please input your password!" }]}
//         >
//           <Input.Password />
//         </Form.Item>

//         <Form.Item>
//           <Button type="primary" htmlType="submit" className="login-form-button">
//             Log in
//           </Button>
//         </Form.Item>
//       </Form>
//     </>
//   );
// }

// export default SignInPages;

import React, { useState } from "react";
import { Button, Input, Form, Typography, Modal, Select, message } from "antd";
import { useNavigate } from "react-router-dom";
import "../page/login/Login.css";
import wareh from "../assets/warehouse.jpg";
import title_e from "../assets/title.png";
import people_m from "../assets/peoplemanage.png";
import { SignIn } from "../services/https/index"; 
import {SignInInterface} from '../interfaces/SignIn';

const { Title, Text, Link } = Typography;
const { Option } = Select;

const WarehouseLogin: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleRegister = (values: any) => {
    console.log("Register values:", values);
    setIsModalVisible(false);
  };

  const onFinish = async (values: SignInInterface) => {
    let res = await SignIn(values);

    if (res.status === 200) {
      const { token, token_type, id, access_level } = res.data;

      messageApi.success("Sign-in successful");

      // เก็บข้อมูลใน localStorage
      localStorage.setItem("isLogin", "true");
      localStorage.setItem("token", token);
      localStorage.setItem("token_type", token_type);
      localStorage.setItem("id", id);
      localStorage.setItem("access_level", access_level);

      // เปลี่ยนหน้าเพจตาม access_level
      switch (access_level) {
        case "Manager":
          navigate("/manager");
          break;
        case "A":
          navigate("/page-a");
          break;
        case "B":
          navigate("/page-b");
          break;
        case "C":
          navigate("/page-c");
          break;
        case "D":
          navigate("/page-d");
          break;
        default:
          navigate("/dashboard");
      }
    } else {
      messageApi.error(res.data.error || "Sign-in failed");
    }
  };

  return (
    <div className="login-container">
      {contextHolder}
      <div className="background-square"></div>
      <div className="background-square-1"></div>
      <div className="background-square-2"></div>
      <div className="background-square-3"></div>
      <div className="background-square-4"></div>
      <div className="background-square-5"></div>
      <div className="background-square-6"></div>
      <div className="warehouse-image">
        <img src={wareh} alt="Warehouse" />
      </div>
      <div className="login-box">
        <div className="employ-image">
          <img src={people_m} alt="employ" />
        </div>
        <div className="login-content">
          <div className="title-image">
            <img src={title_e} alt="title" />
          </div>
          <div className="span"></div>
          <Form className="login-form" layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-button">
                LOGIN
              </Button>
            </Form.Item>
          </Form>
          <Text>
            Don't have an account? <Link onClick={showModal}>Sign Up</Link>
          </Text>
        </div>
      </div>
      <Modal
        title="Register"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleRegister}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
          <Form.Item
            label="Position"
            name="position"
            rules={[{ required: true, message: "Please select your position!" }]}
          >
            <Select placeholder="Select your position">
              <Option value="admin">Admin</Option>
              <Option value="staff">Staff</Option>
              <Option value="manager">Manager</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="register-button">
              Register
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default WarehouseLogin;
