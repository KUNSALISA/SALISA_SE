// import React from "react";

// const CustomerPage: React.FC = () => {
//   return (
//     <div>
//       <h1>Customer Page</h1>
//       <p>This is the customer-specific page.</p>
//     </div>
//   );
// };

// export default CustomerPage;

import React from "react";
import { Card, Avatar, Button, Typography, Row, Col } from "antd";
import { UserOutlined, PlusOutlined } from "@ant-design/icons";
import "./CustomerPage.css";

const { Title, Text } = Typography;

const CustomerPage: React.FC = () => {
  const teamMembers = [
    { name: "Rory Hong", position: "Senior" },
    { name: "Rory Hong", position: "Senior" },
    { name: "Rory Hong", position: "Senior" },
  ];

  return (
    <div className="customer-page">
      {/* Header Section */}
      <div className="header">
        <div className="logo">
          <Avatar size={96} icon={<UserOutlined />} />
          <Title level={1} style={{ color: "white" }}>WAREHOUSE</Title>
        </div>
        <Button className="home-button">HOME</Button>
        <Avatar className="profile-avatar" icon={<UserOutlined />} />
      </div>

      {/* Customer Section */}
      <div className="customer-info">
        <Title level={2} className="customer-title">CUSTOMER</Title>
        <Text className="customer-subtitle">Customer success is our mission.</Text>
        <div className="statistics">
          <Avatar size={96} src="https://via.placeholder.com/132x96" />
          <Title level={1}>2000</Title>
          <Button type="primary" shape="circle" icon={<PlusOutlined />} />
        </div>
      </div>

      {/* Team Cards Section */}
      <Row gutter={[16, 16]} className="team-grid">
        {teamMembers.map((member, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6}>
            <Card className="team-card">
              <Avatar size={96} icon={<UserOutlined />} />
              <Title level={4}>{member.name}</Title>
              <Text>{member.position}</Text>
              <Button type="primary" shape="circle" icon={<PlusOutlined />} />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Footer Section */}
      <div className="footer">
        <Text style={{ color: "white", fontSize: 24 }}>About</Text>
      </div>
    </div>
  );
};

export default CustomerPage;
