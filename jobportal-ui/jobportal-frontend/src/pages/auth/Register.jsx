import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "USER"
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

            await axios.post(
                "http://localhost:8080/auth/register",
                formData
            );

            alert("Registration Success");

            navigate("/login");

        } catch (error) {
            console.log(error);
            alert("Registration Failed");
        }
    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">

            <form
                onSubmit={handleSubmit}
                className="w-[420px] bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl"
            >

                <h1 className="text-3xl font-bold text-center text-white mb-2">
                    Create Account
                </h1>

                <p className="text-center text-slate-300 mb-6 text-sm">
                    Join Job Portal today
                </p>

                {/* NAME */}
                <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full mb-4 px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 outline-none focus:border-green-500"
                    required
                />

                {/* EMAIL */}
                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full mb-4 px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 outline-none focus:border-green-500"
                    required
                />

                {/* PASSWORD */}
                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full mb-4 px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 outline-none focus:border-green-500"
                    required
                />

                {/* ROLE */}
            <select
    name="role"
    value={formData.role}
    onChange={handleChange}
    className="w-full mb-5 px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 outline-none focus:border-green-500"
>
    <option className="text-black" value="USER">
        Job Seeker
    </option>

    <option className="text-black" value="EMPLOYER">
        Employer / Company
    </option>
</select>

                {/* BUTTON */}
                <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition shadow-lg"
                >
                    Register
                </button>

                {/* LINK */}
                <p className="text-center mt-5 text-sm text-slate-300">
                    Already have an account?
                    <Link
                        to="/login"
                        className="text-blue-400 ml-2 hover:underline"
                    >
                        Login
                    </Link>
                </p>

            </form>

        </div>
    );
}

export default Register;