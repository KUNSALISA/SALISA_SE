import React, { useState, useEffect } from "react";
import { Layout, Card, Input, Button, Row, Col, Modal, Form, Select, DatePicker } from "antd";
import { UserOutlined, SearchOutlined, UpOutlined, PlusOutlined } from "@ant-design/icons";
import {GetAllEmployees} from "../../services/https/index"
import {EmployeeInterface} from "../../interfaces/InterfaceFull"
import "./Employee.css";

const { Header, Footer, Content } = Layout;
const { Option } = Select;

const TeamPage: React.FC = () => {
  const [employees, setEmployees] = useState<EmployeeInterface[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      const data = await GetAllEmployees();
      setEmployees(data); 
    };
    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter(
    (employee) =>
      `${employee.E_FirstName} ${employee.E_LastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      (employee.PositionID ?? "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedEmployees = showAll ? filteredEmployees : filteredEmployees.slice(0, 8);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout className="team-layout">
      <Header className="team-header">
        <div className="team-title">
          <h1>OUR TEAM</h1>
          <p>
            If you're stressed about work, don’t quit just yet<br />
            because if you do, you'll end up stressing about money too.
          </p>
        </div>
      </Header>

      <Content className="team-content">
        <div className="team-info">
          <UserOutlined className="team-info-icon" />
          <span className="team-info-count">{employees.length}</span>
        </div>

        <div className="search-bar">
          <Input
            placeholder="Search by name or position"
            suffix={<SearchOutlined />}
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Row gutter={[24, 24]} className="team-cards">
          {displayedEmployees.map((employee) => (
            <Col span={6} key={employee.ID}>
              <Card
                className="team-card"
                cover={
                  <div
                    className="card-image"
                    style={{ backgroundImage: `url(${employee.Avatar})` }}
                  />
                }
              >
                <Card.Meta
                  title={`${employee.E_FirstName} ${employee.E_LastName}`}
                  description={`Position: ${employee.PositionID}`}
                  className="card-meta"
                />
              </Card>
            </Col>
          ))}
        </Row>

        {!showAll && filteredEmployees.length > 8 && (
          <div className="show-all-container">
            <Button type="primary" onClick={() => setShowAll(true)}>
              Show All
            </Button>
          </div>
        )}

        {showScrollToTop && (
          <Button
            type="primary"
            shape="circle"
            icon={<UpOutlined />}
            onClick={scrollToTop}
            className="scroll-to-top-btn"
          />
        )}
      </Content>

      <Footer className="team-footer">
        <div className="footer-content">About</div>
      </Footer>
    </Layout>
  );
};

export default TeamPage;
