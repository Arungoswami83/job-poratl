import { useState } from "react";

function UploadResume() {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (file) => {
    setFile(file);
  };

  const handleChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a resume");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await fetch("http://localhost:8080/api/resume/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Resume uploaded successfully!");
        setFile(null);
      } else {
        alert("Upload failed!");
      }
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 p-6">

      <div className="w-full max-w-md bg-white/20 backdrop-blur-lg border border-white/30 p-6 rounded-2xl shadow-2xl">

        <h2 className="text-3xl font-extrabold text-center text-white mb-6">
          Upload Resume 📄
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Drop Area */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition ${
              dragActive
                ? "border-white bg-white/20"
                : "border-white/40 bg-white/10"
            }`}
          >
            <input
              type="file"
              className="hidden"
              id="fileUpload"
              onChange={handleChange}
            />

            <label htmlFor="fileUpload" className="cursor-pointer text-white">
              <p className="text-lg font-medium">
                Drag & Drop your resume here
              </p>

              <p className="text-sm text-white/80 mt-1">
                or click to browse (PDF, DOC, DOCX)
              </p>
            </label>
          </div>

          {/* File name */}
          {file && (
            <div className="text-center text-green-300 text-sm">
              Selected: {file.name}
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-white text-blue-600 font-bold py-3 rounded-xl hover:scale-105 transition"
          >
            Upload Resume
          </button>

        </form>

      </div>

    </div>
  );
}

export default UploadResume;