'use client'
import { useAppContext } from "@/components/ContextProvider";
import { LetterA } from "./svg/GeneralIcons"
import ThemeSwitcher from "./ThemeSwitcher";
import LangSwitcher from "./LangSwitcher";
import Link from "next/link";


export default function TopNav() {
    const { theme } = useAppContext();

    return <nav className={`${theme === 'night' ? 'bg-base' : 'bg-light'}  flex theme-${theme} justify-between p-2 drop-shadow-lg fixed top-0 w-full z-10 opacity-90`} >
        <Link className={`${theme === 'night' ? 'bg-medium border-light' : 'border-medium'} ${theme === 'default' ? 'border-base bg-medium' : ''}  size-6 md:size-8  xl:size-10 p-1 flex  justify-center items-center rounded-full border-2 `} href={'/home'}>
            <LetterA customStyle={'fill-defaultBlack'} />

        </Link>
        <div className="flex gap-5 items-center">
            <ThemeSwitcher />
            <LangSwitcher />
        </div>

    </nav>
}