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

    // HANDLE INPUT
    const handleChange = (e) => {

        setJob({
            ...job,
            [e.target.name]: e.target.value
        });
    };

    // ADD JOB
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

        <div className="min-h-screen bg-gray-100 flex justify-center items-center">

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow w-[500px]"
            >

                <h1 className="text-3xl font-bold mb-6 text-center">
                    Add Job
                </h1>

                <input
                    type="text"
                    name="title"
                    placeholder="Job Title"
                    value={job.title}
                    onChange={handleChange}
                    className="w-full border p-3 mb-4 rounded"
                    required
                />

                <input
                    type="text"
                    name="company"
                    placeholder="Company Name"
                    value={job.company}
                    onChange={handleChange}
                    className="w-full border p-3 mb-4 rounded"
                    required
                />

                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={job.location}
                    onChange={handleChange}
                    className="w-full border p-3 mb-4 rounded"
                />

                <input
                    type="text"
                    name="salary"
                    placeholder="Salary"
                    value={job.salary}
                    onChange={handleChange}
                    className="w-full border p-3 mb-4 rounded"
                />

                <textarea
                    name="description"
                    placeholder="Job Description"
                    value={job.description}
                    onChange={handleChange}
                    className="w-full border p-3 mb-4 rounded h-32"
                />

                <button
                    type="submit"
                    className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700"
                >
                    Add Job
                </button>

            </form>

        </div>
    );
}

export default AddJob;