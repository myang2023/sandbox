'use client'
import { useAppContext } from "@/components/ContextProvider";
import { useRouter } from 'next/navigation'

export default function TopFivePanel() {
    const { topFive, theme } = useAppContext();

    const top5List = topFive;

    if (top5List.length === 0) {
        return;
    }
    const router = useRouter();
    const goToChapter = (e, chapter) => {
        e.stopPropagation();
        let id = chapter.bookId;
        let ch = chapter.chapterId;
        router.push(`/book/${id}/chapter?sec=${chapter.secId}&ch=${ch}`)
    }

    return <div id='topCh'
        className={` ${theme === 'night' ? 'border-medium' : 'border-base'} border-2 rounded-md p-2`}>
        <h3 className="text-center font-bold">最新前五章节</h3>
        <p className="text-sm">此板块由作者管理，仅代表作者想展示给读者的最新章节，不一定涵括所有书籍的更新动态</p>
        <ul className={`flex flex-col gap-3 mt-2 `}>

            {
                top5List.map((ch, i) => {
                    return <li key={i} className={`  transition-transform duration-200   hover:translate-x-1 hover:cursor-pointer p-1 border-opacity-40 relative `}
                        onClick={(e) => goToChapter(e, ch)}
                    >
                        <div className={`${theme === 'night' ? 'opacity-30' : ' opacity-20'} bg-medium h-full w-full absolute top-0 left-0 rounded-md`}></div>
                        <p className="">《{ch.bookTitle}》- {`[${ch.secName}] -`}【{ch.heading}】</p>
                        <p className="ml-3 text-sm">字数: {ch.wordCount}  <span className="px-2"></span>  日期: {ch.postDate}</p>
                    </li>
                })
            }
        </ul>

    </div>
}