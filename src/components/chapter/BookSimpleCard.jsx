'use client'

import { useAppContext } from "@/components/ContextProvider";



export default function BookSimpleCard({ bookBasic }) {
    const { theme } = useAppContext();
    const status = bookBasic.status;

    return <div className={``}>
        <h2 className='hidden'>Book Information</h2>
        <div className='flex gap-2 items-center mb-1 justify-center flex-wrap'>
            <p className="font-bold text-lg">《{bookBasic.title}》</p>
            <p className={`relative px-1 ${status ? 'border-2  rounded-md' : ''}  ${theme !== 'night' ? 'text-defaultBlack border-base' : 'text-defaultWhite border-medium'}  `}>
                {status ? '完结' : '连载中'}
                {
                    status && <span className={`absolute w-full h-full  ${theme !== 'night' ? 'bg-base opacity-10' : 'bg-medium opacity-20'} top-0 left-0  `}></span>
                }

            </p>
        </div>

        <p className=''>{bookBasic.original ? '原创' : '同人'} / {bookBasic.category} / {bookBasic.meat ? '有肉' : '清水'} / {bookBasic.era} / {bookBasic.tags.join(' / ')}</p>

    </div>

}