import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import AddJob from "./pages/AddJob";
import UploadResume from "./pages/UploadResume";
import Users from "./pages/Users"; 
import EditJob from "./pages/EditJob";  // 👈 ADD THIS

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/add-job" element={<AddJob />} />
        <Route path="/upload-resume" element={<UploadResume />} />

        {/* 👇 ADMIN CRUD PAGE */}
        <Route path="/users" element={<Users />} />
        <Route path="/edit-job/:id" element={<EditJob />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;