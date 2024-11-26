// import React from "react";
// import { Link, Outlet, useNavigate } from "react-router-dom";
// import { Layout, Menu, Avatar, Button } from "antd";
// import { UserOutlined} from "@ant-design/icons";
// import "./Layout.css";
// import logoc from "../assets/Logocat.png";

// const { Header, Content, Footer } = Layout;

// const SharedLayout: React.FC = () => {
//   const avatar = localStorage.getItem("avatar");
//   const firstName = localStorage.getItem("e_firstname");
//   const lastName = localStorage.getItem("e_lastname");
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("e_firstname");
//     localStorage.removeItem("e_lastname");
//     localStorage.removeItem("avatar");
//     localStorage.removeItem("isLoggedIn");
//     navigate("/");
//   };

//   return (
//     <Layout className="layout">
//       <Header className="header">
//         <div className="logo">
//           <img src={logoc} alt="Logo" className="logo-image" />
//           <span className="logo-text">WAREHOUSE</span>
//         </div>
//         <Menu theme="dark" mode="horizontal" className="menu">
//           <Menu.Item key="1">
//             <Link to="/manager">Home</Link>
//           </Menu.Item>
//           <Menu.Item key="2">
//             <Link to="/employee">Employee</Link>
//           </Menu.Item>
//           <Menu.Item key="3">
//             <Link to="/customer">Customer</Link>
//           </Menu.Item>
//         </Menu>
//         <div className="avatar-section">
//           <Avatar
//             src={avatar ? `http://localhost:8080${avatar}` : undefined}
//             size="large"
//             icon={!avatar && <UserOutlined />}
//           />
//           <span className="user-name">
//             {firstName} {lastName}
//           </span>

//           <Button
//             type="link"
//             onClick={handleLogout}
//             className="logout-button"
//             style={{ color: "white" }}
//           >
//           <img 
//             src="../../src/assets/close.png" 
//             alt="Logout" 
//             className="logout-icon"
//           />
//           </Button>
//         </div>
//       </Header>
//       <Content className="content">
//         <Outlet />
//       </Content>
//       <Footer className="footer">
//         <div className="footer-content">support@warehouse.com</div>
//       </Footer>
//     </Layout>
//   );
// };

// export default SharedLayout;


import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Layout, Menu, Avatar, Button, Drawer } from "antd";
import { UserOutlined} from "@ant-design/icons";
import "./Layout.css";
import logoc from "../assets/Logocat.png";

const { Header, Content, Footer } = Layout;

const SharedLayout: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const avatar = localStorage.getItem("avatar");
  const firstName = localStorage.getItem("e_firstname");
  const lastName = localStorage.getItem("e_lastname");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("e_firstname");
    localStorage.removeItem("e_lastname");
    localStorage.removeItem("avatar");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  return (
    <Layout className="layout">
      <Header className="header">
        <div className="logo">
          <img src={logoc} alt="Logo" className="logo-image" />
          <span className="logo-text">WAREHOUSE</span>
        </div>
        <img
          src="../../src/assets/menu2.gif" 
          alt="Menu Icon"
          onClick={toggleDrawer} 
          className="menu-toggle-gif"
        />
        <div className="avatar-section">
          <Avatar
            src={avatar ? `http://localhost:8080${avatar}` : undefined}
            size="large"
            icon={!avatar && <UserOutlined />}
            className="avatar-s"
          />
          <span className="user-name">
            {firstName} {lastName}
          </span>
          <Button
            type="link"
            onClick={handleLogout}
            className="logout-button"
            style={{ color: "white" }}
          >
            <img
              src="../../src/assets/close.png"
              alt="Logout"
              className="logout-icon"
            />
          </Button>
        </div>
      </Header>
      <Drawer
        title="Menu"
        placement="left"
        onClose={toggleDrawer}
        visible={drawerVisible}
        className="drawer-menu"
      >
        <Menu mode="vertical">
          <Menu.Item key="1">
            <Link to="/manager">Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/employee">Employee</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/customer">Customer</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/warehouse">Warehouse</Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to="/count">Count</Link>
          </Menu.Item>
          <Menu.Item key="6">
            <Link to="/products">Products</Link>
          </Menu.Item>
          <Menu.Item key="7">
            <Link to="/transaction">Transaction</Link>
          </Menu.Item>
          <Menu.Item key="8">
            <Link to="/supplier">Supplier</Link>
          </Menu.Item>
          <Menu.Item key="9">
            <Link to="/location">Location</Link>
          </Menu.Item>
          <Menu.Item key="10">
            <Link to="/order">Order</Link>
          </Menu.Item>
          <Menu.Item key="11">
            <Link to="/shipment">Shipment</Link>
          </Menu.Item>
        </Menu>
      </Drawer>
      <Content className="content">
        <Outlet />
      </Content>
      <Footer className="footer">
        <div className="footer-content">support@warehouse.com</div>
      </Footer>
    </Layout>
  );
};

export default SharedLayout;