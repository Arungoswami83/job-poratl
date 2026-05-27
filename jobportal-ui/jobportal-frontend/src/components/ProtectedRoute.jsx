import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, adminOnly = false }) {

    // GET USER
    const user = JSON.parse(localStorage.getItem("user"));

    // NOT LOGGED IN
    if (!user) {

        return <Navigate to="/login" />;
    }

    // ADMIN CHECK
    if (adminOnly && user.role !== "ADMIN") {

        return <Navigate to="/" />;
    }

    return children;
}

export default ProtectedRoute;