'use client'

import { useAppContext } from "@/components/ContextProvider";

export default function Content({ content }) {
    const { theme, user } = useAppContext();


    return <div className={`  p-2 flex flex-col items-center select-none`} >
        {
            content && content.length > 0 && <ul >
                {
                    content.map((sentence, i) => {
                        if (sentence === '') {
                            return <li className='min-h-4' key={i}></li>
                        }
                        return <li key={i}
                            className={`${user.size} ${user.gap} ${user.line} ${theme === 'night' ? 'text-medium' : 'text-defaultBlack'} break-words`}
                        >{sentence}
                        </li>
                    })
                }
            </ul>
        }


    </div>

}