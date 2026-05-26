import { useEffect, useState } from "react";
import axios from "axios";

function Users() {

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    // EDIT STATE
    const [editUser, setEditUser] = useState(null);

    // FETCH USERS
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

    // DELETE USER
    const handleDelete = async (id) => {

        try {

            const confirmDelete = window.confirm(
                "Are you sure you want to deactivate this user?"
            );

            if (!confirmDelete) return;

            await axios.delete(`http://localhost:8080/users/${id}`);

            setUsers((prevUsers) =>
                prevUsers.map((u) =>
                    u.id === id
                        ? { ...u, active: false }
                        : u
                )
            );

            alert("User deactivated successfully");

        } catch (error) {
            console.log(error);
        }
    };

    // OPEN EDIT
    const handleEditClick = (user) => {
        setEditUser(user);
    };

    // HANDLE INPUT CHANGE
    const handleChange = (e) => {
        setEditUser({
            ...editUser,
            [e.target.name]: e.target.value
        });
    };

    // UPDATE USER
    const handleUpdate = async () => {

        try {

            await axios.put(
                `http://localhost:8080/users/${editUser.id}`,
                editUser
            );

            // UI UPDATE
            setUsers((prevUsers) =>
                prevUsers.map((u) =>
                    u.id === editUser.id ? editUser : u
                )
            );

            alert("User updated successfully");

            setEditUser(null);

        } catch (error) {
            console.log(error);
        }
    };

    // ACTIVE USERS
    const activeUsers = users.filter(
        (u) => u.active === true
    );

    // SEARCH
    const filteredUsers = activeUsers.filter((u) =>
        (u.name || "")
            .toLowerCase()
            .includes(search.toLowerCase()) ||

        (u.email || "")
            .toLowerCase()
            .includes(search.toLowerCase()) ||

        (u.role || "")
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (

        <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 p-10">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">

                <h1 className="text-4xl font-extrabold text-white">
                    👥 Users Management
                </h1>

                <span className="bg-white text-blue-600 font-bold px-4 py-2 rounded-full">
                    Total Active Users : {activeUsers.length}
                </span>

            </div>

            {/* SEARCH */}
            <div className="mb-6">

                <input
                    type="text"
                    placeholder="Search by name, email, role..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:w-1/2 px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white outline-none"
                />

            </div>

            {/* TABLE */}
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl border border-white/20">

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

                                <tr
                                    key={u.id}
                                    className="border-b border-white/10 hover:bg-white/10 transition"
                                >

                                    <td className="p-4">
                                        {u.name}
                                    </td>

                                    <td className="p-4">
                                        {u.email}
                                    </td>

                                    <td className="p-4">

                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                                u.role === "ADMIN"
                                                    ? "bg-red-500"
                                                    : "bg-green-500"
                                            }`}
                                        >
                                            {u.role}
                                        </span>

                                    </td>

                                    <td className="p-4 text-center flex gap-2 justify-center">

                                        <button
                                            onClick={() => handleEditClick(u)}
                                            className="bg-yellow-400 text-black font-bold px-4 py-2 rounded-lg hover:scale-105 transition"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => handleDelete(u.id)}
                                            className="bg-white text-red-600 font-bold px-4 py-2 rounded-lg hover:scale-105 transition"
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))

                        ) : (

                            <tr>

                                <td
                                    colSpan="4"
                                    className="text-center p-6 text-white/70"
                                >
                                    No Active Users Found 😢
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

            {/* EDIT MODAL */}
            {editUser && (

                <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

                    <div className="bg-white p-8 rounded-2xl w-[400px]">

                        <h2 className="text-2xl font-bold mb-5 text-center">
                            Edit User
                        </h2>

                        <input
                            type="text"
                            name="name"
                            value={editUser.name}
                            onChange={handleChange}
                            placeholder="Name"
                            className="w-full border p-3 rounded-lg mb-4"
                        />

                        <input
                            type="email"
                            name="email"
                            value={editUser.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="w-full border p-3 rounded-lg mb-4"
                        />

                        <input
                            type="password"
                            name="password"
                            value={editUser.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="w-full border p-3 rounded-lg mb-4"
                        />

                        <select
                            name="role"
                            value={editUser.role}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg mb-4"
                        >
                            <option value="USER">USER</option>
                            <option value="ADMIN">ADMIN</option>
                        </select>

                        <div className="flex justify-between">

                            <button
                                onClick={() => setEditUser(null)}
                                className="bg-gray-400 text-white px-5 py-2 rounded-lg"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleUpdate}
                                className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                            >
                                Update
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}

export default Users;