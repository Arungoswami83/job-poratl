import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Jobs() {
      
    const [jobs, setJobs] = useState([]);
    const location = useLocation();

    const query = new URLSearchParams(location.search).get("search") || "";

    // ✅ SAFE USER + ROLE FIX
    const user = JSON.parse(
        localStorage.getItem("user") ||
        localStorage.getItem("loggedInUser") ||
        "null"
    );

    const role = user?.role ? user.role.trim().toUpperCase() : "";

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await axios.get("http://localhost:8080/jobs");
            setJobs(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    // 🔥 APPLY JOB
    const applyJob = async (jobId) => {

        if (!user) {
            alert("Please Login First");
            return;
        }

        const applicationData = {
            userId: user.id,
            jobId: jobId,
            resume: "resume.pdf"
        };

        try {
            await axios.post("http://localhost:8080/applications/apply", applicationData);
            alert("Job Applied Successfully");
        } catch (error) {
            console.log(error);
            alert("Application Failed");
        }
    };

    // 🔥 DELETE JOB (ADMIN)
    const deleteJob = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/jobs/${id}`);
            alert("Job Deleted");
            fetchJobs();
        } catch (error) {
            console.log(error);
        }
    };

    // 🔥 UPDATE JOB
    const updateJob = (jobId) => {
        window.location.href = `/edit-job/${jobId}`;
    };

    const filteredJobs = jobs.filter((job) =>
        job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.company.toLowerCase().includes(query.toLowerCase()) ||
        job.location.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 p-10">

            {/* HEADER */}
            <div className="text-center mb-10">
                <h1 className="text-5xl font-extrabold text-white">
                    Available Jobs 🚀
                </h1>

                {query && (
                    <p className="text-white/80 mt-3">
                        Search results for: <b>{query}</b>
                    </p>
                )}
            </div>

            {/* JOB GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {filteredJobs.length > 0 ? (

                    filteredJobs.map((job) => (
                        <div
                            key={job.id}
                            className="bg-white/20 backdrop-blur-lg border border-white/30 p-6 rounded-2xl shadow-2xl hover:scale-105 transition"
                        >

                            <h2 className="text-2xl font-bold text-white mb-3">
                                {job.title}
                            </h2>

                            <p className="text-white/90 mb-1">
                                Company: {job.company}
                            </p>

                            <p className="text-white/90 mb-1">
                                Location: {job.location}
                            </p>

                            <p className="text-white/90 mb-4">
                                Salary: {job.salary}
                            </p>

                            {/* APPLY */}
                            <button
                                onClick={() => applyJob(job.id)}
                                className="bg-white text-blue-600 font-bold px-5 py-2 rounded-lg hover:scale-105 transition"
                            >
                                Apply Now
                            </button>

                            {/* ADMIN BUTTONS */}
                            {role === "ADMIN" && (
                                <div className="flex gap-2 mt-3">

                                    <button
                                        onClick={() => updateJob(job.id)}
                                        className="bg-yellow-400 px-3 py-1 rounded font-bold"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => deleteJob(job.id)}
                                        className="bg-red-500 px-3 py-1 rounded font-bold text-white"
                                    >
                                        Delete
                                    </button>

                                </div>
                            )}

                        </div>
                    ))

                ) : (
                    <p className="text-center col-span-3 text-white">
                        No jobs found 😢
                    </p>
                )}

            </div>

        </div>
    );
}

export default Jobs;