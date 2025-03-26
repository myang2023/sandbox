'use client'

import { useRouter } from 'next/navigation';
import { useAppContext } from "@/components/ContextProvider";

export default function ChapterCard({ chapter }) {
    const { theme } = useAppContext();

    const router = useRouter();
    const goToChapter = (e) => {
        e.stopPropagation();
        let id = chapter.bookId;
        let ch = chapter.chapterId;
        router.push(`/book/${id}/chapter?sec=${chapter.secId}&ch=${ch}`)
    }

    return <div className={`grid grid-cols-6 ${theme === 'night' ? 'bg-medium' : 'bg-light'} text-defaultBlack rounded-md hover:cursor-pointer transition-transform duration-200   hover:translate-x-1 overflow-hidden`}
        onClick={(e) => goToChapter(e)}
    >
        <div className={`flex items-center justify-center bg-medium font-bold opacity-85`}>{chapter.seq + 1}</div>
        <div className={`col-span-5 px-2 ${theme === 'night' ? 'bg-slate-600 text-defaultWhite' : 'bg-light'} min-h-12 flex flex-col justify-center`}>
            <p>{chapter.heading}</p>
            {
                chapter.sidenote && <p className={`text-sm  opacity-60`}>{chapter.sidenote}</p>
            }

        </div>

    </div>
}