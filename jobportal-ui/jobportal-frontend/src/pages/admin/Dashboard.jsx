import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Dashboard() {
    const [data, setData] = useState({ users: 0, jobs: 0 });
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
axios.get("http://localhost:8080/dashboard")
            .then(response => {

                setData(response.data);
            })
            .catch(error => {
                console.error("Error fetching dashboard data", error);
            });
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 p-10">
            {/* HEADER */}
            <div className="mb-10 flex justify-between items-start">
                {/* LEFT SIDE */}
                <div>
                    <h1 className="text-4xl font-bold text-white tracking-wide">
                        Admin Dashboard
                    </h1>
                    <p className="text-slate-300 mt-2">
                        Welcome Admin 👋 Manage your system from here
                    </p>
                </div>

                {/* RIGHT SIDE - USER INFO */}
                {user && (
                    <div className="text-right">
                        <div className="text-white font-semibold">
                            {user.name}
                        </div>
                        <div className={`mt-1 text-xs px-3 py-1 rounded-full border inline-block
                            ${user.role === "ADMIN"
                                ? "bg-red-500/20 text-red-300 border-red-400/30"
                                : "bg-green-500/20 text-green-300 border-green-400/30"
                            }`}
                        >
                            {user.role}
                        </div>
                    </div>
                )}

            </div>

            {/* CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* USERS CARD */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-lg hover:scale-105 transition">
                    <h2 className="text-2xl font-bold text-blue-400">
                        Users
                    </h2>
                    <p className="text-slate-300 mt-2">
                        Manage all registered users
                    </p>
                    <p className="text-3xl font-bold text-white mt-4">
                        {data.users}
                    </p>
                    <Link
                        to="/admin/users"
                        className="inline-block mt-5 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full transition shadow-md"
                    >
                        View Users
                    </Link>
                </div>

                {/* ADD JOB CARD */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-lg hover:scale-105 transition">
                    <h2 className="text-2xl font-bold text-green-400">
                        Add Job
                    </h2>
                    <p className="text-slate-300 mt-2">
                        Create new job postings
                    </p>
                    <Link
                        to="/admin/add-job"
                        className="inline-block mt-17 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full transition shadow-md"
                    >
                        Add Job
                    </Link>
                </div>

                {/* JOBS CARD */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-lg hover:scale-105 transition">
                    <h2 className="text-2xl font-bold text-purple-400">
                        Jobs
                    </h2>
                    <p className="text-slate-300 mt-2">
                        Manage all job postings
                    </p>
                    <p className="text-3xl font-bold text-white mt-4">
                        {data.jobs}
                    </p>
                    <Link
                        to="/jobs"
                        className="inline-block mt-5 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full transition shadow-md"
                    >
                        View Jobs
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;