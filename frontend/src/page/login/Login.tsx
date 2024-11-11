import React from 'react';
import { Button, Input, Typography } from 'antd';
import './Login.css';

const { Title, Text } = Typography;

const WarehouseLogin: React.FC = () => {
  return (
    <div className="login-container">
      <div className="background-image" />
      <div className="form-container">
        <div className="logo">
          <img src="your-logo-url" alt="Category Box Logo" />
        </div>
        <Title className="welcome-title">
          <span>W</span>elcome to the <span>WAREHOUSE</span>
        </Title>
        
        <div className="login-form">
          <Text className="label">Email</Text>
          <Input className="input-field" type="email" placeholder="Enter your email" />
          
          <Text className="label">Password</Text>
          <Input.Password className="input-field" placeholder="Enter your password" />
          
          <Text className="forgot-password">Forgot password?</Text>
          
          <Button type="primary" className="login-button">LOGIN</Button>
          
          <div className="signup-text">
            Don’t have an account? <span className="signup-link">Sign Up</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarehouseLogin;
