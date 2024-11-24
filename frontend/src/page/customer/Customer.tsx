import React, { useState, useEffect } from "react";
import { Layout, Card, Input, Button, Row, Col, Modal, Form } from "antd";
import { SearchOutlined, UpOutlined, PlusOutlined } from "@ant-design/icons";
import {CustomerInterface} from "../../interfaces/InterfaceFull";
import {GetAllCustomers} from "../../services/https/index";
import rating from "../../assets/rating.png";
import "./Customer.css";

const { Header, Footer, Content } = Layout;

const Employee: React.FC = () => {
  const [customers, setCustomers] = useState<CustomerInterface[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState<CustomerInterface | null>(null);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [form] = Form.useForm();

  const getcustomers = async () => {
    let res = await GetAllCustomers();
    console.log("API Response:", res);
    if (res) {
      setCustomers(res.data);
    }
  };

  useEffect(() => {
    getcustomers();
  }, []);

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.FirstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.LastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.Number?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedCustomers = showAll ? filteredCustomers : filteredCustomers.slice(0, 8);

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

  const showModal = (customer: CustomerInterface) => {
    setSelectedCustomers(customer);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedCustomers(null);
  };

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const closeAddModal = () => {
    setIsAddModalVisible(false);
    form.resetFields();
  };

  const handleAddEmployee = (values: any) => {
    console.log("New Customer Data:", values);
    closeAddModal();
  };

  return (
    <Layout className="customer-layout">
      <Header className="customer-header">
        <div className="customer-title">
          <h1>CUSTOMER</h1>
          <p>
           Customer success is our mission.
          </p>
        </div>
      </Header>

      <Content className="team-content">
        <div className="team-info">
          <img src={rating} alt="Cus Icon" className="customer-info-icon" />
          <span className="team-info-count-cus">{customers.length}</span>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="add-btn"
            onClick={showAddModal}
          />
        </div>

        <div className="search-bar">
          <Input
            placeholder="Search by name or number"
            suffix={<SearchOutlined />}
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Row gutter={[24, 24]} className="team-cards">
          {displayedCustomers.map((customer) => (
            <Col span={6} key={customer.ID}>
              <Card
                className="team-card"
                cover={
                  <div
                    className="card-image"
                    style={{ backgroundImage: `url(${customer.Avatar})` }}
                    onClick={() => showModal(customer)}
                  />
                }
              >
                <Card.Meta
                  title={`${customer.FirstName} ${customer.LastName}`}
                  description={customer.Number}
                  className="card-meta"
                />
              </Card>
            </Col>
          ))}
        </Row>

        {!showAll && filteredCustomers.length > 8 && (
          <div className="show-all-container" onClick={() => setShowAll(true)}>
            <img 
              src="../../../src/assets/down-arrows.png" 
              alt="drop" 
              className="logout-icon-drop"
            />
          </div>
        )}

        {showScrollToTop && (
          <Button
            type="primary"
            shape="circle"
            icon={<UpOutlined />}
            onClick={scrollToTop}
            className="scroll-to-top-btn-cus"
          />
        )}

        <Modal
          title="Add New Customer"
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
          {selectedCustomers && (
            <>
              <p>
                <strong>Name:</strong> {selectedCustomers.FirstName}{" "}
                {selectedCustomers.LastName}
              </p>
              <p>
                <strong>Number:</strong> {selectedCustomers.Number}
              </p>
            </>
          )}
        </Modal>
      </Content>
    </Layout>
  );
};

export default Employee;
