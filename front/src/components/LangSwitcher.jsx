'use client'
import { useAppContext } from "@/components/ContextProvider";
import { useState } from "react";
import { Sim, Trad } from '@/components/svg/GeneralIcons';

const textVersions = ['cn', 'tw']

export default function LangSwitcher() {
    const [langVersion, setLangVersion] = useState(textVersions[0]);
    const { switchLangVersion, theme } = useAppContext();

    const ConvertLanguage = async (toVersion) => {
        let currentVersion = langVersion;

        if (currentVersion === toVersion) {
            return;
        }
        await switchLangVersion(currentVersion, toVersion)
        setLangVersion(toVersion);
    };



    return <div className="flex gap-3 items-center">
        <button className={`size-6 md:size-8  xl:size-10  flex items-center p-1 justify-center rounded-lg  ${langVersion === 'cn' ? 'bg-medium' : ''} ${langVersion !== 'cn' && theme === 'night' ? 'bg-slate-700' : ''}  `}
            onClick={() => ConvertLanguage(textVersions[0])}
        >
            <Sim customStyle={` fill-defaultBlack `} />
        </button>
        <button className={`size-6 md:size-8  xl:size-10  flex items-center p-1 justify-center rounded-lg  ${langVersion === 'tw' ? 'bg-medium' : ''} ${langVersion !== 'tw' && theme === 'night' ? 'bg-slate-700' : ''}  `}
            onClick={() => ConvertLanguage(textVersions[1])}
        >
            <Trad customStyle={`fill-defaultBlack`} />
        </button>
    </div>


}