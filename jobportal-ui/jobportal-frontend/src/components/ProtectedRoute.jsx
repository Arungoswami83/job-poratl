import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, adminOnly = false }) {

    const user = JSON.parse(
        localStorage.getItem("user") ||
        localStorage.getItem("loggedInUser") ||
        "null"
    );

    // LOGIN CHECK
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