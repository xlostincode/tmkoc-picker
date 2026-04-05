export default function Home() {
    return (
        <div className="relative min-h-screen bg-sky-50 overflow-hidden flex flex-col items-center justify-center p-4">
            {/* Playful Background Shapes */}
            {/* Big pink circle */}
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-pink-300 rounded-full opacity-60"></div>

            {/* Yellow rounded square */}
            <div className="absolute top-20 right-10 w-48 h-48 bg-yellow-300 rounded-[2rem] rotate-12 opacity-70"></div>

            {/* Green pill shape */}
            <div className="absolute bottom-20 left-10 w-32 h-64 bg-emerald-300 rounded-full -rotate-12 opacity-60"></div>

            {/* Orange triangle */}
            <div className="absolute bottom-10 right-20 w-0 h-0 border-l-[60px] border-l-transparent border-r-[60px] border-r-transparent border-b-[100px] border-b-orange-400 rotate-45 opacity-60"></div>

            {/* Small purple circle */}
            <div className="absolute top-1/3 left-1/3 w-16 h-16 bg-purple-400 rounded-full opacity-70"></div>

            {/* Small blue square */}
            <div className="absolute top-2/3 right-1/4 w-20 h-20 bg-blue-400 rounded-2xl -rotate-12 opacity-70"></div>

            {/* Main Content Container */}
            <div className="relative z-10 bg-white/70 backdrop-blur-md p-12 rounded-3xl shadow-2xl border-4 border-white text-center max-w-md w-full">
                <h1 className="text-5xl md:text-6xl font-extrabold text-indigo-600 drop-shadow-sm mb-4 tracking-wide">
                    Home
                </h1>
                <p className="text-gray-600 font-medium text-lg">
                    Discover TMKOC Episodes
                </p>
            </div>
        </div>
    )
}