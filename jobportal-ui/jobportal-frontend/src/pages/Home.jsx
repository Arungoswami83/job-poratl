function Home() {

    return (

        <div className="h-screen flex justify-center items-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">

            <div className="text-center bg-white/20 backdrop-blur-lg border border-white/30 p-10 rounded-2xl shadow-2xl w-[500px]">

                <h1 className="text-5xl font-extrabold text-white mb-4">
                    Welcome to Job Portal 🚀
                </h1>

                <p className="text-lg text-white/90 mb-8">
                    Find your dream job easily and grow your career with us
                </p>

                <button className="bg-white text-blue-600 font-bold px-6 py-3 rounded-lg hover:scale-105 transition">
                    Explore Jobs
                </button>

            </div>

        </div>
    )
}

export default Home