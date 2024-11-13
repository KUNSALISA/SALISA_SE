import React from 'react';
import { Card, Avatar, Button, Typography, Row, Col } from 'antd';
import { UserOutlined, PlusOutlined } from '@ant-design/icons';
import './employee.css';

const { Text, Title } = Typography;

const Team: React.FC = () => {
  return (
    <div className="team-container">
      <div className="header">
        <Avatar src="https://via.placeholder.com/150" size={96} icon={<UserOutlined />} />
        <Title level={2} className="header-title">WAREHOUSE</Title>
        <Avatar size={64} icon={<UserOutlined />} className="profile-avatar" />
      </div>
      <div className="banner">
        <Title level={1} className="banner-title">OUR TEAM</Title>
        <Text className="banner-text">If you're stressed about work, don't quit just yet—because if you do, you'll end up stressing about money too.</Text>
      </div>
      <div className="member-info">
        <Avatar icon={<UserOutlined />} size={48} />
        <Text className="member-id">10000000</Text>
        <Button icon={<PlusOutlined />} shape="circle" />
      </div>
      <Row gutter={[16, 16]} className="team-grid">
        {Array(6).fill(null).map((_, index) => (
          <Col xs={24} sm={12} md={8} key={index}>
            <Card className="team-card">
              <div className="team-card-content">
                <Avatar icon={<UserOutlined />} size={64} className="team-avatar" />
                <Text className="member-name">Rory Hong</Text>
                <Text type="secondary" className="member-position">Senior</Text>
                <Button icon={<PlusOutlined />} shape="circle" className="add-button" />
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="footer">
        <Button type="link" className="footer-button">About</Button>
      </div>
    </div>
  );
};

export default Team;
