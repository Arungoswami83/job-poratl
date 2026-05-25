import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {

        const response = await axios.post(
            "http://localhost:8080/users/login",
            loginData
        );

        const user = response.data;

       if (user != null) {

    localStorage.setItem("user", JSON.stringify(user));

    alert("Login Successful");

    // ADMIN
    if (user.role === "ADMIN") {

        window.location.href = "/jobs";

    }

    // USER
    else {

        window.location.href = "/jobs";
    }

} else {

    alert("Invalid Credentials");
}

        
    } catch (error) {
        console.log(error);
        alert("Login Failed");
    }

    setLoading(false);
};
    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">

            <form
                onSubmit={handleSubmit}
                className="bg-white/20 backdrop-blur-lg border border-white/30 p-10 rounded-2xl shadow-2xl w-[400px]"
            >

                <h1 className="text-4xl font-extrabold mb-6 text-center text-white">
                    Welcome Back
                </h1>

                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    onChange={handleChange}
                    className="w-full border border-white/30 bg-white/20 text-white placeholder-white p-3 rounded-lg mb-4 focus:ring-2 focus:ring-white outline-none"
                />

                <div className="relative mb-6">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter Password"
                        onChange={handleChange}
                        className="w-full border border-white/30 bg-white/20 text-white placeholder-white p-3 rounded-lg pr-10 focus:ring-2 focus:ring-white outline-none"
                    />

                    <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 cursor-pointer text-white"
                    >
                        👁️
                    </span>
                </div>

                <button
                    type="submit"
                    className="w-full bg-white text-blue-600 font-bold p-3 rounded-lg hover:scale-105 transition flex justify-center items-center"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <p className="text-center text-white mt-4 text-sm">
                    Don’t have an account?
                    <span
                        onClick={() => navigate("/register")}
                        className="underline cursor-pointer ml-1"
                    >
                        Register
                    </span>
                </p>

            </form>

        </div>
    );
}

export default Login;