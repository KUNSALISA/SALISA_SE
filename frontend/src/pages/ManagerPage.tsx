// import React from "react";

// const ManagerPage: React.FC = () => {
//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h1>Manager's Page</h1>
//       <p>This page is accessible to managers only.</p>
//     </div>
//   );
// };

// export default ManagerPage;

import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import "./M.css";

const ManagerPage: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const tableData = Array(8).fill({ id: "", name: "Item", status: "Pending" });

  return (
    <div className="warehouse-container">
      <header className="warehouse-header">
        <div className="logo">CATegory Box</div>
        <h1>WAREHOUSE</h1>
        <div className="header-buttons">
          <Button
            className="header-btn"
            onClick={() => handleNavigation("/employee")}
          >
            employee
          </Button>
          <Button
            className="header-btn"
            onClick={() => handleNavigation("/customer")}
          >
            customer
          </Button>
        </div>
        <div className="profile-icon" />
      </header>
      <div className="warehouse-table">
        {tableData.map((item, index) => (
          <div key={index} className="table-row">
            <div className="row-item name">{item.name}</div>
            <div className="row-item">
              <Button type="primary" className="approve-btn">
                Approve
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagerPage;
