import { useState, useCallback } from "react"
import { MODES } from "../../api/const"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useEpisode } from "../../mutations/useEpisode"

const MIN_EPISODE = 1
const MAX_EPISODE = 4633

export default function Home() {
    const [activeTab, setActiveTab] = useState<typeof MODES[keyof typeof MODES]>(MODES.RANDOM)
    const [episodeRange, setEpisodeRange] = useState([MIN_EPISODE, MAX_EPISODE])
    const [cutoff, setCutoff] = useState([50])

    const { mutateAsync: fetchEpisode, isPending: isLoading } = useEpisode()

    const handleRangeChange = useCallback((value: number[]) => {
        setEpisodeRange(value)
    }, [])

    const handleCutoffChange = useCallback((value: number[]) => {
        setCutoff(value)
    }, [])

    const getModeText = () => {
        switch (activeTab) {
            case MODES.RANDOM:
                return `Pick a random episode between Ep. ${episodeRange[0]} and Ep. ${episodeRange[1]}`
            case MODES.MOST_VIEWED:
                return `Pick a random episode from the top ${cutoff[0]} most viewed episodes`
            case MODES.LEAST_VIEWED:
                return `Pick a random episode from the top ${cutoff[0]} least viewed episodes`
            case MODES.MOST_LIKED:
                return `Pick a random episode from the top ${cutoff[0]} most liked episodes`
            case MODES.LEAST_LIKED:
                return `Pick a random episode from the top ${cutoff[0]} least liked episodes`
            case MODES.MOST_COMMENTED:
                return `Pick a random episode from the top ${cutoff[0]} most commented episodes`
            case MODES.LEAST_COMMENTED:
                return `Pick a random episode from the top ${cutoff[0]} least commented episodes`
            default:
                return ""
        }
    }

    return (
        <div className="relative min-h-screen bg-sky-50 dark:bg-slate-950 overflow-hidden flex flex-col items-center justify-center p-4">
            {/* Playful Background Shapes */}
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-pink-300 rounded-full opacity-60"></div>
            <div className="absolute top-20 right-10 w-48 h-48 bg-yellow-300 rounded-[2rem] rotate-12 opacity-70"></div>
            <div className="absolute bottom-20 left-10 w-32 h-64 bg-emerald-300 rounded-full -rotate-12 opacity-60"></div>
            <div className="absolute bottom-10 right-20 w-0 h-0 border-l-[60px] border-l-transparent border-r-[60px] border-r-transparent border-b-[100px] border-b-orange-400 rotate-45 opacity-60"></div>
            <div className="absolute top-1/3 left-1/3 w-16 h-16 bg-purple-400 rounded-full opacity-70"></div>
            <div className="absolute top-2/3 right-1/4 w-20 h-20 bg-blue-400 rounded-2xl -rotate-12 opacity-70"></div>

            {/* Main Content Container */}
            <div className="relative z-10 bg-white/70 dark:bg-slate-900/80 backdrop-blur-md p-10 rounded-3xl shadow-2xl border-4 border-white dark:border-slate-800 text-center max-w-3xl w-full">

                <ModeToggle className="absolute top-4 left-4 rounded-md text-indigo-500 hover:bg-indigo-100 hover:text-indigo-700 bg-white/50 shadow-sm border border-indigo-100 dark:bg-slate-800/50 dark:border-slate-700 dark:hover:bg-slate-800 dark:text-indigo-400" />
                {/* Help Dialog */}
                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            variant="ghost"
                            className="absolute top-4 right-4 rounded-md px-4 py-2 text-indigo-500 hover:bg-indigo-100 hover:text-indigo-700 bg-white/50 shadow-sm border border-indigo-100 dark:bg-slate-800/50 dark:border-slate-700 dark:hover:bg-slate-800 dark:text-indigo-400"
                        >
                            <span className="font-bold text-md">Help</span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle className="text-xl text-indigo-500">How to use TMKOC Picker?</DialogTitle>
                            <DialogDescription className="text-gray-600 dark:text-gray-400 mt-2 space-y-3">
                                <p>Do you ever sit down to eat but can't decide which TMKOC episode to watch? Well, you've come to the right place!</p>
                                <p><strong>1. Random:</strong> Pick a truly random episode within the range you select using the slider.</p>
                                <p><strong>2. Metrics (Most Liked, etc.):</strong> Discover top episodes based on Youtube statistics! Use the <em>Cut Off</em> slider to narrow down the selection pool (e.g. searching only within the Top 50 most viewed).</p>
                                <p className="pt-2 italic text-sm"><strong>Hit 'Watch Episode' and enjoy!</strong></p>
                                <p className="pt-2 italic text-sm">Currently, this website tracks episode 1 to 4633 of TMKOC and more will be added soon.</p>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

                <h1 className="text-2xl font-bold drop-shadow-sm mb-4 tracking-wide text-gray-800 dark:text-gray-100">
                    Random Episode Picker <br /><span className="text-indigo-600 dark:text-indigo-400">Taarak Mehta Ka Ooltah Chashmah</span>
                </h1>

                <Tabs value={activeTab} onValueChange={(value) => {
                    setActiveTab(value as typeof MODES[keyof typeof MODES])
                }} className="w-full flex flex-col items-center">
                    <TabsList className="mb-8 flex flex-wrap !h-auto justify-center gap-3 bg-transparent">
                        {Object.values(MODES).map((mode) => (
                            <TabsTrigger
                                key={mode}
                                value={mode}
                                className="!h-auto px-6 py-3.5 rounded-md font-bold text-sm tracking-wide data-[state=active]:bg-indigo-600 data-[state=active]:text-white shadow-sm hover:bg-white/50 dark:hover:bg-slate-800 transition-all text-slate-600 dark:text-slate-300"
                            >
                                {mode.replace('_', ' ').toUpperCase()}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {Object.values(MODES).map((mode) => (
                        <TabsContent key={mode} value={mode} className="w-full">
                            <div className="bg-indigo-50/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border-2 border-indigo-100 dark:border-slate-700 min-h-[200px] flex flex-col items-center justify-center gap-8">
                                {/* Conditionally Render Episode Range Slider */}
                                {mode === MODES.RANDOM && (
                                    <div className="w-full max-w-md mx-auto space-y-4">
                                        <div className="flex justify-between items-center px-1">
                                            <div className="flex flex-col items-start bg-white dark:bg-slate-900 p-2 rounded-lg shadow-sm border border-indigo-100 dark:border-slate-700 min-w-[100px]">
                                                <span className="text-xs font-semibold text-indigo-400 dark:text-indigo-300 uppercase">From</span>
                                                <span className="font-bold text-indigo-700 dark:text-indigo-400">Ep. {episodeRange[0]}</span>
                                            </div>
                                            <div className="flex flex-col items-end bg-white dark:bg-slate-900 p-2 rounded-lg shadow-sm border border-indigo-100 dark:border-slate-700 min-w-[100px]">
                                                <span className="text-xs font-semibold text-indigo-400 dark:text-indigo-300 uppercase">Till</span>
                                                <span className="font-bold text-indigo-700 dark:text-indigo-400">Ep. {episodeRange[1]}</span>
                                            </div>
                                        </div>

                                        <Slider
                                            value={episodeRange}
                                            min={MIN_EPISODE}
                                            max={MAX_EPISODE}
                                            step={1}
                                            onValueChange={handleRangeChange}
                                            className="py-4 cursor-pointer"
                                        />

                                        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                                            {getModeText()}
                                        </p>
                                    </div>
                                )}

                                {/* Cut Off Slider */}
                                {mode !== MODES.RANDOM && <div className="w-full max-w-md mx-auto space-y-4">
                                    <div className="flex justify-start items-center px-1">
                                        <div className="flex flex-col items-start bg-white dark:bg-slate-900 p-2 rounded-lg shadow-sm border border-indigo-100 dark:border-slate-700 min-w-[100px]">
                                            <span className="text-xs font-semibold text-indigo-400 dark:text-indigo-300 uppercase">Cut Off</span>
                                            <span className="font-bold text-indigo-700 dark:text-indigo-400">{cutoff[0]}</span>
                                        </div>
                                    </div>

                                    <Slider
                                        value={cutoff}
                                        min={MIN_EPISODE}
                                        max={MAX_EPISODE}
                                        step={1}
                                        onValueChange={handleCutoffChange}
                                        className="py-4 cursor-pointer"
                                    />

                                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                                        {getModeText()}
                                    </p>
                                </div>}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>

                <div className="mt-10 flex justify-center">
                    <Button
                        size="lg"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-6 px-10 rounded-md text-xl shadow-lg transition-transform hover:scale-105 active:scale-95"
                        disabled={isLoading}
                        onClick={async () => {
                            try {
                                const data = await fetchEpisode({
                                    mode: activeTab,
                                    fromEp: episodeRange[0],
                                    tillEp: episodeRange[1],
                                    cutoff: cutoff[0],
                                    redirect: false
                                })
                                window.open(data.episode.url, '_blank')
                            } catch (e) {
                                console.error(e)
                            }
                        }}
                    >
                        {isLoading ? "Finding episode..." : "Watch Episode"}
                    </Button>
                </div>
            </div>
        </div >
    )
}