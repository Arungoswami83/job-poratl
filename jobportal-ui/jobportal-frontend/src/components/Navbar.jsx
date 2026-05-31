import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    // LOGOUT
    const logout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white px-10 py-4 flex justify-between items-center shadow-lg">

            {/* LOGO */}
            <Link to="/" className="text-2xl font-bold tracking-wide">
                Job Portal
            </Link>

            {/* MENU */}
            <div className="flex gap-6 items-center text-sm">

                <Link to="/" className="hover:text-blue-300 transition">
                    Home
                </Link>

                <Link to="/jobs" className="hover:text-blue-300 transition">
                    Jobs
                </Link>
               

                {/* USER ONLY */}
                {user?.role === "USER" && (
                    <Link to="/upload-resume" className="hover:text-blue-300 transition">
                        Upload Resume
                    </Link>
                    
                )}
                {/* USER ONLY */}
{user?.role === "USER" && (
    <Link
        to="/my-applications"
        className="hover:text-blue-300 transition"
    >
        My Applications
    </Link>
)}

                {/* ADMIN ONLY */}
                {user?.role === "ADMIN" && (
                    <Link to="/admin/dashboard" className="hover:text-blue-300 transition">
                        Dashboard
                    </Link>
                )}

                {/* 👤 USER INFO */}
                {user && (
                    <div className="bg-white/10 px-3 py-1 rounded-full text-xs border border-white/10">
                        {user.name}
                    </div>
                )}

                {user && (
    <Link to="/profile" className="hover:text-blue-300 transition">
        Profile
    </Link>
)}

                {/* 🛡 ROLE BADGE */}
                {user && (
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold border
                        ${user.role === "ADMIN"
                            ? "bg-red-500/20 text-red-300 border-red-400/30"
                            : "bg-green-500/20 text-green-300 border-green-400/30"
                        }`}
                    >
                        {user.role === "ADMIN" ? "🛡 ADMIN" : "👤 USER"}
                    </div>
                )}

                {/* LOGIN / LOGOUT */}
                {user ? (
                    <button
                        onClick={logout}
                        className="bg-red-500 hover:bg-red-600 px-4 py-1.5 rounded-full transition shadow-md"
                    >
                        Logout
                    </button>
                ) : (
                    <Link
                        to="/login"
                        className="bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded-full transition shadow-md"
                    >
                        Login
                    </Link>
                )}

            </div>

        </nav>
    );
}

export default Navbar;