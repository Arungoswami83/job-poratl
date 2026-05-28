import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://localhost:8080/auth/login",
                formData
            );

            console.log("LOGIN RESPONSE:", res.data);

            // 🔥 SAFE ID FETCH
            const userId = res.data.id || res.data.user?.id;

            if (!userId) {
                alert("Login failed: userId not found in response");
                return;
            }

            localStorage.setItem("userId", userId);
            localStorage.setItem("user", JSON.stringify(res.data));

            alert("Login Success");

            const role = res.data.role || res.data.user?.role;

            if (role === "ADMIN") {
                navigate("/admin/dashboard");
            } else {
                navigate("/");
            }

        } catch (error) {
            console.log(error);
            alert("Invalid Email or Password");
        }
    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">

            <form
                onSubmit={handleSubmit}
                className="w-[420px] bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl"
            >

                <h1 className="text-3xl font-bold text-center text-white mb-2">
                    Welcome Back
                </h1>

                <p className="text-center text-slate-300 mb-6 text-sm">
                    Login to your Job Portal account
                </p>

                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full mb-4 px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 outline-none focus:border-blue-500"
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full mb-5 px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 outline-none focus:border-blue-500"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition shadow-lg"
                >
                    Login
                </button>

                <p className="text-center mt-5 text-sm text-slate-300">
                    Don't have an account?
                    <Link
                        to="/register"
                        className="text-blue-400 ml-2 hover:underline"
                    >
                        Register
                    </Link>
                </p>

            </form>

        </div>
    );
}

export default Login;