import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function ApplyJob() {

    const { id } = useParams();

    const [resume, setResume] = useState(null);

    const handleSubmit = async (e) => {

        e.preventDefault();

        const formData = new FormData();

        formData.append("jobId", id);
        formData.append("resume", resume);

        try {

            await axios.post(
                "http://localhost:8080/applications/apply",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            alert("Applied Successfully");

        } catch (error) {

            console.log(error);
            alert("Apply Failed");
        }
    };

    return (

        <div className="min-h-screen flex justify-center items-center">

            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 shadow rounded w-[400px]"
            >

                <h1 className="text-2xl font-bold mb-4">
                    Apply Job
                </h1>

                <input
                    type="file"
                    onChange={(e) => setResume(e.target.files[0])}
                    className="mb-4"
                />

                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded w-full"
                >
                    Submit
                </button>

            </form>

        </div>
    );
}

export default ApplyJob;