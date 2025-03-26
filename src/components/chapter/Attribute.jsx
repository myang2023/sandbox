'use client'

import { useAppContext } from "@/components/ContextProvider";
import { Date, Chapter } from '../svg/GeneralIcons';


export default function Attribute({ chapterAttribute }) {
    const { theme } = useAppContext();

    return <div className={`flex flex-col items-center w-full`}>
        <div className={`flex flex-col items-center relative py-1 w-full`}
        >
            <div className={`rounded-md p-2 ${theme !== 'plant' && theme !== 'beach' ? 'bg-slate-400/30' : ''} ${theme == 'plant' ? 'bg-green-400/20' : ''} ${theme == 'beach' ? 'bg-sky-400/20' : ''} w-full h-full absolute top-0 left-0`} ></div>
            <div>
                <p className={`text-center`}>[{chapterAttribute.secName}] - 第<span className='px-1'>{chapterAttribute.seq + 1}</span>章</p>
            </div>
            <div className={`px-2  text-center pb-1`}>
                <p className='font-bold text-xl'>{chapterAttribute.heading}</p>
                {
                    chapterAttribute.sidenote && <p className={`text-sm `}> {chapterAttribute.sidenote}</p>
                }
            </div>
        </div>
        <div className='flex gap-2 sm:gap-5 text-sm opacity-85'>
            <div className={`flex items-center`}>
                <div className='size-5 sm:size-6 p-1'>
                    <Chapter customStyle={`${theme === 'night' ? 'fill-light' : ''} `} />
                </div>
                <p className="">{chapterAttribute.wordCount} 字  </p>
            </div>
            <div className={`flex items-center`}>
                <div className='size-5 sm:size-6 p-1'>
                    <Date customStyle={`${theme === 'night' ? 'fill-light' : ''} `} />
                </div>
                <p className="">{chapterAttribute.postDate}</p>
            </div>
        </div>
    </div>

}