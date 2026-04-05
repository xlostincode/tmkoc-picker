import { useState } from "react"
import { MODES } from "../../api/const"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex flex-col items-center">
                    <TabsList className="mb-8 flex flex-wrap !h-auto justify-center gap-3 bg-transparent">
                        {Object.values(MODES).map((mode) => (
                            <TabsTrigger
                                key={mode}
                                value={mode}
                                className="!h-auto px-6 py-3.5 rounded-md font-bold text-sm tracking-wide data-[state=active]:bg-indigo-600 data-[state=active]:text-white shadow-sm hover:bg-white/50 transition-all text-slate-600"
                            >
                                {mode.replace('_', ' ').toUpperCase()}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {Object.values(MODES).map((mode) => (
                        <TabsContent key={mode} value={mode} className="w-full">
                            <div className="bg-indigo-50/50 backdrop-blur-sm rounded-2xl p-8 border-2 border-indigo-100 min-h-[200px] flex items-center justify-center">
                                <p className="text-2xl font-bold text-indigo-400 uppercase tracking-widest">
                                    {mode.replace('_', ' ')}
                                </p>
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </div>
    )
}