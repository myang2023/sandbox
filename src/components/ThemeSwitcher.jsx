'use client'
import { useAppContext } from "@/components/ContextProvider";
import { Light, Night, Plant, Beach, Theme } from "./svg/GeneralIcons";

const themeList = ['default', 'plant', 'beach', 'night']

export default function ThemeSwitcher() {
    const { theme, setTheme } = useAppContext();



    return <div className="relative group">
        <button className={` size-6 md:size-8 xl:size-10 flex items-center justify-center `}>
            <Theme customStyle={`fill-medium`} />
        </button>
        <div
            className="flex flex-col justify-between rounded-md px-2
        bg-slate-600/80  absolute top-6 -left-2 h-0 group-hover:h-36
                    group-focus:h-36   overflow-hidden md:group-hover:h-44
                    md:group-focus:h-44 md:top-8 xl:group-hover:h-56
                    xl:group-focus:h-56 xl:top-10
                     transform ease-in-out transition-all duration-300 w-fit"

        >
            <button className={`${theme === 'default' ? 'bg-light' : 'bg-slate-400'} size-6 md:size-8 xl:size-10 p-1 rounded-lg mt-2`}
                onClick={() => setTheme(themeList[0])}
            >
                <Light />
            </button>
            <button className={`${theme === 'plant' ? 'bg-medium' : 'bg-slate-400'} size-6 md:size-8 xl:size-10 p-1 rounded-lg`}
                onClick={() => setTheme(themeList[1])}
            >
                <Plant />
            </button>
            <button className={`${theme === 'beach' ? 'bg-medium' : 'bg-slate-400'} size-6 md:size-8 xl:size-10 p-1 rounded-lg`}
                onClick={() => setTheme(themeList[2])}
            >
                <Beach />
            </button>
            <button className={`${theme === 'night' ? 'bg-base' : 'bg-slate-400'} size-6 md:size-8 xl:size-10 p-1 rounded-lg mb-2`}
                onClick={() => setTheme(themeList[3])}
            >
                <Night customStyle={`${theme === 'night' ? 'fill-medium' : ''}`} />
            </button>
        </div>
    </div>



}