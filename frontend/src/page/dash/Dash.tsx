// import React, { useState, useEffect } from 'react';
// import { Table, Button, Input } from 'antd';
// import { useNavigate } from 'react-router-dom';
// import './Dash.css';

// const { Search } = Input;

// interface Employee {
//   id: number;
//   firstName: string;
//   lastName: string;
//   position: string;
//   startDate: string;
// }

// interface Customer {
//   id: number;
//   firstName: string;
//   lastName: string;
// }

// const Warehouse: React.FC = () => {
//   const [data, setData] = useState<Array<Employee | Customer>>([]);
//   const [isEmployee, setIsEmployee] = useState(true);
//   const [filteredData, setFilteredData] = useState<Array<Employee | Customer>>([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch data from backend API
//     const fetchData = async () => {
//       const endpoint = isEmployee ? '/api/employees' : '/api/customers';
//       const response = await fetch(endpoint);
//       const result = await response.json();
//       if (!isEmployee) {
//         // Add position field for customers
//         result.forEach((customer: Customer) => {
//           customer.position = 'Customer';
//         });
//       }
//       setData(result);
//       setFilteredData(result);
//     };
//     fetchData();
//   }, [isEmployee]);

//   const handleSearch = (value: string) => {
//     const filtered = data.filter((item: any) =>
//       `${item.firstName} ${item.lastName}`.toLowerCase().includes(value.toLowerCase())
//     );
//     setFilteredData(filtered);
//   };

//   const columns = [
//     {
//       title: 'First Name',
//       dataIndex: 'firstName',
//       key: 'firstName',
//     },
//     {
//       title: 'Last Name',
//       dataIndex: 'lastName',
//       key: 'lastName',
//     },
//     {
//       title: 'Position',
//       dataIndex: 'position',
//       key: 'position',
//     },
//     {
//       title: 'Start Date',
//       dataIndex: 'startDate',
//       key: 'startDate',
//       render: (text: string) => (isEmployee ? text : '-'),
//     },
//   ];

//   return (
//     <div className="warehouse-container">
//       <div className="header">
//         <img src="https://via.placeholder.com/192x172" alt="logo" className="logo" />
//         <h1 className="title">WAREHOUSE</h1>
//         <div className="button-group">
//           <Button
//             type="primary"
//             className="nav-button"
//             onClick={() => {
//               setIsEmployee(true);
//             }}
//           >
//             Employee
//           </Button>
//           <Button
//             type="primary"
//             className="nav-button"
//             onClick={() => {
//               setIsEmployee(false);
//             }}
//           >
//             Customer
//           </Button>
//         </div>
//         <div className="profile-icon"></div>
//       </div>
//       <div className="content">
//         <Search
//           placeholder="Search by name"
//           onSearch={handleSearch}
//           className="search-bar"
//         />
//         <Table
//           columns={columns}
//           dataSource={filteredData}
//           rowKey="id"
//           className="data-table"
//         />
//       </div>
//     </div>
//   );
// };

// export default Warehouse;

// import React from "react";

// const ManagerPage: React.FC = () => {
//   const avatar = localStorage.getItem("avatar");

//   return (
//     <div>
//       <h1>Welcome, Manager!</h1>
//       {avatar && (
//         <img
//           src={avatar}
//           alt="Manager Avatar"
//           style={{ width: "100px", borderRadius: "50%" }}
//         />
//       )}
//     </div>
//   );
// };

// export default ManagerPage;

import React from "react";
import { Layout, Menu, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./Dash.css";

const { Header, Content } = Layout;

const ManagerPage: React.FC = () => {
  const avatar = localStorage.getItem("avatar");

  return (
    <Layout className="layout">
      <Header className="header">
        <div className="logo">
          <img src="/logo.png" alt="Logo" className="logo-image" />
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
          {avatar ? (
            <Avatar src={avatar} size="large" />
          ) : (
            <Avatar icon={<UserOutlined />} size="large" />
          )}
        </div>
      </Header>
      <Content className="content">
        <div className="search-section">
          <input type="text" placeholder="Search" className="search-input" />
          <button className="search-button">
            <span role="img" aria-label="search">
              🔍
            </span>
          </button>
        </div>
      </Content>
    </Layout>
  );
};

export default ManagerPage;
