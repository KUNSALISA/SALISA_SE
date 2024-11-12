import React from 'react';
import { Button, Input, Form, Typography } from 'antd';
import './Login.css';
import wareh from '../../assets/warehouse.jpg'
import logocat from '../../assets/Logocat.png'
import people_m from '../../assets/peoplemanage.png'

const { Title, Text, Link } = Typography;

const WarehouseLogin: React.FC = () => {
  return (
    <div className="login-container">
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
          <img src={logocat} alt="Logo" className="logo" />
          <Title level={1} className="welcome-text">
            <div className="text-wrapper">
              <span className="highlight-text-1">W</span>
              <div className="sub-text">
                <span className="highlight-text-2"><span className="spaced-letter"></span>elcome to the</span>
                <span className="highlight-text-3">AREHOUSE</span>
              </div>
            </div>
          </Title>
          <Form className="login-form" layout="vertical">
            <Form.Item label="Email" name="email">
              <Input placeholder="Enter your email" />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input.Password placeholder="Enter your password" />
              <Button type="primary" htmlType="submit" className="login-button">
                LOGIN
              </Button>
            </Form.Item>
            <Text>
              Don't have an account? <Link>Sign Up</Link>
            </Text>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default WarehouseLogin;
