import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Layout, Menu, Avatar, Dropdown } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import "./SharedLayout.css";
import logoc from "../assets/Logocat.png";

const { Header, Content } = Layout;

const SharedLayout: React.FC = () => {
  const avatar = localStorage.getItem("avatar");
  const firstName = localStorage.getItem("e_firstname");
  const lastName = localStorage.getItem("e_lastname");

  const handleLogout = () => {
    localStorage.removeItem("e_firstname");
    localStorage.removeItem("e_lastname");
    localStorage.removeItem("avatar");
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/";
  };

  const dropdownMenu = (
    <Menu>
      <Menu.Item key="1">
        <span style={{ fontWeight: "bold" }}>
          {firstName || "Unknown"} {lastName || "User"}
        </span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2" onClick={handleLogout} icon={<LogoutOutlined />}>
        Log out
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout className="layout">
      <Header className="header">
        <div className="logo">
          <img src={logoc} alt="Logo" className="logo-image" />
          <span className="logo-text">WAREHOUSE</span>
        </div>
        <Menu theme="dark" mode="horizontal" className="menu">
          <Menu.Item key="1">
            <Link to="/manager">Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/employee">Employee</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/customer">Customer</Link>
          </Menu.Item>
        </Menu>
        <div className="avatar-section">
          <Dropdown overlay={dropdownMenu} placement="bottomRight">
            <Avatar
              src={avatar}
              size="large"
              icon={!avatar && <UserOutlined />}
              style={{ cursor: "pointer" }}
            />
          </Dropdown>
        </div>
      </Header>
      <Content className="content">
        <Outlet />
      </Content>
    </Layout>
  );
};

export default SharedLayout;
