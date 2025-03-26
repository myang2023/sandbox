
'use client'

import { useEffect, useState } from 'react';
import { useAppContext } from "@/components/ContextProvider";
import MainCommentView from './MainCommentView';
import { AvatarList } from '../AvatarList';
import { getComment } from '@/utlis/appClientAPI ';
import FailedMessage from '../FailedMessage';
import InitializeWait from '../InitializeWait';


const wordCountLimit = '评论字数不得少于或大于规定范围';
const postSuccessed = '感谢你的评论！';
const postFailedReason = '本书或被设置为禁止回复，或已达到评论数目上限，或服务器故障。';
const sendingMessage = '评论发布中…';
const sendFailed = '评论发布失败';
const sendSuccessed = '发布成功';
export default function Post({ targetBook, targetChapter, targetMain, toggleReply }) {
    const { theme, author, book, chapter, user, setComment, togglePost } = useAppContext();
    const [bookSec, setBookSec] = useState(1);
    const [content, setContent] = useState('');
    const [charCount, setCharCount] = useState(0);
    const [isAuthor, setAuthor] = useState(false);
    const [feedback, setFeedback] = useState({
        text: '',
        status: false
    });
    const [inSend, setInSend] = useState(false);

    const bookIds = book.map(x => x.id);

    useEffect(() => {
        fetch('/api/hello');
    }, [])

    const closeCommentModal = () => {
        setFeedback({
            text: '',
            status: false
        });
        togglePost(false);
        if (toggleReply !== -1) {
            toggleReply(false);
        }

    }

    const handleSwitchSection = (selectedSecId) => {
        setFeedback({
            text: '',
            status: false
        });
        if (selectedSecId === bookSec) {
            return;
        }
        setBookSec(selectedSecId);
    }

    const handleInputComment = (input) => {
        setFeedback({
            text: '',
            status: false
        });
        const inputText = input;
        const sentences = inputText.split(/\r?\n/).filter(line => line.trim() !== "");
        setContent(sentences);
        const count = countChar(input);
        setCharCount(count);
    }

    const countChar = (text) => {
        const charCount = text.replace(/\s+/g, "").length;
        return charCount;
    }

    const processCommentData = () => {

        let commentObj = {
            chapterId: -1,
            mainCommentId: -1,
            content: content,
            profileId: user.avatarId,
            username: user.name,
            author: isAuthor
        };
        if (targetBook !== -1) {
            commentObj.bookId = targetBook.id;
            commentObj.secId = bookSec;
        }

        if (targetChapter !== -1) {
            commentObj.bookId = targetChapter.bookId;
            commentObj.secId = targetChapter.secId;
            commentObj.chapterId = targetChapter.chapterId;
        }

        if (targetMain !== -1) {
            commentObj.bookId = targetMain.bookId;
            commentObj.secId = targetMain.secId;
            if (targetMain.chapterId !== -1) {
                commentObj.chapterId = targetMain.chapterId;
            }
            commentObj.mainCommentId = targetMain.commentId;
        }
        return commentObj;

    }



    const postComment = async (e) => {
        e.preventDefault();
        if (content === '' || content.length === 0 || content.join('').length < 2 || content.join('').length > author.commentWordCount) {
            setFeedback(
                {
                    text: wordCountLimit,
                    status: false,
                }
            );
            return;
        }

        setInSend(true);
        const processCommentObj = processCommentData();
        const response = await fetch("/api/comment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(processCommentObj),
        });

        if (response.ok) {
            //fetch fresh comments
            const newComment = await getComment(bookIds);
            if (newComment.length > 0) {
                setInSend(false);

                setFeedback({
                    text: postSuccessed,
                    status: true
                });

                let processComment = newComment.map(c => {
                    if (c.chapterId !== -1) {
                        let targetCh = chapter.find(x => x.chapterId === c.chapterId) ?? -1;
                        if (targetCh !== -1) {
                            c.chapterHeading = targetCh.heading;
                        }
                    }
                    return c;
                });

                setTimeout(() => {
                    setComment(processComment);

                    closeCommentModal();
                }, 1600);
            }
        } else {
            setInSend(false);
            setFeedback({
                text: postFailedReason,
                status: false
            });
        }
    }

    return <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30 "
    >
        <div className={` ${theme === 'night' ? 'bg-base border border-light' : 'bg-defaultWhite'} p-5 flex flex-col items-center relative w-screen sm:w-2/3`}>
            <button className={`font-black absolute right-2 top-1 select-none ${theme === 'night' ? 'text-defaultWhite' : 'text-defaultBlack'} hover:text-lg opacity-80 hover:opacity-95`} onClick={() => closeCommentModal()}> X</button>
            {
                targetBook !== -1 && <div className='text-center '>
                    <h3 className={`font-bold text-lg mb-2`}>发 表 评 论 于:</h3>
                    <p className='text-lg'>《{targetBook?.title}》</p>
                    <ul className='flex gap-1 flex-wrap my-2'>
                        {
                            targetBook && targetBook.sections && targetBook?.sections?.length > 0 && targetBook.sections.map((sec, i) => {

                                return <li key={i} onClick={() => handleSwitchSection(sec.id)}
                                    className={`hover:cursor-pointer rounded-md  px-3 py-1 ${bookSec === sec.id ? 'underline underline-offset-2 font-bold' : 'opacity-65 '} relative overflow-hidden`}
                                >
                                    {
                                        bookSec === sec.id && <div className={`absolute ${theme === 'night' ? 'bg-medium' : 'bg-base'}  opacity-20 w-full h-full top-0 left-0`}></div>
                                    }
                                    {
                                        bookSec !== sec.id && <div className={`absolute ${theme === 'night' ? 'bg-medium' : 'bg-base'}  opacity-15 w-full h-full top-0 left-0`}></div>
                                    }
                                    {sec.name}
                                </li>
                            })
                        }
                    </ul>
                </div>
            }
            {
                targetChapter !== -1 && <div className='flex flex-col items-center'>
                    <h3 className={`text-center font-bold text-lg mb-2`}>发 表 评 论 于 章 节:</h3>
                    <p className='text-sm'>《{targetChapter.bookTitle}》- [{targetChapter.secName}]</p>
                    <p className='text-lg'>【{targetChapter.heading}】</p>
                </div>
            }
            {
                targetMain !== -1 && <div className='w-full'>
                    <h3 className={`text-center font-bold text-lg mb-2`}>回 复 评 论: </h3>
                    <MainCommentView comment={targetMain} />

                </div>
            }

            <div className={`p-1 w-full mt-2`}>
                <div className={`flex gap-3 mb-2 items-center`}>
                    <div className={`w-8 p-1 rounded-lg border-2  ${theme === 'night' ? 'border-medium' : 'border-base'}`}>
                        <AvatarList id={user.avatarId} customStyle={`${theme === 'night' ? 'fill-light' : ''}`} />
                    </div>
                    <p className='font-bold'>{user.name}</p>
                </div>

                <form id='commentContext' className='flex flex-col gap-3 items-center'>
                    <div className='w-full'>
                        <textarea
                            autoCorrect='off'
                            placeholder={`留下你的评论吧 :D`}
                            minLength={2}

                            maxLength={author.commentWordCount}
                            className={`p-1  ${theme === 'night' ? 'bg-medium placeholder-slate-500' : 'bg-defaultWhite hover:bg-light focus-within:bg-light'}  text-defaultBlack  w-full border-2  outline-none min-h-36`}
                            required
                            onChange={(e) => handleInputComment(e.target.value)}
                        />
                        <p className='text-sm -mt-1'>现字数：{charCount}<span className='px-1'></span>  (字数限制：2 ≤ 字数 ≤ {author.commentWordCount})</p>
                        {feedback.text === wordCountLimit && feedback.status === false && <p className='text-sm text-red-700'>*{feedback.text}</p>}
                        {feedback.text === postSuccessed && feedback.status === true && <p
                            className={`mt-1 text-sm text-green-700 text-center ${theme === 'night' ? 'text-green-400' : ''}`}
                        >{feedback.text}</p>}
                        {feedback.text === postFailedReason && feedback.status === false && <p className={`text-sm text-red-700 text-center ${theme === 'night' ? 'text-red-400' : ''}`}>*{feedback.text}</p>}
                    </div>
                    {
                        inSend === true && <InitializeWait message={sendingMessage} />
                    }
                    {
                        inSend === false && feedback.status === true && feedback.text === postSuccessed && <div className="flex flex-col justify-center items-center">
                            <p className={`bg-green-700 hover:bg-green-800 text-white rounded border px-3 py-1 w-fit`} >
                                {sendSuccessed}
                            </p>
                        </div>
                    }
                    {
                        inSend === false && feedback.status === false && feedback.text === postFailedReason && <FailedMessage message={sendFailed} />
                    }
                    <div className='flex gap-5 w-full justify-center'>
                        {
                            (inSend === false) && <button className={`py-1 px-2 bg-defaultBlack border-2 border-defaultBlack text-defaultWhite ${theme === 'night' ? 'hover:border-defaultWhite' : ''} rounded-md `}
                                onClick={closeCommentModal}
                            >返 回</button>
                        }
                        {
                            (feedback.text === postFailedReason || feedback.text === postSuccessed || inSend === true) ? '' : <button className={`py-1 px-2 bg-medium border-2 border-medium text-defaultWhite ${theme === 'night' ? 'hover:border-defaultWhite' : ''} w-1/3 rounded-md hover:ring-2`}
                                onClick={(e) => postComment(e)}
                                disabled={feedback.status === true}
                            >确 认 发 表</button>
                        }

                    </div>


                </form>
            </div>
        </div>
    </div>
}