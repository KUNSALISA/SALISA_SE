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



// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import SharedLayout from "./components/SharedLayout";
// import LoginPage from "./pages/LoginPage";
// import Dashboard from "./pages/Dashboard";
// import ManagerPage from "./pages/ManagerPage";
// import EmployeePage from "./pages/EmployeePage";
// import CustomerPage from "./pages/CustomerPage";
// import PageA from "./pages/PageA";
// import PageB from "./pages/PageB";
// import PageC from "./pages/PageC";
// import PageD from "./pages/PageD";
// import WarehousePage from "./pages/WarehousePage";
// import CountPage from "./pages/CountPage";
// import ProductsPage from "./pages/ProductsPage";
// import TransactionPage from "./pages/TransactionPage";
// import SupplierPage from "./pages/SupplierPage";
// import LocationPage from "./pages/LocationPage";
// import OrderPage from "./pages/OrderPage";
// import ShipmentPage from "./pages/ShipmentPage";

// const App: React.FC = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* เส้นทางสำหรับ Login */}
//         <Route path="/" element={<LoginPage />} />
        
//         {/* เส้นทางที่ใช้ SharedLayout */}
//         <Route path="/" element={<SharedLayout />}>
//           {/* เส้นทางสำหรับ Dashboard และ Manager */}
//           <Route path="dashboard" element={<Dashboard />} />
//           <Route path="manager" element={<ManagerPage />} />

//           {/* เส้นทางสำหรับเมนูเพิ่มเติม */}
//           <Route path="employee" element={<EmployeePage />} />
//           <Route path="customer" element={<CustomerPage />} />
//           <Route path="warehouse" element={<WarehousePage />} />
//           <Route path="count" element={<CountPage />} />
//           <Route path="products" element={<ProductsPage />} />
//           <Route path="transaction" element={<TransactionPage />} />
//           <Route path="supplier" element={<SupplierPage />} />
//           <Route path="location" element={<LocationPage />} />
//           <Route path="order" element={<OrderPage />} />
//           <Route path="shipment" element={<ShipmentPage />} />

//           {/* เส้นทางตาม Access Level */}
//           <Route path="page-a" element={<PageA />} />
//           <Route path="page-b" element={<PageB />} />
//           <Route path="page-c" element={<PageC />} />
//           <Route path="page-d" element={<PageD />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// };

// export default App;
