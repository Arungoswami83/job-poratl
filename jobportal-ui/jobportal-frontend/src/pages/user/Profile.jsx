import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {

    const [user, setUser] = useState(null);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem("user"));
        setUser(loggedUser);

        setName(loggedUser?.name || "");
        setPassword(loggedUser?.password || "");
    }, []);

    const updateProfile = async () => {

        try {

            const res = await axios.put(
                `http://localhost:8080/users/${user.id}`,
                {
                    name,
                    password,
                    email: user.email,
                    role: user.role,
                    isActive: user.isActive ?? true
                }
            );

            alert("Profile Updated");

            localStorage.setItem("user", JSON.stringify(res.data));

        } catch (error) {
            console.log(error);
            alert("Update Failed");
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
                Loading...
            </div>
        );
    }

    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">

            <div className="w-[420px] bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl text-white">

                <h1 className="text-3xl font-bold text-center mb-6">
                    My Profile 👤
                </h1>

                {/* NAME */}
                <label className="text-sm text-slate-300">Name</label>
                <input
                    className="w-full mt-1 mb-4 px-4 py-3 rounded-lg bg-white/10 border border-white/20 outline-none focus:border-blue-500 text-white"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                {/* EMAIL */}
                <label className="text-sm text-slate-300">Email</label>
                <input
                    className="w-full mt-1 mb-4 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-slate-300"
                    value={user.email}
                    disabled
                />

                {/* PASSWORD */}
                <label className="text-sm text-slate-300">Password</label>
                <input
                    type="password"
                    className="w-full mt-1 mb-6 px-4 py-3 rounded-lg bg-white/10 border border-white/20 outline-none focus:border-blue-500 text-white"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {/* BUTTON */}
                <button
                    onClick={updateProfile}
                    className="w-full bg-blue-600 hover:bg-blue-700 transition py-3 rounded-lg font-semibold shadow-lg"
                >
                    Update Profile
                </button>

            </div>

        </div>
    );
}

export default Profile;