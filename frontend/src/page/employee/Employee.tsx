import React, { useState, useEffect } from "react";
import { Layout, Card, Input, Button, Row, Col, Modal, Form } from "antd";
import {SearchOutlined, UpOutlined, PlusOutlined } from "@ant-design/icons";
import {EmployeeInterface} from "../../interfaces/InterfaceFull";
import {GetAllEmployees} from "../../services/https/index";
import staff from "../../assets/staff.png"
import "./Employee.css";

const { Header, Footer, Content } = Layout;

const Employee: React.FC = () => {
  const [employees, setEmployees] = useState<EmployeeInterface[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeInterface | null>(null);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [form] = Form.useForm();

  const getEmployees = async () => {
    let res = await GetAllEmployees();
    console.log("API Response:", res);
    if (res) {
      setEmployees(res.data);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.E_FirstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.E_LastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.Position?.Position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedEmployees = showAll ? filteredEmployees : filteredEmployees.slice(0, 8);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showModal = (employee: EmployeeInterface) => {
    setSelectedEmployee(employee);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedEmployee(null);
  };

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const closeAddModal = () => {
    setIsAddModalVisible(false);
    form.resetFields();
  };

  const handleAddEmployee = (values: any) => {
    console.log("New Employee Data:", values);
    closeAddModal();
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
          <img src={staff} alt="Team Icon" className="team-info-icon" />
          <span className="team-info-count">{employees.length}</span>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="add-btn"
            onClick={showAddModal}
          />
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
                    onClick={() => showModal(employee)}
                  />
                }
              >
                <Card.Meta
                  title={`${employee.E_FirstName} ${employee.E_LastName}`}
                  description={employee.Position?.Position}
                  className="card-meta"
                />
              </Card>
            </Col>
          ))}
        </Row>

        {!showAll && filteredEmployees.length > 8 && (
          <div className="show-all-container">
            <Button type="primary" onClick={() => setShowAll(true)}>
              Employee All
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

        <Modal
          title="Add New Employee"
          visible={isAddModalVisible}
          onCancel={closeAddModal}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={handleAddEmployee}>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true, message: "Please enter first name" }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title="Employee Details"
          visible={isModalVisible}
          onCancel={closeModal}
          footer={[
            <Button key="close" onClick={closeModal}>
              Close
            </Button>,
            <Button key="edit" type="primary">
              Edit
            </Button>,
          ]}
        >
          {selectedEmployee && (
            <>
              <p>
                <strong>Name:</strong> {selectedEmployee.E_FirstName}{" "}
                {selectedEmployee.E_LastName}
              </p>
              <p>
                <strong>Position:</strong> {selectedEmployee.Position?.Position}
              </p>
            </>
          )}
        </Modal>
      </Content>
    </Layout>
  );
};

export default Employee;
