import React, { useState, useEffect } from "react";
import { Layout, Card, Input, Button, Row, Col, Modal, Form, message, Select, Upload, Space, DatePicker } from "antd";
import {SearchOutlined, UpOutlined, PlusOutlined } from "@ant-design/icons";
import {EmployeeInterface, GendersInterface, PositionsInterface, WarehousesInterface} from "../../interfaces/InterfaceFull";
import {GetAllEmployees, CreateEmployee, GetGender, GetPositions, GetWarehouses, DeleteEmployeeById, UpdateEmployeeById} from "../../services/https/index";
import type { GetProp, UploadFile, UploadProps } from "antd";
import ImgCrop from "antd-img-crop";
import dayjs from "dayjs";
import staff from "../../assets/staff.png"
import "./Employee.css";

const { Header, Content } = Layout;
const { Option } = Select;
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const Employee: React.FC = () => {
  const [employees, setEmployees] = useState<EmployeeInterface[]>([]);
  const [genders, setGenders] = useState<GendersInterface[]>([]);
  const [positions, setPositions] = useState<PositionsInterface[]>([]);
  const [warehouses, setWarehouses] = useState<WarehousesInterface[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [searchQuery, setSearchQuery] = useState("");
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeInterface | null>(null);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();

  const getEmployees = async () => {
    let res = await GetAllEmployees();
    console.log("API Response:", res);
    if (res) {
      setEmployees(res.data);
    }
  };

  const getGender = async () => {
    let res = await GetGender();
    if (res && Array.isArray(res.data)) {
      setGenders(res.data);
    } 
  };

  const getPosition = async () => {
    let res = await GetPositions();
    if (res && Array.isArray(res.data)) {
      setPositions(res.data);
    } 
  };

  const getWarehouses = async () => {
    let res = await GetWarehouses();
    if (res && Array.isArray(res.data)) {
      setWarehouses(res.data);
    } 
  };

  useEffect(() => {
    getEmployees();
    getGender();
    getPosition();
    getWarehouses();
  }, []);
  
  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
      setFileList(newFileList);
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.E_FirstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.E_LastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.Position?.Position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedEmployees = filteredEmployees;

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

  const showEditModal = () => {
    setIsEditModalVisible(true);
  };

  const closeEditModal = () => {
    setIsEditModalVisible(false);
    form.resetFields();
  };

  const onFinish = async (values: EmployeeInterface) => {
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
  
    // กำหนดค่า Avatar จากไฟล์ที่อัปโหลด
    values.Avatar = avatarUrl;
  
    // ค้นหาตำแหน่งงานที่เลือก และตั้งค่า AccessLevel อัตโนมัติ
    const selectedPosition = positions.find(
      (position) => position.ID === values.PositionID
    );
    if (selectedPosition) {
      values.AccessLevel = selectedPosition.Position; // กำหนดค่า AccessLevel
    } else {
      messageApi.open({
        type: "error",
        content: "กรุณาเลือกตำแหน่งงานที่ถูกต้อง!",
      });
      return;
    }
  
    // เรียก API เพื่อสร้างข้อมูลพนักงาน
    const res = await CreateEmployee(values);
    if (res) {
      messageApi.open({
        type: "success",
        content: "บันทึกข้อมูลสำเร็จ",
      });
      await getEmployees(); // อัปเดตข้อมูลพนักงานใหม่
      form.resetFields(); // รีเซ็ตฟอร์ม
      setFileList([]); // รีเซ็ตไฟล์ที่อัปโหลด
      closeAddModal(); // ปิด Modal
    } else {
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาด!",
      });
    }
  };

  const handleEditSubmit = async (values: EmployeeInterface) => {
    // ตรวจสอบว่าเลือก Position หรือไม่
    if (!values.PositionID) {
      messageApi.error("กรุณาเลือกตำแหน่งงาน");
      return;
    }
  
    // ตั้งค่า AccessLevel อัตโนมัติจากตำแหน่ง
    const selectedPosition = positions.find((item) => item.ID === values.PositionID);
    if (selectedPosition) {
      values.AccessLevel = selectedPosition.Position;
    }
  
    // ตรวจสอบว่า Avatar ถูกอัปโหลดหรือยัง
    const avatarUrl = fileList[0]?.thumbUrl || fileList[0]?.url;
    if (avatarUrl) {
      values.Avatar = avatarUrl;
    } else {
      messageApi.error("กรุณาอัปโหลดรูปภาพ");
      return;
    }
  
    // ทำการส่งข้อมูลไปยัง API
    const res = await UpdateEmployeeById(String(selectedEmployee?.ID), values);
    if (res && res.status === 200) {
      messageApi.success("ข้อมูลพนักงานได้รับการอัปเดตสำเร็จ");
  
      // อัปเดตข้อมูลใน state หรือ UI
      setSelectedEmployee((prev) => ({
        ...prev,
        ...values,
        Gender: genders.find((gender) => gender.ID === values.GenderID),
        Position: positions.find((position) => position.ID === values.PositionID),
        Warehouse: warehouses.find((warehouse) => warehouse.ID === values.WarehouseID),
      }));
  
      // เรียกฟังก์ชันเพื่อโหลดข้อมูลใหม่
      await getEmployees();
      closeEditModal();
    } else {
      const errorMessage = res?.data?.message || "เกิดข้อผิดพลาดในการอัปเดตข้อมูล";
      messageApi.error(errorMessage);
    }
  };    

  const handleDeleteEmployee = () => {
    Modal.confirm({
      title: "Are you sure you want to delete this employee?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        const res = await DeleteEmployeeById(String(selectedEmployee?.ID)); // Call API to delete customer
        if (res && res.status === 200) {
          messageApi.success("Employee deleted successfully");
          await getEmployees();
          closeEditModal(); // Close the modal
          closeModal();
        } else {
          const errorMessage = res?.data?.message || "Failed to delete employee";
          messageApi.error(errorMessage); // Show error message
        }
      },
      onCancel: () => {
        messageApi.info("Delete action canceled");
      },
    });
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
            style={{ backgroundColor: "#FF7236", borderColor: "#FF7236" }}
            onClick={showAddModal}
          >
            ADD
          </Button>
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

        {showScrollToTop && (
          <Button
            type="primary"
            shape="circle"
            icon={<UpOutlined />}
            onClick={scrollToTop}
            className="scroll-to-top-btn-em"
          />
        )}

        <Modal
          title={
            <div style={{ textAlign: "center", fontSize: "24px", fontWeight: "bold" }}>
              Add New Employee
            </div>
          }
          visible={isAddModalVisible}
          onCancel={closeAddModal}
          footer={null} 
        >
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="First Name"
              name="E_FirstName"
              rules={[{ required: true, message: "Please enter first name" }]}
            >
              <Input placeholder="Enter first name" />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="E_LastName"
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
              label="Position"
              name="PositionID"
              rules={[{ required: true, message: "Please select a position" }]}
            >
              <Select
                allowClear
                placeholder="Select position"
                onChange={(value) => {
                  const selectedPosition = positions.find((item) => item.ID === value);
                  if (selectedPosition) {
                    form.setFieldsValue({ AccessLevel: selectedPosition.Position }); // ตั้งค่าของ AccessLevel โดยอัตโนมัติ
                  }
                }}
              >
                {positions.map((item) => (
                  <Option key={item.ID} value={item.ID}>
                    {item.Position}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Warehouse"
              name="WarehouseID"
              rules={[{ required: true, message: "Please select a warehouse" }]}
            >
              <Select allowClear placeholder="Select warehouse">
                {warehouses.map((item) => (
                  <Option key={item.ID} value={item.ID}>
                    {item.Warehouse_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Start Date"
              name="StartDate"
              rules={[{ required: true, message: "Please select a start date" }]}
            >
              <DatePicker style={{ width: "100%" }} />
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
              rules={[
                { required: true, type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input placeholder="Enter email" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="Password"
              rules={[{ required: true, message: "Please enter password" }]}
            >
              <Input.Password placeholder="Enter password" />
            </Form.Item>
            <Form.Item
              label="Address"
              name="Address"
              rules={[{ required: true, message: "Please enter address" }]}
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
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
                form.setFieldsValue(selectedEmployee); 
                showEditModal();
              }}
            >
              EDIT
            </Button>
          ]}
          width={800}
        >
          {(
            selectedEmployee && (
              <div style={{ display: "flex", alignItems: "flex-start", gap: "25px" }}>
                <div>
                  {selectedEmployee.Avatar ? (
                    <img
                      src={selectedEmployee.Avatar}
                      alt="Employee Avatar"
                      style={{ width: "auto", height: "300px", borderRadius: "10px", objectFit: "cover" }}
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
                    <strong>Name: </strong> {selectedEmployee.E_FirstName} {selectedEmployee.E_LastName}
                  </p>
                  <p>
                    <strong>Gender: </strong> {selectedEmployee.Gender?.Gender}
                  </p>
                  <p>
                    <strong>Position: </strong> {selectedEmployee.Position?.Position}
                  </p>
                  <p>
                    <strong>Warehouse: </strong> {selectedEmployee.Warehouse?.Warehouse_name}
                  </p>
                  <p>
                    <strong>Phone Number: </strong> {selectedEmployee.Number}
                  </p>
                  <p>
                    <strong>Email: </strong> {selectedEmployee.Email}
                  </p>
                  <p>
                    <strong>Address: </strong> {selectedEmployee.Address}
                  </p>
                  <p>
                    <strong>StartDate: </strong>{" "}
                    {dayjs(selectedEmployee.StartDate).format("DD/MM/YYYY")}
                  </p>
                </div>
              </div>
            )
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
              name="E_FirstName"
              rules={[{ required: true, message: "Please enter first name" }]}
            >
              <Input placeholder="Enter first name" />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="E_LastName"
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
              label="Position"
              name="PositionID"
              rules={[{ required: true, message: "Please select a position" }]}
            >
              <Select
                allowClear
                placeholder="Select position"
                onChange={(value) => {
                  const selectedPosition = positions.find((item) => item.ID === value);
                  if (selectedPosition) {
                    form.setFieldsValue({ AccessLevel: selectedPosition.Position }); // ตั้งค่าของ AccessLevel โดยอัตโนมัติ
                  }
                }}
              >
                {positions.map((item) => (
                  <Option key={item.ID} value={item.ID}>
                    {item.Position}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Warehouse"
              name="WarehouseID"
              rules={[{ required: true, message: "Please select a warehouse" }]}
            >
              <Select allowClear placeholder="Select warehouse">
                {warehouses.map((item) => (
                  <Option key={item.ID} value={item.ID}>
                    {item.Warehouse_name}
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
              <Space style={{ float: "right" }}>
                <Button onClick={closeEditModal}>CANCEL</Button>
                <Button danger onClick={handleDeleteEmployee}>
                  DELETE
                </Button>
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

export default Employee;
