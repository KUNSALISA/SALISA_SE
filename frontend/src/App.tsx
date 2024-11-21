import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SharedLayout from "../src/components/Layout";
import LoginPage from "../src/page/login/Login";
import EmployeePage from "./pages/EmployeePage";
import CustomerPage from "./pages/CustomerPage";
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
        {/* เส้นทางเข้าสู่ระบบ */}
        <Route path="/" element={<LoginPage />} />
        
        {/* เส้นทางสำหรับ Dashboard และผู้จัดการ */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/manager" element={<ManagerPage />} />
        
        {/* เส้นทางที่มี Shared Layout */}
        <Route path="/" element={<SharedLayout />}>
          <Route path="home" element={<ManagerPage />} />
          <Route path="employee" element={<EmployeePage />} />
          <Route path="customer" element={<CustomerPage />} />
        </Route>

        {/* เส้นทางเพิ่มเติม */}
        <Route path="/page-a" element={<PageA />} />
        <Route path="/page-b" element={<PageB />} />
        <Route path="/page-c" element={<PageC />} />
        <Route path="/page-d" element={<PageD />} />
      </Routes>
    </Router>
  );
};

export default App;







// import React from 'react';
// import Login from '../src/page/login/Login';
// import ManagerPage from "../src/page/dash/Dash";
// import SharedLayout from "../src/components/Layout";

// const App: React.FC = () => {
//   return (
//     <div>
//       <SharedLayout />
//     </div>
//   );
// };


// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Employee from "./pages/Employee";
// import Customer from "./pages/Customer";

// const App: React.FC = () => {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/employee" element={<Employee />} />
//         <Route path="/customer" element={<Customer />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;


// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LoginPage from "../src/page/login/Login";
// import Dashboard from "./pages/Dashboard";
// import ManagerPage from "../src/page/dash/Dash";
// import PageA from "./pages/PageA";
// import PageB from "./pages/PageB";
// import PageC from "./pages/PageC";
// import PageD from "./pages/PageD";

// import EmployeePage from "./pages/EmployeePage";
// import CustomerPage from "./pages/CustomerPage";

// const App: React.FC = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* เส้นทางเข้าสู่ระบบ */}
//         <Route path="/" element={<LoginPage />} />
        
//         {/* เส้นทางสำหรับ Dashboard และผู้จัดการ */}
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/manager" element={<ManagerPage />} />
        
//         {/* เส้นทางสำหรับแต่ละหน้า */}
//         <Route path="/page-a" element={<PageA />} />
//         <Route path="/page-b" element={<PageB />} />
//         <Route path="/page-c" element={<PageC />} />
//         <Route path="/page-d" element={<PageD />} />
        
//         {/* เส้นทางใหม่: Warehouse */}

//         <Route path="/employee" element={<EmployeePage />} />
//         <Route path="/customer" element={<CustomerPage />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;