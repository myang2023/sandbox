'use client'

import { useRouter } from 'next/navigation';
import { Chapter } from '../svg/GeneralIcons';
import { useAppContext } from "@/components/ContextProvider";

export default function BookCard({ book }) {
    const { theme } = useAppContext();
    const router = useRouter();
    const status = book.status;
    let newCh
    if (book.newestChId !== -1 && book.newestChHeading !== '') {
        newCh = {
            heading: book.newestChHeading,
            newChId: book.newestChId,
            newChSecId: book.newestChSecId
        }
    }
    const goToChapter = (e) => {
        e.stopPropagation();
        let id = book.id;
        router.push(`/book/${id}/chapter?sec=${newCh.newChSecId}&ch=${newCh.newChId}`)

    }

    const goToBook = () => {
        let id = book.id;
        router.push(`/book/${id}`)
    }

    return <div className="" onClick={(e) => goToBook(e)}>
        <div className='flex gap-2 items-center'>
            <p className="font-bold">{book.title}</p>
            <p className={`relative px-1 font-normal ${status ? 'border-2 border-base rounded-md' : ''}  text-sm  `}>
                {status ? '完结' : '连载中'}
                <span className={`absolute w-full h-full  ${status ? 'bg-base opacity-10' : ''}  top-0 left-0`}></span>
            </p>
            <p className={`text-sm relative px-1 rounded-md border-2 ${theme === 'night' ? 'border-slate-500' : 'border-medium'} `}>
                {book.totalWordCount}
                <span className={`absolute w-full h-full  bg-base opacity-10 top-0 left-0`}></span>
            </p>
        </div>

        <p>{book.category} / {book.meat ? <span className='font-bold'>有肉</span> : '清水'} / {book.era} / {book.tags.join(' / ')}</p>
        <p className="text-sm py-2">{book.intro[0]}</p>

        {
            newCh && <div onClick={(e) => goToChapter(e)} className='flex w-fit'>
                <div className='size-6 p-1'>
                    <Chapter />
                </div>
                <p className="hover:underline hover:cursor-pointer w-fit" >最新章节: {newCh.heading}</p>
            </div>
        }
    </div>

}