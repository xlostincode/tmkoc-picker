import { useState } from "react"
import { MODES } from "../../api/const"

export default function Home() {
    const [activeTab, setActiveTab] = useState(MODES.RANDOM)

    return (
        <div className="relative min-h-screen bg-sky-50 overflow-hidden flex flex-col items-center justify-center p-4">
            {/* Playful Background Shapes */}
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-pink-300 rounded-full opacity-60"></div>
            <div className="absolute top-20 right-10 w-48 h-48 bg-yellow-300 rounded-[2rem] rotate-12 opacity-70"></div>
            <div className="absolute bottom-20 left-10 w-32 h-64 bg-emerald-300 rounded-full -rotate-12 opacity-60"></div>
            <div className="absolute bottom-10 right-20 w-0 h-0 border-l-[60px] border-l-transparent border-r-[60px] border-r-transparent border-b-[100px] border-b-orange-400 rotate-45 opacity-60"></div>
            <div className="absolute top-1/3 left-1/3 w-16 h-16 bg-purple-400 rounded-full opacity-70"></div>
            <div className="absolute top-2/3 right-1/4 w-20 h-20 bg-blue-400 rounded-2xl -rotate-12 opacity-70"></div>

            {/* Main Content Container */}
            <div className="relative z-10 bg-white/70 backdrop-blur-md p-10 rounded-3xl shadow-2xl border-4 border-white text-center max-w-3xl w-full">
                <h1 className="text-5xl md:text-6xl font-extrabold text-indigo-600 drop-shadow-sm mb-4 tracking-wide">
                    TMKOC
                </h1>
                <p className="text-gray-600 font-medium text-lg mb-8">
                    Discover Episodes
                </p>

                {/* Tabs Wrapper */}
                <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
                    {Object.values(MODES).map((mode) => (
                        <button
                            key={mode}
                            onClick={() => setActiveTab(mode)}
                            className={`px-4 py-2 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 border-2 ${activeTab === mode
                                ? 'bg-indigo-500 border-indigo-500 text-white shadow-md scale-105'
                                : 'bg-white border-white text-gray-500 hover:text-indigo-500 hover:border-indigo-200 hover:bg-indigo-50 shadow-sm'
                                }`}
                        >
                            {mode.replace('_', ' ').toUpperCase()}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="bg-indigo-50/50 backdrop-blur-sm rounded-2xl p-8 border-2 border-indigo-100 min-h-[200px] flex items-center justify-center">
                    <p className="text-2xl font-bold text-indigo-400 uppercase tracking-widest">
                        {activeTab.replace('_', ' ')}
                    </p>
                </div>
            </div>
        </div >
    )
}