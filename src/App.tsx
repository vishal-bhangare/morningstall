import "./App.css";
import Admin from "./components/Admin/Admin";
import SuperUser from "./components/SuperUser/SuperUser";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/superuser" element={<SuperUser />} />
      </Routes>
    </>
  );
}

export default App;
