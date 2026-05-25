import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    // DIRECT READ
    const user =
        JSON.parse(localStorage.getItem("user")) ||
        JSON.parse(localStorage.getItem("loggedInUser"));

    const role = user?.role?.trim().toUpperCase();

    const handleLogout = () => {

        localStorage.removeItem("user");
        localStorage.removeItem("loggedInUser");

        alert("Logout Successful");

        window.location.href = "/login";
    };

    return (

        <div className="bg-black text-white px-6 py-4 flex justify-between items-center">

            {/* LOGO */}
            <h1 className="text-2xl font-bold">
                JobPortal
            </h1>

            <div className="flex gap-5 items-center">

                <Link to="/">Home</Link>

                {/* USER */}
                {role === "USER" && (
                    <>
                        <Link to="/jobs">Apply Jobs</Link>

                        <Link to="/upload-resume">
                            Upload Resume
                        </Link>
                    </>
                )}

                {/* ADMIN */}
                {role === "ADMIN" && (
                    <>
                        <Link to="/add-job">
                            Add Job
                        </Link>

                        <Link to="/jobs">
                            Manage Jobs
                        </Link>

                        <Link to="/users">
                            User List
                        </Link>
                    </>
                )}

                {/* AUTH */}
                {!user ? (
                    <>
                        <Link to="/login">Login</Link>

                        <Link to="/register">
                            Register
                        </Link>
                    </>
                ) : (
                    <>
                        <span className="text-yellow-400">
                            {user.name}
                        </span>

                        <button
                            onClick={handleLogout}
                            className="bg-red-500 px-3 py-1 rounded"
                        >
                            Logout
                        </button>
                    </>
                )}

            </div>

        </div>
    );
}

export default Navbar;