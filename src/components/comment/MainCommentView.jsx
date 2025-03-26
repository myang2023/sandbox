'use client'
import { useAppContext } from "@/components/ContextProvider";
import { AvatarList } from "../AvatarList";
import { LetterA } from "../svg/GeneralIcons";


export default function MainCommentView({ comment }) {
    const { theme } = useAppContext();


    return <div className={`max-h-24  border-2  overflow-y-hidden w-full relative rounded-md p-2 ${theme === 'night' ? 'border-medium' : 'border-base'}`}>
        <div className={`bg-gradient-to-b from-white/20 from-10%  to-90% absolute top-0 left-0 h-full w-full ${theme === 'night' ? 'to-base' : 'to-slate-100'}`}>
        </div>
        <div className="flex gap-2 flex-wrap items-center w-full">
            {
                comment.author ? <div className={`relative size-8 ${theme !== 'night' ? '' : 'bg-medium'} rounded-full p-1 overflow-hidden border-2 border-medium`}>
                    <LetterA />
                    <div className={`${theme === 'night' ? 'bg-light' : 'bg-base'} opacity-35 absolute h-1/2  -rotate-45  bottom-0 w-11`}></div>
                </div> : <div className={`size-8 p-1 rounded-lg border-2  ${theme === 'night' ? 'border-medium' : 'border-base'}`}>
                    <AvatarList id={comment.profileId} customStyle={`${theme === 'night' ? 'fill-light' : ''}`} />
                </div>
            }
            <div className="">
                {comment.author && <p className={`${theme === 'night' ? 'bg-medium' : 'bg-light drop-shadow-md'} font-bold px-2 text-sm text-defaultBlack rounded-sm w-fit`}>author</p>}
                {
                    !comment.author && <p className="font-bold text-sm">{comment.username}</p>

                }
            </div>
        </div>
        <div className="text-sm">
            {
                comment.content.map((sentence, index) => {
                    return <p key={index}>{sentence}</p>
                })
            }
        </div>
    </div>

}