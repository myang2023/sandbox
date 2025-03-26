'use client'
import { useAppContext } from "@/components/ContextProvider";
import { AvatarList } from "../AvatarList";
import { LetterA } from "../svg/GeneralIcons";



export default function SubComment({ comment }) {
    const { theme } = useAppContext();


    return <div className={` p-2 border-2 border-medium rounded-md`}>
        <div className="flex gap-2 flex-wrap">
            {
                comment.author ? <div className={`relative size-10 ${theme !== 'night' ? 'bg-light' : 'bg-medium'} rounded-full p-2 overflow-hidden border-2 border-medium`}>
                    <LetterA />
                    <div className={`${theme === 'night' ? 'bg-light' : 'bg-base'} opacity-35 absolute h-1/2  -rotate-45  bottom-0 w-12`}></div>
                </div> : <div className={`size-10 p-1 rounded-lg border-2  ${theme === 'night' ? 'border-medium' : 'border-base'}`}>
                    <AvatarList id={comment.profileId} customStyle={`${theme === 'night' ? 'fill-light' : ''}`} />
                </div>
            }
            <div className="">
                {comment.author && <p className={`${theme === 'night' ? 'bg-medium' : 'bg-light drop-shadow-md'} font-bold px-2 text-sm text-defaultBlack rounded-sm w-fit`}>author</p>}
                {
                    !comment.author && <p className="font-bold">{comment.username}</p>

                }
                <p className="text-xs">{comment.postDate}</p>
            </div>
        </div>
        <div>
            {
                comment.content.map((sentence, index) => {
                    return <p key={index}>{sentence}</p>
                })
            }
        </div>

    </div>

}