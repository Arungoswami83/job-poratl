import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
function ApplyJob() {
    const navigate = useNavigate();
   
    const { id } = useParams();

    const [resume, setResume] = useState(null);

    const handleSubmit = async (e) => {

        e.preventDefault();

        const userId = localStorage.getItem("userId");

        if (!userId) {
            alert("Please login first");
            return;
        }

        const formData = new FormData();

        formData.append("userId", userId);
        formData.append("jobId", id);
        formData.append("resume", resume);

        try {

            await axios.post(
                "http://localhost:8080/applications/apply",
                formData
            );

            alert("Applied Successfully 🚀");
            navigate("/my-applications");

        } catch (error) {

            console.log(error);
            alert("Apply Failed");

        }
    };

    return (

        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 px-4">

            {/* CARD */}
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl"
            >

                {/* TITLE */}
                <h1 className="text-4xl font-bold text-white text-center mb-3">
                    Apply Job 🚀
                </h1>

                <p className="text-slate-300 text-center mb-8">
                    Upload your resume to apply
                </p>

                {/* FILE INPUT */}
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-blue-400 rounded-2xl p-8 cursor-pointer hover:bg-white/5 transition duration-300">

                    <div className="text-5xl mb-4">
                        📄
                    </div>

                    <p className="text-white font-medium text-center">

                        {resume
                            ? resume.name
                            : "Choose Resume"}

                    </p>

                    <p className="text-slate-400 text-sm mt-2">
                        PDF, DOC, DOCX
                    </p>

                    <input
                        type="file"
                        hidden
                        onChange={(e) => setResume(e.target.files[0])}
                    />

                </label>

                {/* BUTTON */}
                <button
                    type="submit"
                    className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-lg transition duration-300 shadow-xl hover:scale-105"
                >
                    Submit Application
                </button>

            </form>

        </div>
    );
}

export default ApplyJob;