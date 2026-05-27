function Footer() {

    return (

        <footer className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-t border-white/10">

            <div className="max-w-7xl mx-auto px-6 py-6 text-center">

                {/* TITLE */}
                <h1 className="text-xl font-bold text-white tracking-wide">
                    Job Portal
                </h1>

                {/* TEXT */}
                <p className="mt-2 text-slate-400 text-sm">
                    © 2026 All Rights Reserved • Built with React & Spring Boot
                </p>

                {/* SMALL TAG */}
                <div className="mt-3">
                    <span className="text-xs text-slate-500">
                        Telegram-style UI • Modern SaaS Design
                    </span>
                </div>

            </div>

        </footer>
    );
}

export default Footer;