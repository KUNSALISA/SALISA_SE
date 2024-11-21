import React, { useState, useEffect } from "react";
import {
  Layout,
  Card,
  Input,
  Button,
  Row,
  Col,
  Modal,
  Form,
  Select,
  DatePicker,
} from "antd";
import {
  UserOutlined,
  SearchOutlined,
  UpOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import "./TeamPage.css";

const { Header, Footer, Content } = Layout;
const { Option } = Select;

interface Member {
  id: number;
  name: string;
  role: string;
  avatar: string;
  number: string;
  email: string;
  address: string;
  startDate: string;
  accessLevel: string;
  gender: string;
  position: string;
  warehouse: string;
}

const TeamPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [form] = Form.useForm();

  const teamMembers: Member[] = Array.from({ length: 12 }).map((_, index) => ({
    id: index,
    name: `Rory Hong ${index + 1}`,
    role: index % 2 === 0 ? "Senior" : "Junior",
    avatar: "https://via.placeholder.com/150",
    number: `+12345678${index}`,
    email: `rory.hong${index}@example.com`,
    address: `123 Example Street ${index}`,
    startDate: "2022-01-01",
    accessLevel: index % 2 === 0 ? "Admin" : "User",
    gender: index % 2 === 0 ? "Male" : "Female",
    position: index % 2 === 0 ? "Manager" : "Staff",
    warehouse: `Warehouse ${index + 1}`,
  }));

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedMembers = showAll ? filteredMembers : filteredMembers.slice(0, 8);

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

  const showModal = (member: Member) => {
    setSelectedMember(member);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedMember(null);
  };

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const closeAddModal = () => {
    setIsAddModalVisible(false);
    form.resetFields();
  };

  const handleAddMember = (values: any) => {
    console.log("New Member Data:", values);
    closeAddModal();
  };

  return (
    <Layout className="team-layout">
      <Header className="team-header">
        <div className="team-title">
            <h1>OUR TEAM</h1>
            <p>
            If you're stressed about work, don’t quit just yet—<br />
            because if you do, you'll end up stressing about money too.
            </p>
        </div>
      </Header>


      <Content className="team-content">
        <div className="team-info">
          <UserOutlined className="team-info-icon" />
          <span className="team-info-count">{teamMembers.length}</span>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="add-btn"
            onClick={showAddModal}
          />
        </div>

        <div className="search-bar">
          <Input
            placeholder="Search by name or role"
            suffix={<SearchOutlined />}
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Row gutter={[24, 24]} className="team-cards">
          {displayedMembers.map((member) => (
            <Col span={6} key={member.id}>
              <Card
                className="team-card"
                cover={
                  <div
                    className="card-image"
                    style={{ backgroundImage: `url(${member.avatar})` }}
                    onClick={() => showModal(member)}
                  />
                }
              >
                <Card.Meta
                  title={member.name}
                  description={member.role}
                  className="card-meta"
                />
              </Card>
            </Col>
          ))}
        </Row>

        {!showAll && filteredMembers.length > 8 && (
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

        {/* Add Member Modal */}
        <Modal
          title="Add New Member"
          visible={isAddModalVisible}
          onCancel={closeAddModal}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={handleAddMember}>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true, message: "Please enter first name" }]}
            >
              <Input />
            </Form.Item>
            {/* Remaining Form Fields */}
          </Form>
        </Modal>

        {/* Member Details Modal */}
        <Modal
          title="Member Details"
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
          {selectedMember && (
            <>
              <p>
                <strong>Name:</strong> {selectedMember.name}
              </p>
              {/* Remaining Member Details */}
            </>
          )}
        </Modal>
      </Content>

      <Footer className="team-footer">
        <div className="footer-content">About</div>
      </Footer>
    </Layout>
  );
};

export default TeamPage;
