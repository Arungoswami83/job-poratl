import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddJob() {

    const navigate = useNavigate();

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

        try {

            await axios.post(
                "http://localhost:8080/jobs",
                job
            );

            alert("Job Added Successfully");
            navigate("/jobs");

        } catch (error) {

            console.log(error);
            alert("Failed To Add Job");
        }
    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-xl bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl text-white"
            >

                <h1 className="text-3xl font-bold text-center mb-8">
                    Add New Job 💼
                </h1>

                {/* Job Title */}
                <label className="text-sm text-slate-300">
                    Job Title
                </label>
                <input
                    type="text"
                    name="title"
                    placeholder="Enter Job Title"
                    value={job.title}
                    onChange={handleChange}
                    className="w-full mt-1 mb-4 px-4 py-3 rounded-lg bg-white/10 border border-white/20 outline-none focus:border-blue-500 text-white placeholder-slate-400"
                    required
                />

                {/* Company Name */}
                <label className="text-sm text-slate-300">
                    Company Name
                </label>
                <input
                    type="text"
                    name="company"
                    placeholder="Enter Company Name"
                    value={job.company}
                    onChange={handleChange}
                    className="w-full mt-1 mb-4 px-4 py-3 rounded-lg bg-white/10 border border-white/20 outline-none focus:border-blue-500 text-white placeholder-slate-400"
                    required
                />

                {/* Location */}
                <label className="text-sm text-slate-300">
                    Location
                </label>
                <input
                    type="text"
                    name="location"
                    placeholder="Enter Location"
                    value={job.location}
                    onChange={handleChange}
                    className="w-full mt-1 mb-4 px-4 py-3 rounded-lg bg-white/10 border border-white/20 outline-none focus:border-blue-500 text-white placeholder-slate-400"
                />

                {/* Salary */}
                <label className="text-sm text-slate-300">
                    Salary
                </label>
                <input
                    type="text"
                    name="salary"
                    placeholder="Enter Salary"
                    value={job.salary}
                    onChange={handleChange}
                    className="w-full mt-1 mb-4 px-4 py-3 rounded-lg bg-white/10 border border-white/20 outline-none focus:border-blue-500 text-white placeholder-slate-400"
                />

                {/* Description */}
                <label className="text-sm text-slate-300">
                    Job Description
                </label>
                <textarea
                    name="description"
                    placeholder="Enter Job Description"
                    value={job.description}
                    onChange={handleChange}
                    className="w-full mt-1 mb-6 px-4 py-3 rounded-lg bg-white/10 border border-white/20 outline-none focus:border-blue-500 text-white placeholder-slate-400 h-32 resize-none"
                />

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 transition py-3 rounded-lg font-semibold shadow-lg"
                >
                    Add Job
                </button>

            </form>

        </div>
    );
}

export default AddJob;