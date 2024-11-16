// import React from 'react';
// import Login from '../src/page/login/Login';
// import Employee from './page/employee/employee';

// const App: React.FC = () => {
//   return (
//     <div>
//       <Login />
//     </div>
//   );
// };

// export default App;

// import React from "react";
// import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import LoginPage from "./LoginPage";
// import AdminDashboard from "./AdminDashboard";
// import ManagerDashboard from "./ManagerDashboard";
// import StaffDashboard from "./StaffDashboard";
// import WarehouseDashboard from "./WarehouseDashboard";

// const App: React.FC = () => {
//   const userRole = localStorage.getItem("role");

//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<LoginPage />} />
//         <Route
//           path="/admin"
//           element={userRole === "Admin" ? <AdminDashboard /> : <Navigate to="/login" />}
//         />
//         <Route
//           path="/manager"
//           element={userRole === "Manager" ? <ManagerDashboard /> : <Navigate to="/login" />}
//         />
//         <Route
//           path="/staff"
//           element={userRole === "Staff" ? <StaffDashboard /> : <Navigate to="/login" />}
//         />
//         <Route
//           path="/warehouse"
//           element={userRole === "Warehouse" ? <WarehouseDashboard /> : <Navigate to="/login" />}
//         />
//         <Route path="*" element={<Navigate to="/login" />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import ManagerDashboard from "./pages/ManagerDashboard";
import ADashboard from "./pages/ADashboard";
import BDashboard from "./pages/BDashboard";
import CDashboard from "./pages/CDashboard";
import DDashboard from "./pages/DDashboard";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/manager-dashboard" element={<ManagerDashboard />} />
        <Route path="/a-dashboard" element={<ADashboard />} />
        <Route path="/b-dashboard" element={<BDashboard />} />
        <Route path="/c-dashboard" element={<CDashboard />} />
        <Route path="/d-dashboard" element={<DDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;

