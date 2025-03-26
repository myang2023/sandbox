'use client'
import { useEffect, useState } from 'react';
import { useAppContext } from "@/components/ContextProvider";
import AllMainSubContainer from './AllMainSubContainer';
import { processMidComment } from '@/utlis/commentSortMethod';
import DownloadComment from './DownloadComment';

export default function AllComment() {
    const { theme, comment } = useAppContext();
    const [allComment, setAllComment] = useState([]);


    useEffect(() => {
        let processComment = comment.map(x => { return x });
        processComment = processMidComment(processComment, true);
        setAllComment(processComment);

    }, [comment])

    return <div className={` ${theme === 'night' ? 'border-medium' : 'border-base'} border-2 rounded-md p-2`}>
        <h3 className="text-center font-bold ">书籍评论</h3>
        <DownloadComment data={comment} />
        <div className="">
            {
                allComment.length > 0 ? <AllMainSubContainer midComment={allComment} />
                    : <p>目前没有评论。</p>
            }
        </div>

    </div>

}


