'use client'
import { useRouter } from 'next/navigation'
import { useAppContext } from "@/components/ContextProvider";
import { AvatarList } from "../AvatarList";
import { LetterA } from "../svg/GeneralIcons";


export default function MainCommentLink({ comment }) {
    const { theme } = useAppContext();
    let bookInfo = {
        title: comment.bookTitle,
        id: comment.bookId
    };
    let secInfo = {
        name: comment.secName,
        id: comment.secId
    };
    let chInfo;

    if (comment.chapterHeading !== '') {
        chInfo = {
            heading: comment.chapterHeading,
            id: comment.chapterId
        };
    }

    const router = useRouter();
    const goToChapter = (e) => {
        router.push(`/book/${bookInfo.id}/chapter?sec=${secInfo.id}&ch=${chInfo.id}`)
    }

    const goToBook = () => {

        let sec = 1;
        if (secInfo) {
            sec = secInfo.id;
        }
        let id = bookInfo.id;
        router.push(`/book/${id}?sec=${sec}`)
    }


    return <div >
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
        <div className={`${theme === 'night' ? 'bg-medium' : 'bg-light'} py-1 px-2 rounded-md flex gap-1 flex-wrap text-defaultBlack my-1 w-fit text-sm`}>
            <p>于</p>
            <p className="hover:underline hover:cursor-pointer" onClick={goToBook}>《{bookInfo.title}》</p>
            {
                secInfo && <p className="hover:underline hover:cursor-pointer" onClick={goToBook}>- [{secInfo.name}] </p>
            }
            {
                chInfo && <p className="hover:underline hover:cursor-pointer" onClick={goToChapter}>-【{chInfo.heading}】 </p>
            }
            <p className="ml-1"> 评论:</p>

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