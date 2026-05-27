import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Jobs() {

    const [jobs, setJobs] = useState([]);

    const user = JSON.parse(localStorage.getItem("user"));

    const fetchJobs = async () => {
        try {
            const res = await axios.get("http://localhost:8080/jobs");
            setJobs(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteJob = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/jobs/${id}`);
            alert("Job Deleted");
            fetchJobs();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-10">

            {/* HEADER */}
            <h1 className="text-4xl font-bold text-white mb-10 text-center">
                Available Jobs 💼
            </h1>

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {jobs.map((job) => (

                    <div
                        key={job.id}
                        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-6 text-white hover:scale-[1.02] transition"
                    >

                        {/* TITLE */}
                        <h2 className="text-2xl font-bold text-blue-400 mb-3">
                            {job.title}
                        </h2>

                        {/* DETAILS */}
                        <div className="space-y-2 text-sm text-slate-200">

                            <p><span className="text-slate-400">Company:</span> {job.company}</p>

                            <p><span className="text-slate-400">Location:</span> {job.location}</p>

                            <p><span className="text-slate-400">Salary:</span> {job.salary}</p>

                        </div>

                        {/* DESCRIPTION */}
                        <p className="mt-4 text-slate-300 text-sm">
                            {job.description}
                        </p>

                        {/* ACTIONS */}
                        <div className="mt-6 flex flex-wrap gap-3">

                            {/* ADMIN */}
                            {user?.role === "ADMIN" && (
                                <>
                                    <Link
                                        to={`/admin/edit-job/${job.id}`}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm transition"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        onClick={() => deleteJob(job.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition"
                                    >
                                        Delete
                                    </button>
                                </>
                            )}

                            {/* USER APPLY */}
                            {user?.role === "USER" && (
                                <Link
                                    to={`/apply/${job.id}`}
                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition"
                                >
                                    Apply Now
                                </Link>
                            )}

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default Jobs;