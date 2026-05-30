import { useEffect, useState } from "react";
import axios from "axios";

function MyApplications() {

    const [applications, setApplications] = useState([]);

    useEffect(() => {
        loadApplications();
    }, []);

    const loadApplications = async () => {

        try {

            const userId = localStorage.getItem("userId");

            const res = await axios.get(
                `http://localhost:8080/applications/user/${userId}`
            );

            setApplications(res.data);

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-8">

            <h1 className="text-4xl font-bold text-white text-center mb-8">
                My Applications
            </h1>

            <div className="overflow-x-auto bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">

                <table className="w-full text-white">

                    <thead>
                        <tr className="bg-blue-600">

                            <th className="p-4">ID</th>
                            <th className="p-4">Job Title</th>
                            <th className="p-4">Resume</th>
                            <th className="p-4">Status</th>

                        </tr>
                    </thead>

                    <tbody>

                        {applications.map((app) => (

                            <tr
                                key={app.id}
                                className="border-b border-white/10 text-center"
                            >

                                <td className="p-4">
                                    {app.id}
                                </td>

                                <td className="p-4">
                                    {app.job?.title}
                                </td>

                                <td className="p-4">
                                    {app.resume}
                                </td>

                                <td className="p-4">

                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-semibold
                                        ${app.status === "SELECTED"
                                                ? "bg-green-500/20 text-green-300"
                                                : app.status === "REJECTED"
                                                    ? "bg-red-500/20 text-red-300"
                                                    : app.status === "UNDER_REVIEW"
                                                        ? "bg-yellow-500/20 text-yellow-300"
                                                        : "bg-blue-500/20 text-blue-300"
                                            }`}
                                    >
                                        {app.status}
                                    </span>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default MyApplications;