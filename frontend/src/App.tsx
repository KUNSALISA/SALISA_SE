// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import SharedLayout from "../src/components/Layout";
// import LoginPage from "../src/page/login/Login";
// import EmployeePage from "./pages/EmployeePage";
// import CustomerPage from "./pages/CustomerPage";
// import Dashboard from "./pages/Dashboard";
// import ManagerPage from "../src/page/dash/Dash";
// import PageA from "./pages/PageA";
// import PageB from "./pages/PageB";
// import PageC from "./pages/PageC";
// import PageD from "./pages/PageD";

// const App: React.FC = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* เส้นทางเข้าสู่ระบบ */}
//         <Route path="/" element={<LoginPage />} />
        
//         {/* เส้นทางสำหรับ Dashboard และผู้จัดการ */}
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/manager" element={<ManagerPage />} />
        
//         {/* เส้นทางที่มี Shared Layout */}
//         <Route path="/" element={<SharedLayout />}>
//           <Route path="home" element={<ManagerPage />} />
//           <Route path="employee" element={<EmployeePage />} />
//           <Route path="customer" element={<CustomerPage />} />
//         </Route>

//         {/* เส้นทางเพิ่มเติม */}
//         <Route path="/page-a" element={<PageA />} />
//         <Route path="/page-b" element={<PageB />} />
//         <Route path="/page-c" element={<PageC />} />
//         <Route path="/page-d" element={<PageD />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;


// import React from 'react';
// import TeamPage from "../src/TeamPage"

// const App: React.FC = () => {
//   return (
//     <div>
//       <TeamPage />
//     </div>
//   );
// };
// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SharedLayout from "../src/components/Layout";
import LoginPage from "../src/page/login/Login";
import EmployeePage from "./page/employee/Employee";
import CustomerPage from "../src/page/customer/Customer";
import Dashboard from "./pages/Dashboard";
import ManagerPage from "../src/page/dash/Dash";
import PageA from "./pages/PageA";
import PageB from "./pages/PageB";
import PageC from "./pages/PageC";
import PageD from "./pages/PageD";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* เส้นทางเข้าสู่ระบบ (ไม่ใช้ SharedLayout) */}
        <Route path="/" element={<LoginPage />} />
        
        {/* เส้นทางที่ใช้ SharedLayout */}
        <Route path="/" element={<SharedLayout />}>
          {/* เส้นทางสำหรับ Dashboard และผู้จัดการ */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="manager" element={<ManagerPage />} />

          {/* เส้นทางอื่น ๆ */}
          <Route path="home" element={<ManagerPage />} />
          <Route path="employee" element={<EmployeePage />} />
          <Route path="customer" element={<CustomerPage />} />
          <Route path="page-a" element={<PageA />} />
          <Route path="page-b" element={<PageB />} />
          <Route path="page-c" element={<PageC />} />
          <Route path="page-d" element={<PageD />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
