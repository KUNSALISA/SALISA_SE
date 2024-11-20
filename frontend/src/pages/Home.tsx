import React from "react";
import { Input, Layout } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Content } = Layout;

const Home: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ background: "#0F515E" }}>
        <div style={{ textAlign: "center", padding: "20px" }}>
          <h1 style={{ color: "white", fontSize: "48px", fontFamily: "Bree Serif" }}>WAREHOUSE</h1>
        </div>

        <div style={{ textAlign: "center" }}>
          <Input
            placeholder="Search"
            style={{
              width: "50%",
              padding: "10px",
              borderRadius: "8px",
            }}
            prefix={<SearchOutlined />}
          />
        </div>

        <div style={{ margin: "50px auto", width: "70%", background: "white", padding: "20px", borderRadius: "8px" }}>
          <p style={{ textAlign: "center" }}>Table content goes here...</p>
        </div>
      </Content>
    </Layout>
  );
};

export default Home;
