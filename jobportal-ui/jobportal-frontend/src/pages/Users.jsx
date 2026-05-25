import { useEffect, useState } from "react";
import axios from "axios";

function Users() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    const fetchUsers = async () => {
        try {
            const res = await axios.get("http://localhost:8080/users/all");
            setUsers(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        try {
            if (!window.confirm("Are you sure you want to delete this user?")) return;

            await axios.delete(`http://localhost:8080/users/${id}`);

            setUsers((prev) =>
                prev.map((u) =>
                    u.id === id ? { ...u, active: false } : u
                )
            );

        } catch (error) {
            console.log(error);
        }
    };

    const activeUsers = users.filter(u => u.active === true);

    const filteredUsers = activeUsers.filter((u) =>
        (u.name || "").toLowerCase().includes(search.toLowerCase()) ||
        (u.email || "").toLowerCase().includes(search.toLowerCase()) ||
        (u.role || "").toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 p-10">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-extrabold text-white">
                    👥 Users Management
                </h1>

                <span className="bg-white text-blue-600 font-bold px-4 py-1 rounded-full text-sm">
                    Total Active: {activeUsers.length}
                </span>
            </div>

            {/* SEARCH */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search by name, email, role..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:w-1/2 px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white focus:ring-2 focus:ring-white outline-none"
                />
            </div>

            {/* TABLE CARD */}
            <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl shadow-2xl overflow-hidden">

                <table className="w-full text-white">

                    <thead className="bg-white/10">
                        <tr>
                            <th className="p-4 text-left">Name</th>
                            <th className="p-4 text-left">Email</th>
                            <th className="p-4 text-left">Role</th>
                            <th className="p-4 text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((u) => (
                                <tr key={u.id} className="border-b border-white/10 hover:bg-white/10 transition">

                                    <td className="p-4">{u.name}</td>
                                    <td className="p-4">{u.email}</td>

                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-white text-sm ${
                                            u.role === "ADMIN"
                                                ? "bg-red-500"
                                                : "bg-green-500"
                                        }`}>
                                            {u.role}
                                        </span>
                                    </td>

                                    <td className="p-4 text-center">
                                        <button
                                            onClick={() => handleDelete(u.id)}
                                            className="bg-white text-red-600 font-bold px-3 py-1 rounded-lg hover:scale-105 transition"
                                        >
                                            Delete
                                        </button>
                                    </td>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center p-6 text-white/70">
                                    No Active Users Found 😢
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default Users;