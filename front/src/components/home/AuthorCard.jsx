'use client'
import { useAppContext } from "@/components/ContextProvider";
import { LetterA } from "../svg/GeneralIcons";

export default function AuthorCard() {
    const { author, theme } = useAppContext();

    const penname = author?.name;
    if (penname === "") {
        return;
    }
    const bio = author?.bio;

    return <div id='bio'
        className={`${theme === 'night' ? 'border-medium' : 'border-base'}  border-2 rounded-md p-2`}>
        <div className="flex flex-col items-center gap-1">
            <div className={`relative w-10 h-10 ${theme !== 'night' ? 'bg-light' : 'bg-medium'} rounded-full p-2 overflow-hidden border-2 border-medium`}>
                <LetterA />
                <div className={`${theme === 'night' ? 'bg-light' : 'bg-base'} opacity-35 absolute h-1/2  -rotate-45  bottom-0 w-12`}></div>
            </div>

            <p className="font-bold">
                {penname}
            </p>
        </div>

        {
            bio.length > 0 && <div className="mt-2">
                {
                    bio.map((item, i) => {
                        return <p key={i}>{item}</p>
                    })
                }
            </div>
        }
    </div>
}