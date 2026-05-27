import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminNavbar from "./components/AdminNavbar";
import Home from "./pages/user/Home";
import Jobs from "./pages/user/Jobs";
import UploadResume from "./pages/user/UploadResume";
import ApplyJob from "./pages/user/ApplyJob";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profile from "./pages/user/Profile";
import AddJob from "./pages/admin/AddJob";
import EditJob from "./pages/admin/EditJob";
import Users from "./pages/admin/Users";
import Dashboard from "./pages/admin/Dashboard";

function Layout() {

  const location = useLocation();

  // Admin pages detect
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {/* User Navbar only */}
{
    isAdminPage
        ? <AdminNavbar />
        : <Navbar />
}
      <Routes>

        {/* USER ROUTES */}

        <Route path="/" element={<Home />} />

        <Route path="/jobs" element={<Jobs />} />

        <Route
    path="/apply/:id"
    element={
        <ProtectedRoute>
            <ApplyJob />
        </ProtectedRoute>
    }
/>

<Route path="/profile" element={<Profile />} />

        <Route
          path="/upload-resume"
          element={
            <ProtectedRoute>
              <UploadResume />
            </ProtectedRoute>
          }
        />

        {/* AUTH ROUTES */}

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* ADMIN ROUTES */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute adminOnly={true}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/add-job"
          element={
            <ProtectedRoute adminOnly={true}>
              <AddJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute adminOnly={true}>
              <Users />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/edit-job/:id"
          element={
            <ProtectedRoute adminOnly={true}>
              <EditJob />
            </ProtectedRoute>
          }
        />

      </Routes>

      {/* User Footer only */}
      {!isAdminPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;