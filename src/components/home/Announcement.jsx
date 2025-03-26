'use client'
import { useAppContext } from "@/components/ContextProvider";
import { Speaker } from "../svg/GeneralIcons";

export default function Announcement() {
    const { author, theme } = useAppContext();

    const announcement = author.announcement;
    if (announcement === undefined || announcement.length === 0) {
        return;
    }
    let date = '';
    if (author.updateDate !== '') {
        date = author.updateDate;
    }

    return <div id='announcement'
        className={` ${theme === 'night' ? 'border-medium' : 'border-base'}  border-2 rounded-md p-2`}>
        <h2 className="flex gap-2 justify-center font-bold">
            公告
            <div className="w-6">
                <Speaker customStyle={`${theme === 'night' ? 'fill-medium' : 'fill-defaultBlack'}`} />
            </div>
        </h2>
        <div>
            {
                announcement.map((item, i) => {
                    return <p key={i}>{item}</p>
                })
            }
        </div>
        {date !== '' && <p className="text-sm text-right">编辑日期: {date}</p>}
    </div>
}