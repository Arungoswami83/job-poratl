import { Link } from "react-router-dom";

function Home() {

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center px-6 overflow-hidden relative">

            {/* BACKGROUND BLUR CIRCLES */}
            <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>

            {/* MAIN CONTENT */}
            <div className="relative z-10 max-w-5xl text-center">

                {/* SMALL BADGE */}
                <div className="inline-block px-4 py-2 mb-6 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-blue-300 text-sm shadow-lg">
                    🚀 India’s Modern Job Portal
                </div>

                {/* HEADING */}
                <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">

                    Find Your
                    <span className="text-blue-400"> Dream Job </span>
                    Today

                </h1>

                {/* SUBTEXT */}
                <p className="mt-6 text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">

                    Discover top companies, apply instantly, upload resumes,
                    and build your career with the latest opportunities.

                </p>

                {/* BUTTONS */}
                <div className="mt-10 flex flex-col sm:flex-row justify-center gap-5">

                    <Link
                        to="/jobs"
                        className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg transition duration-300 shadow-2xl hover:scale-105"
                    >
                        Explore Jobs
                    </Link>

                    <Link
                        to="/register"
                        className="px-8 py-4 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold text-lg transition duration-300 hover:scale-105"
                    >
                        Get Started
                    </Link>

                </div>

                {/* STATS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">

                    <div className="bg-white/10 border border-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
                        <h2 className="text-4xl font-bold text-blue-400">
                            100+
                        </h2>
                        <p className="text-slate-300 mt-2">
                            Active Jobs
                        </p>
                    </div>

                    <div className="bg-white/10 border border-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
                        <h2 className="text-4xl font-bold text-green-400">
                            50+
                        </h2>
                        <p className="text-slate-300 mt-2">
                            Companies
                        </p>
                    </div>

                    <div className="bg-white/10 border border-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
                        <h2 className="text-4xl font-bold text-purple-400">
                            1000+
                        </h2>
                        <p className="text-slate-300 mt-2">
                            Job Seekers
                        </p>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Home;