import React from 'react';
import { Button, Input, Form, Typography } from 'antd';
import './Login.css';
import wareh from '../../assets/warehouse.jpg'
import title_e from '../../assets/title.png'
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
          <div className="title-image">
              <img src={title_e} alt="title" />
          </div>
            <div className="span"></div>
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
