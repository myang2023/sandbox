'use client'

import { useAppContext } from "@/components/ContextProvider";
import { LetterA } from '../svg/GeneralIcons';


export default function AuthorNote({ note }) {
    const { theme } = useAppContext();

    if (note.length === 0) {
        return;
    }

    const style = `${theme === 'night' ? 'border-medium' : 'border-base'}  border-2 rounded-md  p-2 flex flex-col items-center`

    return <div className={`flex flex-col relative p-2 w-full my-2`}
    >
        <div className={`rounded-md p-2 ${theme !== 'plant' && theme !== 'beach' ? 'bg-slate-400/30' : ''} ${theme == 'plant' ? 'bg-green-400/20' : ''} ${theme == 'beach' ? 'bg-sky-400/20' : ''} w-full h-full absolute top-0 left-0`} ></div>
        <div className='flex flex-col items-center'>
            <div className='flex gap-2'>
                <div className={`relative size-6 ${theme !== 'night' ? 'bg-light' : 'bg-medium'} rounded-full p-1 overflow-hidden border-2 border-medium`}>
                    <LetterA />
                    <div className={`${theme === 'night' ? 'bg-light' : 'bg-base'} opacity-35 absolute h-1/2  -rotate-45  bottom-0 w-8`}></div>
                </div>
                <span>说：</span>
            </div>

            {
                note.length > 0 && <ul className='w-full '>
                    {
                        note.map((sentence, i) => {

                            return <li key={i}>{sentence}</li>
                        })
                    }
                </ul>
            }


        </div>
    </div>

}