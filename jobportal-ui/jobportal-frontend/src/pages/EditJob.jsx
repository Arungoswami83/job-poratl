import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditJob() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [job, setJob] = useState({
        title: "",
        company: "",
        location: "",
        salary: "",
        description: ""
    });

    // ✅ FIX: logs after state
    useEffect(() => {
        console.log("JOB ID:", id);
        console.log("CURRENT JOB STATE:", job);
    }, [id, job]);

    useEffect(() => {
        fetchJob();
    }, [id]);

    const fetchJob = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/jobs/${id}`);
            setJob(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e) => {
        setJob({
            ...job,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            console.log("UPDATING JOB:", job);

            await axios.put(
                `http://localhost:8080/jobs/${id}`,
                job
            );

            alert("Job Updated Successfully");
            navigate("/jobs");

        } catch (err) {
            console.log("UPDATE ERROR:", err);
            alert("Update Failed");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">

            <form onSubmit={handleUpdate} className="bg-white p-6 rounded shadow w-96">

                <h2 className="text-xl font-bold mb-4">Edit Job</h2>

                <input
                    name="title"
                    value={job.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="w-full border p-2 mb-2"
                />

                <input
                    name="company"
                    value={job.company}
                    onChange={handleChange}
                    placeholder="Company"
                    className="w-full border p-2 mb-2"
                />

                <input
                    name="location"
                    value={job.location}
                    onChange={handleChange}
                    placeholder="Location"
                    className="w-full border p-2 mb-2"
                />

                <input
                    name="salary"
                    value={job.salary}
                    onChange={handleChange}
                    placeholder="Salary"
                    className="w-full border p-2 mb-2"
                />

                <textarea
                    name="description"
                    value={job.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="w-full border p-2 mb-2"
                />

                <button className="bg-blue-500 text-white px-4 py-2 w-full">
                    Update Job
                </button>

            </form>

        </div>
    );
}

export default EditJob;