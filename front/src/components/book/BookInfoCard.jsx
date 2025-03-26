'use client'

import { useRouter } from 'next/navigation';
import { useAppContext } from "@/components/ContextProvider";


export default function BookInfoCard({ book }) {
    const { theme } = useAppContext();
    const router = useRouter();
    const status = book.status;
    let newCh
    if (book.newestChId !== -1) {
        let targetSec = book.sections.find(x => x.id === book.newestChSecId) ?? -1;
        if (targetSec !== -1) {
            newCh = {
                heading: book.newestChHeading,
                newChId: book.newestChId,
                secName: targetSec.name,
                secId: targetSec.id
            }
        }
    }


    const goToChapter = () => {
        let id = newCh.newChId;
        router.push(`/book/${book.id}/chapter?sec=${newCh.secId}&ch=${newCh.newChId}`)
    }

    return <div className={`${theme === 'night' ? 'border-medium' : 'border-base'}  border-2 rounded-md  p-2`} >
        <h2 className='hidden'>Book Information</h2>
        <div className='flex gap-2 items-center mb-1'>
            <p className="font-bold text-lg">《{book.title}》</p>
            <p className={`relative px-1 font-normal ${status ? 'border-2  rounded-md' : ''}  ${theme !== 'night' ? 'text-defaultBlack border-base' : 'text-defaultWhite border-medium'}  `}>
                {status ? '完结' : '连载中'}
                {
                    status && <span className={`absolute w-full h-full  ${theme !== 'night' ? 'bg-base opacity-10' : 'bg-medium opacity-20'} top-0 left-0  `}></span>
                }

            </p>
            <p className={` relative px-1 rounded-md border-2 ${theme === 'night' ? 'border-slate-500' : 'border-medium'} `}>
                {book.totalWordCount}
                <span className={`absolute w-full h-full  ${theme !== 'night' ? 'bg-base opacity-10' : 'bg-medium opacity-20'} top-0 left-0`}></span>
            </p>
        </div>

        <p className=''>{book.original ? '原创' : '同人'} / {book.category} / {book.meat ? '有肉' : '清水'} / {book.era} / {book.tags.join(' / ')}</p>
        <div className='py-2'>
            <p className=''>作品简介:</p>
            <ul className={`relative py-1 px-2 `} >
                <li className={`absolute w-full h-full  ${theme !== 'night' ? 'bg-base opacity-10' : 'bg-medium opacity-20'} top-0 left-0 rounded-md  `}></li>
                {
                    book.intro.map((item, i) => {
                        return <li key={i}>{item}</li>
                    })
                }
            </ul>
        </div>

        {
            newCh && <p onClick={goToChapter} className="hover:underline hover:cursor-pointer w-fit" >{`最新章节: [${newCh.secName}] -【${newCh.heading}】`}</p>
        }

    </div>

}