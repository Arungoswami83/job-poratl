import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

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

    // FETCH JOB BY ID
    const fetchJob = async () => {

        try {

            const res = await axios.get(
                `http://localhost:8080/jobs/${id}`
            );

            setJob(res.data);

        } catch (error) {

            console.log(error);
        }
    };

    // HANDLE INPUT
    const handleChange = (e) => {

        setJob({
            ...job,
            [e.target.name]: e.target.value
        });
    };

    // UPDATE JOB
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await axios.put(
                `http://localhost:8080/jobs/${id}`,
                job
            );

            alert("Job Updated Successfully");

            navigate("/jobs");

        } catch (error) {

            console.log(error);

            alert("Update Failed");
        }
    };

    useEffect(() => {

        fetchJob();

    }, []);

    return (

        <div className="min-h-screen bg-gray-100 flex justify-center items-center">

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow w-[500px]"
            >

                <h1 className="text-3xl font-bold mb-6 text-center">
                    Edit Job
                </h1>

                <input
                    type="text"
                    name="title"
                    value={job.title}
                    onChange={handleChange}
                    placeholder="Job Title"
                    className="w-full border p-3 mb-4 rounded"
                />

                <input
                    type="text"
                    name="company"
                    value={job.company}
                    onChange={handleChange}
                    placeholder="Company"
                    className="w-full border p-3 mb-4 rounded"
                />

                <input
                    type="text"
                    name="location"
                    value={job.location}
                    onChange={handleChange}
                    placeholder="Location"
                    className="w-full border p-3 mb-4 rounded"
                />

                <input
                    type="text"
                    name="salary"
                    value={job.salary}
                    onChange={handleChange}
                    placeholder="Salary"
                    className="w-full border p-3 mb-4 rounded"
                />

                <textarea
                    name="description"
                    value={job.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="w-full border p-3 mb-4 rounded h-32"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
                >
                    Update Job
                </button>

            </form>

        </div>
    );
}

export default EditJob;