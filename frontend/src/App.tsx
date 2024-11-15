// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

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

import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import AdminDashboard from "./AdminDashboard";
import ManagerDashboard from "./ManagerDashboard";
import StaffDashboard from "./StaffDashboard";
import WarehouseDashboard from "./WarehouseDashboard";

const App: React.FC = () => {
  const userRole = localStorage.getItem("role");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={userRole === "Admin" ? <AdminDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/manager"
          element={userRole === "Manager" ? <ManagerDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/staff"
          element={userRole === "Staff" ? <StaffDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/warehouse"
          element={userRole === "Warehouse" ? <WarehouseDashboard /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
