import { useState } from "react";
import axios from "axios";

function AddJob() {

    const [job, setJob] = useState({
        title: "",
        company: "",
        location: "",
        salary: "",
        description: ""
    });

    const handleChange = (e) => {
        setJob({
            ...job,
            [e.target.name]: e.target.value
        });
    };

const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("JOB DATA:", job); // 🔥 DEBUG (must)

    try {
        await axios.post(
            "http://localhost:8080/jobs/add",
            job,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        alert("Job Added Successfully");

    } catch (error) {
        console.log(error);
        alert("Failed To Add Job");
    }
};
    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 p-6">

            <form
                onSubmit={handleSubmit}
                className="bg-white/20 backdrop-blur-lg border border-white/30 p-10 rounded-2xl shadow-2xl w-[500px]"
            >

                <h1 className="text-3xl font-extrabold mb-6 text-center text-white">
                    Add New Job 🚀
                </h1>

                <input
                    type="text"
                    name="title"
                    placeholder="Job Title"
                    onChange={handleChange}
                    className="w-full border border-white/30 bg-white/20 text-white placeholder-white p-3 rounded-lg mb-4 focus:ring-2 focus:ring-white outline-none"
                />

                <input
                    type="text"
                    name="company"
                    placeholder="Company Name"
                    onChange={handleChange}
                    className="w-full border border-white/30 bg-white/20 text-white placeholder-white p-3 rounded-lg mb-4 focus:ring-2 focus:ring-white outline-none"
                />

                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    onChange={handleChange}
                    className="w-full border border-white/30 bg-white/20 text-white placeholder-white p-3 rounded-lg mb-4 focus:ring-2 focus:ring-white outline-none"
                />

                <input
                    type="text"
                    name="salary"
                    placeholder="Salary"
                    onChange={handleChange}
                    className="w-full border border-white/30 bg-white/20 text-white placeholder-white p-3 rounded-lg mb-4 focus:ring-2 focus:ring-white outline-none"
                />

                <textarea
                    name="description"
                    placeholder="Job Description"
                    onChange={handleChange}
                    className="w-full border border-white/30 bg-white/20 text-white placeholder-white p-3 rounded-lg mb-6 focus:ring-2 focus:ring-white outline-none"
                />

                <button
                    type="submit"
                    className="w-full bg-white text-blue-600 font-bold p-3 rounded-lg hover:scale-105 transition"
                >
                    Add Job
                </button>

            </form>

        </div>
    );
}

export default AddJob;