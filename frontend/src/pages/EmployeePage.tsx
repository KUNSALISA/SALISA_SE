

import React from "react";
import { Card, Button, Row, Col, Typography, Avatar } from "antd";
import "./TeamPage.css";

const { Title, Text } = Typography;

const EmployeePage: React.FC = () => {
  const teamMembers = [
    { name: "Rory Hong", position: "senior" },
    { name: "Rory Hong", position: "senior" },
    { name: "Rory Hong", position: "senior" },
    { name: "Rory Hong", position: "senior" },
    { name: "Rory Hong", position: "senior" },
    { name: "Rory Hong", position: "senior" },
  ];

  return (
    <div className="team-page">
      <div className="header">
        <div className="logo">
          <Title level={1} style={{ color: "white" }}>WAREHOUSE</Title>
        </div>
        <Button className="home-button">HOME</Button>
        <Avatar className="profile-avatar" />
      </div>
      <div className="content">
        <Title level={2} className="title">OUR TEAM</Title>
        <Text className="subtitle">
          If you're stressed about work, don’t quit just yet—because if you do, you'll end up stressing about money too.
        </Text>
        <div className="statistics">
          <Avatar size={96} src="https://via.placeholder.com/132x96" />
          <Title level={1}>10000000</Title>
        </div>
        <Row gutter={[16, 16]} className="team-grid">
          {teamMembers.map((member, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6}>
              <Card className="team-card">
                <div className="card-content">
                  <Avatar size={96} src="https://via.placeholder.com/192x172" />
                  <Title level={4}>{member.name}</Title>
                  <Text>{member.position}</Text>
                  <Button type="primary" shape="circle" icon="+" />
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default EmployeePage;
