import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.post(
                "http://localhost:8080/users/register",
                user
            );

            alert("User Registered Successfully");
            navigate("/login");

        } catch (error) {
            console.log(error);
            alert("Error");
        }

        setLoading(false);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-red-500">

            <form
                onSubmit={handleSubmit}
                className="bg-white/20 backdrop-blur-lg border border-white/30 p-10 rounded-2xl shadow-2xl w-[400px]"
            >

                <h1 className="text-4xl font-extrabold mb-6 text-center text-white">
                    Create Account
                </h1>

                <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    onChange={handleChange}
                    className="w-full border border-white/30 bg-white/20 text-white placeholder-white p-3 rounded-lg mb-4 focus:ring-2 focus:ring-white outline-none"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    onChange={handleChange}
                    className="w-full border border-white/30 bg-white/20 text-white placeholder-white p-3 rounded-lg mb-4 focus:ring-2 focus:ring-white outline-none"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    onChange={handleChange}
                    className="w-full border border-white/30 bg-white/20 text-white placeholder-white p-3 rounded-lg mb-6 focus:ring-2 focus:ring-white outline-none"
                />

                <button
                    type="submit"
                    className="w-full bg-white text-purple-600 font-bold p-3 rounded-lg hover:scale-105 transition flex justify-center items-center"
                >
                    {loading ? "Creating..." : "Register"}
                </button>

                <p className="text-center text-white mt-4 text-sm">
                    Already have an account?
                    <span
                        onClick={() => navigate("/login")}
                        className="underline cursor-pointer ml-1"
                    >
                        Login
                    </span>
                </p>

            </form>

        </div>
    );
}

export default Register;