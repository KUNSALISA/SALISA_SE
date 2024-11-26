import React, { useState, useEffect } from "react";
import { Layout, Card, Input, Button, Row, Col, Modal, Form, message, Select, Upload, Space } from "antd";
import { SearchOutlined, UpOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {CustomerInterface, GendersInterface} from "../../interfaces/InterfaceFull";
import {GetAllCustomers, GetGender, CreateCustomer} from "../../services/https/index";
import type { GetProp, UploadFile, UploadProps } from "antd";
import ImgCrop from "antd-img-crop";
import rating from "../../assets/rating.png";
import "./Customer.css";

const { Header, Content } = Layout;
const { Option } = Select;
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const Customer: React.FC = () => {
  const [customers, setCustomers] = useState<CustomerInterface[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [genders, setGenders] = useState<GendersInterface[]>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState<CustomerInterface | null>(null);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [form] = Form.useForm();

  const getcustomers = async () => {
    let res = await GetAllCustomers();
    if (res) {
      setCustomers(res.data);
    }
  };

  const getGender = async () => {
    let res = await GetGender();
    if (res && Array.isArray(res.data)) {
      setGenders(res.data);
    } 
  };

  useEffect(() => {
    getcustomers();
    getGender();
  }, []);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const onFinish = async (values: CustomerInterface) => {
    if (fileList.length === 0) {
      messageApi.open({
        type: "error",
        content: "กรุณาอัปโหลดรูปประจำตัว!",
      });
      return;
    }
    
    const avatarUrl = fileList[0].thumbUrl || fileList[0].url;
    if (!avatarUrl) {
      messageApi.open({
        type: "error",
        content: "ไม่สามารถอ่านไฟล์รูปได้!",
      });
      return;
    }
  
    values.Avatar = avatarUrl;
  
    const res = await CreateCustomer(values);
    if (res) {
      messageApi.open({
        type: "success",
        content: "บันทึกข้อมูลสำเร็จ",
      });
      await getcustomers();
      form.resetFields();
      setFileList([]);
      closeAddModal(); 
    } else {
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาด!",
      });
    }
  };
  
  

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
          <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="First Name"
                name="FirstName"
                rules={[{ required: true, message: "Please enter first name" }]}
              >
                <Input placeholder="Enter first name" />
              </Form.Item>
              <Form.Item
                label="Last Name"
                name="LastName"
                rules={[{ required: true, message: "Please enter last name" }]}
              >
                <Input placeholder="Enter last name" />
              </Form.Item>
              <Form.Item
                label="Gender"
                name="GenderID"
                rules={[{ required: true, message: "Please select a gender!" }]}
              >
                <Select allowClear placeholder="Select gender">
                  {genders.map((item) => (
                    <Option value={item.ID} key={item.Gender}>
                      {item.Gender}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Phone Number"
                name="Number"
                rules={[{ required: true, message: "Please enter Phone Number" }]}
              >
                <Input placeholder="Enter last name" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="Email"
                rules={[
                  { required: true, type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input placeholder="Enter email" />
              </Form.Item>
              <Form.Item
                label="Password"
                name="Password"
                rules={[{ required: true, message: "Please enter a password!" }]}
              >
                <Input.Password placeholder="Enter password" />
              </Form.Item>
              <Form.Item
                label="Address"
                name="Address"
                rules={[{ required: true, message: "Please enter an address!" }]}
              >
                <Input.TextArea placeholder="Enter address" />
              </Form.Item>
              <Form.Item
                label="Avatar"
                name="Avatar"
                valuePropName="fileList"
              >
                <ImgCrop rotationSlider>
                  <Upload
                    fileList={fileList}
                    onChange={({ fileList: newFileList }) => {
                      setFileList(newFileList.slice(-1)); 
                    }}
                    onPreview={onPreview}
                    beforeUpload={(file) => {
                      setFileList([file]); 
                      return false; 
                    }}
                    maxCount={1}
                    multiple={false}
                    listType="picture-card"
                  >
                    {fileList.length < 1 && (
                      <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </div>
                    )}
                  </Upload>
                </ImgCrop>
              </Form.Item>
              <Form.Item>
                <Space>
                  <Button onClick={closeAddModal}>Close</Button>
                  <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
                    Submit
                  </Button>
                </Space>
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

export default Customer;
