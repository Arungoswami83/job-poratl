import { useEffect, useState } from "react";
import axios from "axios";

function ManageApplications() {

    const [applications, setApplications] = useState([]);

    useEffect(() => {
        loadApplications();
    }, []);

    const loadApplications = async () => {
        try {
            const res = await axios.get(
                "http://localhost:8080/applications/all"
            );
            setApplications(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await axios.put(
                `http://localhost:8080/applications/${id}/status?status=${status}`
            );

            loadApplications();

        } catch (error) {
            console.log(error);
            alert("Status Update Failed");
        }
    };

    const downloadResume = async (id) => {
        try {
            const response = await axios.get(
                `http://localhost:8080/applications/${id}/resume`,
                {
                    responseType: "blob",
                }
            );

            const url = window.URL.createObjectURL(
                new Blob([response.data])
            );

            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "resume.pdf");

            document.body.appendChild(link);
            link.click();
            link.remove();

        } catch (error) {
            console.log(error);
            alert("Resume download failed");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">

            <h1 className="text-4xl font-bold text-white text-center mb-8">
                Manage Applications
            </h1>

            <div className="overflow-x-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">

                <table className="w-full text-white">

                    <thead>
                        <tr className="bg-blue-600">
                            <th className="p-4">ID</th>
                            <th className="p-4">Applicant</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Job</th>
                            <th className="p-4">Resume</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {applications.map((app) => (
                            <tr
                                key={app.id}
                                className="border-b border-white/10 text-center"
                            >

                                <td className="p-4">{app.id}</td>

                                <td className="p-4">
                                    {app.user?.name}
                                </td>

                                <td className="p-4">
                                    {app.user?.email}
                                </td>

                                <td className="p-4">
                                    {app.job?.title}
                                </td>

                                <td className="p-4 text-sm text-gray-300">
                                    {app.resume}
                                </td>

                                <td className="p-4">
                                    <select
                                        value={app.status}
                                        onChange={(e) =>
                                            updateStatus(
                                                app.id,
                                                e.target.value
                                            )
                                        }
                                        className="bg-slate-800 border border-slate-600 text-white p-2 rounded-lg"
                                    >
                                        <option value="PENDING">
                                            Pending
                                        </option>

                                        <option value="UNDER_REVIEW">
                                            Under Review
                                        </option>

                                        <option value="SELECTED">
                                            Selected
                                        </option>

                                        <option value="REJECTED">
                                            Rejected
                                        </option>
                                    </select>
                                </td>

                                <td className="p-4">
                                    <button
                                        onClick={() =>
                                            downloadResume(app.id)
                                        }
                                        className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded-lg text-white"
                                    >
                                        Download
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default ManageApplications;