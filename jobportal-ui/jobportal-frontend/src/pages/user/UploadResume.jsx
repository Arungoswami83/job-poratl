import { useState } from "react";

function UploadResume() {

    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = (e) => {

        e.preventDefault();

        if (!file) {
            alert("Please Select Resume");
            return;
        }

        alert("Resume Uploaded Successfully");
        console.log(file);
    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">

            <form
                onSubmit={handleUpload}
                className="w-[420px] bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl text-white"
            >

                {/* TITLE */}
                <h1 className="text-3xl font-bold text-center mb-2">
                    Upload Resume 📄
                </h1>

                <p className="text-center text-slate-300 text-sm mb-6">
                    Upload your latest CV to apply for jobs
                </p>

                {/* FILE INPUT */}
                <label className="block text-sm text-slate-300 mb-2">
                    Choose File
                </label>

                <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full mb-6 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white file:bg-blue-600 file:text-white file:px-4 file:py-2 file:rounded-lg file:border-0 file:cursor-pointer"
                />

                {/* SELECTED FILE */}
                {file && (
                    <div className="mb-4 text-sm text-slate-300">
                        Selected: <span className="text-blue-400">{file.name}</span>
                    </div>
                )}

                {/* BUTTON */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 transition py-3 rounded-lg font-semibold shadow-lg"
                >
                    Upload Resume
                </button>

            </form>

        </div>
    );
}

export default UploadResume;