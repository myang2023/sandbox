
'use client'
import { useAppContext } from "@/components/ContextProvider";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'
import { getBookAndTopChapter, getChapterAndComment } from "@/utlis/appClientAPI ";
import FailedMessage from "../FailedMessage";
import { processTopChapterData, sortBookChapter, getEachChapterRelatedCommentQty } from "@/utlis/processRawData";
import InitializeWait from "../InitializeWait";


export default function EnterButton({ authorData }) {
    const [warning, setWarning] = useState("");
    const [hasContent, setHasContent] = useState(true);
    const {
        book, setBook,
        setAuthor,
        chapter, setChapter,
        setComment,
        setTopFive,
        user
    } = useAppContext();
    const router = useRouter();

    const fetchData = async () => {

        let { bookData, topFiveData } = await getBookAndTopChapter();
        if (bookData.length > 0) {
            const bookIds = bookData.map(b => b.id);
            let { chapterData, commentData } = await getChapterAndComment(bookIds);
            if (chapterData.length > 0) {

                if (commentData.length > 0) {
                    let processComment = commentData.map(c => {
                        if (c.chapterId !== -1) {
                            let targetCh = chapterData.find(x => x.chapterId === c.chapterId) ?? -1;
                            if (targetCh !== -1) {
                                c.chapterHeading = targetCh.heading;
                            }
                        }
                        return c;
                    });
                    setComment(processComment);
                }
                chapterData = getEachChapterRelatedCommentQty(chapterData, commentData);
                bookData = sortBookChapter(bookData, chapterData);

                setBook(bookData);
                setChapter(chapterData);

                if (topFiveData !== undefined && topFiveData.length > 0) {
                    const topCh = processTopChapterData({ data: chapterData, top5Id: topFiveData });
                    setTopFive(topCh);
                }

            } else {
                setHasContent(false);
            }
        } else {
            setHasContent(false);
        }
    }

    useEffect(() => {
        if (authorData) {
            setAuthor(authorData);
            fetchData();
        }
    }, []);


    const checkValidUser = () => {
        if (user.avatarId === -1 || user.name.trim() === "" || user.eligible === false) {
            setWarning("请先选择头像，输入昵称，并确认你是合乎当地法定法规的成年人");
        }
        if (user.avatarId !== -1 && user.name.trim() !== "" && user.eligible === true) {
            setWarning("");
            router.push('/home')
        }
    };

    if (authorData && !hasContent) {

        return <FailedMessage message={'作者未发布任何书籍或章节'} />
    }

    return book && chapter && hasContent ? <div className="flex flex-col justify-center items-center">
        <div className="min-h-6 mb-1">
            {warning && <p className="text-red-600 text-xs">{warning}</p>}
        </div>
        <button className="bg-green-700 hover:bg-green-800 text-white rounded border px-3 py-1 w-fit" onClick={checkValidUser}  >
            前往书籍页面
        </button>
    </div> : <InitializeWait message={'加载书籍中…'} />
}