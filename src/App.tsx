import "./App.css";
import Admin from "./components/Admin/Admin";
import SuperuserDashboard from "./components/SuperUser/Dashboard/SuperuserDashboard";
import SuperuserLogin from "./components/SuperUser/Login/SuperuserLogin";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/superuser/login" element={<SuperuserLogin />} />
        <Route path="/superuser/dashboard" element={<SuperuserDashboard />} />
      </Routes>
    </>
  );
}

export default App;
