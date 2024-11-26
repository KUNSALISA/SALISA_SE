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


import React, { useState  } from "react";
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
        title={<div className="ant-menu-title">Menu</div>}
        placement="left"
        onClose={toggleDrawer}
        visible={drawerVisible}
        className="drawer-menu"
      >
        <Menu mode="vertical">
          <Menu.Item key="1" icon={<img src="../../src/assets/building.png" alt="Home" style={{ width: 24 }} />}>
            <Link to="/manager">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<img src="../../src/assets/employees.png" alt="Employee" style={{ width: 24 }} />}>
            <Link to="/employee">Employee</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<img src="../../src/assets/public-relation.png" alt="Customer" style={{ width: 24 }} />}>
            <Link to="/customer">Customer</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<img src="../../src/assets/warehouse_menu.png" alt="Warehouse" style={{ width: 24 }} />}>
            <Link to="/warehouse">Warehouse</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<img src="../../src/assets/calculator.png" alt="Count" style={{ width: 24 }} />}>
            <Link to="/count">Count</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<img src="../../src/assets/box.png" alt="Products" style={{ width: 24 }} />}>
            <Link to="/products">Products</Link>
          </Menu.Item>
          <Menu.Item key="7" icon={<img src="../../src/assets/transaction.png" alt="Transaction" style={{ width: 24 }} />}>
            <Link to="/transaction">Transaction</Link>
          </Menu.Item>
          <Menu.Item key="8" icon={<img src="../../src/assets/supplier.png" alt="Supplier" style={{ width: 24 }} />}>
            <Link to="/supplier">Supplier</Link>
          </Menu.Item>
          <Menu.Item key="9" icon={<img src="../../src/assets/zone-picking.png" alt="Location" style={{ width: 24 }} />}>
            <Link to="/location">Location</Link>
          </Menu.Item>
          <Menu.Item key="10" icon={<img src="../../src/assets/completed-task.png" alt="Order" style={{ width: 24 }} />}>
            <Link to="/order">Order</Link>
          </Menu.Item>
          <Menu.Item key="11" icon={<img src="../../src/assets/distribution.png" alt="Shipment" style={{ width: 24 }} />}>
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