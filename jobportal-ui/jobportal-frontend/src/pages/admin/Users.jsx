import { useEffect, useState } from "react";
import axios from "axios";

function Users() {

    const [users, setUsers] = useState([]);

    // FETCH USERS
    const fetchUsers = async () => {

        try {

            const res = await axios.get(
                "http://localhost:8080/users/all"
            );

            setUsers(res.data);

        } catch (error) {

            console.log(error);
        }
    };

    // DELETE USER
    const deleteUser = async (id) => {

        try {

            await axios.delete(
                `http://localhost:8080/users/${id}`
            );

            alert("User Deleted");

            fetchUsers();

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        fetchUsers();

    }, []);

    return (

        <div className="min-h-screen bg-gray-100 p-10">

            <h1 className="text-4xl font-bold mb-8">
                All Users
            </h1>

            <div className="overflow-x-auto bg-white rounded-xl shadow">

                <table className="w-full">

                    <thead className="bg-blue-600 text-white">

                        <tr>

                            <th className="p-4">ID</th>

                            <th className="p-4">Name</th>

                            <th className="p-4">Email</th>

                            <th className="p-4">Role</th>

                            <th className="p-4">Status</th>

                            <th className="p-4">Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {users.map((user) => (

                            <tr
                                key={user.id}
                                className="text-center border-b"
                            >

                                <td className="p-4">
                                    {user.id}
                                </td>

                                <td className="p-4">
                                    {user.name}
                                </td>

                                <td className="p-4">
                                    {user.email}
                                </td>

                                <td className="p-4">
                                    {user.role}
                                </td>

                                <td className="p-4">

                                    {
                                        user.active
                                            ? "Active"
                                            : "Inactive"
                                    }

                                </td>

                                <td className="p-4">

                                    <button
                                        onClick={() =>
                                            deleteUser(user.id)
                                        }
                                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default Users;