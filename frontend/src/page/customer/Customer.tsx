import React, { useState, useEffect } from "react";
import { Layout, Card, Input, Button, Row, Col, Modal, Form, message, Select, Upload, Space } from "antd";
import { SearchOutlined, UpOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {CustomerInterface, GendersInterface} from "../../interfaces/InterfaceFull";
import {GetAllCustomers, GetGender, CreateCustomer, UpdateCustomersById, DeleteCustomersById} from "../../services/https/index";
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
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState<CustomerInterface | null>(null);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
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

  const displayedCustomers = filteredCustomers;

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

  const showEditModal = () => {
    setIsEditModalVisible(true);
  };
  
  const closeEditModal = () => {
    setIsEditModalVisible(false);
    form.resetFields();
  };

  const handleEditSubmit = async (values: CustomerInterface) => {
    const res = await UpdateCustomersById(String(selectedCustomers?.ID), values); 
    if (res && res.status === 200) {
      messageApi.success("Customer updated successfully");
      
      setSelectedCustomers((prev) => ({
        ...prev,
        ...values, 
        Gender: genders.find((gender) => gender.ID === values.GenderID), 
      }));
      
      await getcustomers(); 
      closeEditModal(); 
    } else {
      const errorMessage = res?.data?.message || "Failed to update customer";
      messageApi.error(errorMessage); 
    }
  }; 

  const handleDeleteCustomer = () => {
    Modal.confirm({
      title: "Are you sure you want to delete this customer?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        const res = await DeleteCustomersById(String(selectedCustomers?.ID)); // Call API to delete customer
        if (res && res.status === 200) {
          messageApi.success("Customer deleted successfully");
          await getcustomers(); // Refresh the customer list
          closeEditModal(); // Close the modal
          closeModal();
        } else {
          const errorMessage = res?.data?.message || "Failed to delete customer";
          messageApi.error(errorMessage); // Show error message
        }
      },
      onCancel: () => {
        messageApi.info("Delete action canceled");
      },
    });
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
          style={{ backgroundColor: "#FF7236", borderColor: "#FF7236" }} 
          onClick={showAddModal}
        >
          ADD
        </Button>
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
          title={
            <div style={{ textAlign: "center", fontSize: "24px", fontWeight: "bold" }}>
              Add New Customer
            </div>
          }
          visible={isAddModalVisible}
          onCancel={closeAddModal}
          footer={null} 
        >
          <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="First Name"
                name="FirstName"
                rules={[
                  { required: true, message: "Please enter first name" },
                  {
                    pattern: /^[A-Za-z\s]+$/,
                    message: "First name can only contain letters",
                  },
                ]}
              >
                <Input placeholder="Enter first name" />
              </Form.Item>
              <Form.Item
                label="Last Name"
                name="LastName"
                rules={[
                  { required: true, message: "Please enter last name" },
                  {
                    pattern: /^[A-Za-z\s]+$/,
                    message: "Last name can only contain letters",
                  },]}
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
                rules={[
                  { required: true, message: "Please enter Phone Number" },
                  {
                    pattern: /^[0]\d{9}$/,
                    message: "Phone number must be exactly 10 digits and start with '0'!",
                  },
                ]}
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
                rules={[
                  { required: true, message: "Please enter a password!" },
                  { min: 8, message: "Password must be at least 8 characters long" },
                ]}
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
                <div style={{ display: "flex", justifyContent: "flex-end" }}> {/* ใช้ Flexbox */}
                  <Space>
                    <Button onClick={closeAddModal}>CLOSE</Button>
                    <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
                      SUBMIT
                    </Button>
                  </Space>
                </div>
              </Form.Item>
          </Form>
        </Modal>

        <Modal
          title={
            <div style={{fontSize: "20px", fontWeight: "bold" }}>
              Profile
            </div>
          }
          visible={isModalVisible}
          onCancel={closeModal}
          footer={[
            <Button key="close" onClick={closeModal}>
              CLOSE
            </Button>,
            <Button
            key="edit"
            type="primary"
            style={{ backgroundColor: "#FF7236", borderColor: "#FF7236" }}
            onClick={() => {
              form.setFieldsValue(selectedCustomers); // Pre-fill form with customer data
              showEditModal();
            }}
            >
              EDIT
            </Button>
          ]}
          width={800}
        >
          {selectedCustomers && (
            <div style={{ display: "flex", alignItems: "flex-start", gap: "25px" }}>
              <div>
                {selectedCustomers.Avatar ? (
                  <img
                    src={selectedCustomers.Avatar} 
                    alt="Customer Avatar"
                    style={{width: "auto", height: "300px", borderRadius: "10px", objectFit: "cover",
                    }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).onerror = null;
                      (e.target as HTMLImageElement).src = "https://via.placeholder.com/150"; 
                    }}                    
                  />
                ) : (
                  <div
                    style={{
                      width: "150px",
                      height: "150px",
                      borderRadius: "10px",
                      backgroundColor: "#ccc",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    No Image
                  </div>
                )}
              </div>

              <div>
                <p>
                  <strong>Name: </strong> {selectedCustomers.FirstName} {selectedCustomers.LastName}
                </p>
                <p>
                  <strong>Gender: </strong> {selectedCustomers.Gender?.Gender}
                </p>
                <p>
                  <strong>Phone Number: </strong> {selectedCustomers.Number}
                </p>
                <p>
                  <strong>Email: </strong> {selectedCustomers.Email}
                </p>
                <p>
                  <strong>Address: </strong> {selectedCustomers.Address}
                </p>
              </div>
            </div>
          )}
        </Modal>
        <Modal
          title={
            <div style={{ textAlign: "center", fontSize: "24px", fontWeight: "bold" }}>
              Edit Customer
            </div>
          }
          visible={isEditModalVisible}
          onCancel={closeEditModal}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={handleEditSubmit}>
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
              <Select placeholder="Select gender">
                {genders.map((item) => (
                  <Option key={item.ID} value={item.ID}>
                    {item.Gender}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="Number"
              rules={[{ required: true, message: "Please enter phone number" }]}
            >
              <Input placeholder="Enter phone number" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="Email"
              rules={[{ required: true, type: "email", message: "Please enter a valid email!" }]}
            >
              <Input placeholder="Enter email" />
            </Form.Item>
            <Form.Item
              label="Address"
              name="Address"
              rules={[{ required: true, message: "Please enter an address!" }]}
            >
              <Input.TextArea placeholder="Enter address" />
            </Form.Item>
{/* ยังแก้ไขรูปไม่ได้ */}
            <Form.Item label="Avatar" name="Avatar" valuePropName="fileList">  
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
              <Space style={{ float: "right" }}> {/* Align buttons to the right */}
                <Button onClick={closeEditModal}>CANCEL</Button>
                <Button danger onClick={handleDeleteCustomer}>DELETE</Button> {/* Confirmation prompt will be shown */}
                <Button type="primary" htmlType="submit">
                  SUBMIT
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
};

export default Customer;
