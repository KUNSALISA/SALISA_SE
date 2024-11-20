import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <Menu mode="horizontal" theme="dark" style={{ display: "flex", justifyContent: "center" }}>
      <Menu.Item key="home">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="employee">
        <Link to="/employee">Employee</Link>
      </Menu.Item>
      <Menu.Item key="customer">
        <Link to="/customer">Customer</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;
