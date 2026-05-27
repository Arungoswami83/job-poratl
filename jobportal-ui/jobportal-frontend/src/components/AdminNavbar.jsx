import { Link, useNavigate } from "react-router-dom";

function AdminNavbar() {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <nav className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 shadow-lg">

            <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

                {/* LOGO */}
                <h1 className="text-white text-2xl font-bold tracking-wide">
                    Admin Panel
                </h1>

                {/* MENU */}
                <div className="flex gap-6 items-center text-sm font-medium text-white">

                    <Link
                        to="/"
                        className="hover:text-cyan-300 transition"
                    >
                        Home
                    </Link>

                    <Link
                        to="/admin/dashboard"
                        className="hover:text-cyan-300 transition"
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/jobs"
                        className="hover:text-cyan-300 transition"
                    >
                        Jobs
                    </Link>

                    <Link
                        to="/admin/users"
                        className="hover:text-cyan-300 transition"
                    >
                        Users
                    </Link>

                    {/* LOGOUT */}
                    <button
                        onClick={logout}
                        className="bg-red-500 hover:bg-red-600 px-4 py-1.5 rounded-full shadow-md transition"
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>
    );
}

export default AdminNavbar;