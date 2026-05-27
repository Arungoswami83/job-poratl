import { Link } from "react-router-dom";

function Home() {

    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">

            <div className="text-center px-6">

                {/* TITLE */}
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                    Find Your Dream Job 🚀
                </h1>

                {/* SUBTITLE */}
                <p className="text-slate-300 text-lg md:text-xl mb-10">
                    Apply for latest jobs from top companies and start your career today
                </p>

                {/* BUTTONS */}
                <div className="flex flex-col md:flex-row justify-center gap-4">

                    <Link
                        to="/jobs"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition shadow-lg"
                    >
                        Explore Jobs
                    </Link>

                    <Link
                        to="/register"
                        className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-lg font-semibold transition backdrop-blur-md"
                    >
                        Get Started
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default Home;