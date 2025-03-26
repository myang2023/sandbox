'use client'

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAppContext } from "@/components/ContextProvider";
import { PostComment } from '../svg/GeneralIcons';
import MainSubContainer from './MainSubContainer';
import Post from './Post';
import { commentPerPage, processMidComment } from '@/utlis/commentSortMethod';


export default function CommentContainer() {
    const { author, theme, book, chapter, comment, commentBookSecCh, setCommentBookSecCh, showPost, togglePost } = useAppContext();
    const [targetfilter, setTargetFilter] = useState(0);//index of the filter in list
    const [show, setShow] = useState(true); // click expand comment
    const [filterList, setFilterList] = useState([]);//[all(book), secId(s), chId]
    const [bookComment, setBookComment] = useState([]);
    const [theBook, setTheBook] = useState();
    const [theChapter, setTheChapter] = useState();
    const [midComment, setMidComment] = useState([]);
    const [canComment, setCanComment] = useState(
        {
            status: true,
            message: '',
        });

    useEffect(() => {

        if (commentBookSecCh[0] === -1 && commentBookSecCh[1] === -1 && commentBookSecCh[2] === -1) {
            //not book/chapter page
            return;
        }
        //in book page
        if (commentBookSecCh[0] !== -1) {
            //initialize, or switch book    
            if (theBook && theBook.id === commentBookSecCh[0]) {

                if (theChapter) {
                    //from chapter page to the book page
                    setShow(false);
                    setTheChapter();
                    processBookPageComment();
                    return;

                }
                setTheChapter();
                //within book page, same book, switch chapter
                if (commentBookSecCh[2] !== -1) {
                    handleFilterByChapter();
                    setShow(true);
                    return;
                }

            }
            if (!theBook || theBook.id !== commentBookSecCh[0]) {
                setTheChapter();
                setShow(false);
                processBookPageComment();
                return;
            }

        } else if (commentBookSecCh[2] !== -1 && commentBookSecCh[0] === -1) {

            if (!theChapter || theChapter.chapterId !== Number(commentBookSecCh[2])) {
                setShow(false);
            }
            processChapterPageComment();

            return;
        }

    }, [commentBookSecCh])

    useEffect(() => {
        if (commentBookSecCh[0] === -1 && commentBookSecCh[1] === -1 && commentBookSecCh[2] === -1) {
            //not book/chapter page
            return;
        }
        //in book page
        if (commentBookSecCh[0] !== -1) {
            setTheChapter();
            processBookPageComment();
            return;
        } else if (commentBookSecCh[2] !== -1 && commentBookSecCh[0] === -1) {
            processChapterPageComment();
            return;
        }

    }, [comment])


    const processBookPageComment = () => {
        const targetBook = book.find(x => x.id === Number(commentBookSecCh[0])) ?? -1;
        if (targetBook !== -1) {
            setTheBook(targetBook);

            let commentList = comment.filter(x => x.bookId === targetBook.id);

            commentList = processMidComment(commentList);

            const bookCanComment = validateCanComment(targetBook, commentList);
            commentList.forEach(x => {
                x.canReply = bookCanComment;
                if (x.canBeCommented === false || x.subList.length >= x.maxSubCommentQty) {
                    x.canReply = false;
                    x.canReplyMessage = '此主评论被设置为禁止回复，或次评论数目已达到上限';
                }
            })

            setBookComment(commentList);
            //by default, display all book comments
            setMidComment(commentList);

            let filteredComment = [];
            filteredComment = targetBook.sections.map(s => {
                s.comments = commentList.filter(x => x.secId === s.id);
                s.comments = processMidComment(s.comments);
                return s
            });
            filteredComment.splice(0, 0, {
                name: '本书评论',
                id: 0,
                comments: commentList

            });
            setFilterList(filteredComment);
            setTargetFilter(0);

        }
    }

    const processChapterPageComment = () => {
        const targetCh = chapter.find(x => x.chapterId === Number(commentBookSecCh[2])) ?? -1;
        if (targetCh !== -1) {

            if (!theBook || targetCh.bookId !== theBook.id) {
                const targetBook = book.find(x => x.id === targetCh.bookId) ?? -1;
                if (targetBook !== -1) {
                    setTheChapter(targetCh);
                    setTheBook(targetBook);
                    let bookCommentList = comment.filter(x => x.bookId === targetCh.bookId);
                    bookCommentList = processMidComment(bookCommentList);

                    const bookCanComment = validateCanComment(targetBook, bookCommentList);
                    bookCommentList.forEach(x => {
                        x.canReply = bookCanComment;
                        if (x.canBeCommented === false || x.subList.length >= x.maxSubCommentQty) {
                            x.canReply = false;
                            x.canReplyMessage = '此主评论被设置为禁止回复，或次评论数目已达到上限';
                        }
                    })

                    setBookComment(bookCommentList);

                    let commentList = bookCommentList.filter(x => x.chapterId === targetCh.chapterId);
                    commentList = processMidComment(commentList);

                    setMidComment(commentList);

                    let filteredComment = [];
                    filteredComment = targetBook.sections.map(s => {
                        s.comments = bookCommentList.filter(x => x.secId === s.id);
                        s.comments = processMidComment(s.comments);
                        return s
                    });
                    filteredComment.splice(0, 0, {
                        name: '本书评论',
                        id: 0,
                        comments: bookCommentList
                    });
                    filteredComment.push({
                        name: '本章评论',
                        id: targetCh.chapterId,
                        comments: commentList

                    })
                    setFilterList(filteredComment);
                    setTargetFilter(filteredComment.length - 1);
                }
            } else if (theBook && targetCh.bookId === theBook.id) {

                setTheChapter(targetCh);
                let bookCommentList = comment.filter(x => x.bookId === targetCh.bookId);
                bookCommentList = processMidComment(bookCommentList);

                const bookCanComment = validateCanComment(theBook, bookCommentList);
                bookCommentList.forEach(x => {
                    x.canReply = bookCanComment;
                    if (x.canBeCommented === false || x.subList.length >= x.maxSubCommentQty) {
                        x.canReply = false;
                        x.canReplyMessage = '此主评论被设置为禁止回复，或次评论数目已达到上限';
                    }
                })

                setBookComment(bookCommentList);

                let commentList = bookCommentList.filter(x => x.chapterId === targetCh.chapterId);
                commentList = processMidComment(commentList);

                setMidComment(commentList);

                let filteredComment = [];
                filteredComment = theBook.sections.map(s => {
                    s.comments = bookCommentList.filter(x => x.secId === s.id);
                    s.comments = processMidComment(s.comments);
                    return s
                });
                filteredComment.splice(0, 0, {
                    name: '本书评论',
                    id: 0,
                    comments: bookCommentList
                });
                filteredComment.push({
                    name: '本章评论',
                    id: targetCh.chapterId,
                    comments: commentList

                })
                setFilterList(filteredComment);
                setTargetFilter(filteredComment.length - 1);

            }

        }
    }

    const validateCanComment = (targetBook, commentList) => {

        if (author.canComment === false) {
            let info = {
                status: false,
                message: '作者关闭了全站留言权限，如有疑问，请联系作者了解详情。',
                ids: []
            }
            setCanComment(info);
            return false;
        }
        let info = {
            status: true,
            message: '',
        }
        if (targetBook.canComment === false || targetBook.maxCommentQty <= commentList.total) {
            info = {
                status: false,
                message: '此书被设置为禁止回复，或已达到评论数目上限。如有疑问，请联系作者了解详情。',
            }
            setCanComment(info);
            return false;
        }
        setCanComment(info);
        return true;
    }

    const handleFilterByBookAndSection = (filterIndex) => {

        if (targetfilter === filterIndex) {
            return;
        }
        if (filterIndex === 0) {
            setMidComment(bookComment);
        } else if (filterIndex !== 0) {
            const targetComment = filterList[filterIndex];

            setMidComment(targetComment.comments);
            if (!theChapter) {
                setCommentBookSecCh([theBook.id, -1, -1]);
            }
        }

        setTargetFilter(filterIndex);
    }

    const handleFilterByChapter = () => {
        //if filter from Book Page, setSecCh id from book page
        if (!theChapter && commentBookSecCh[0] !== -1) {

            let chComment = bookComment.filter(x => x.chapterId === commentBookSecCh[2]);
            chComment = processMidComment(chComment);
            setMidComment(chComment);

            //index of that sec - the chapter belong to 
            const targetSec = filterList.find(x => x.id === commentBookSecCh[1] && x.name !== '本章评论') ?? -1;
            if (targetSec !== -1) {
                const targetSecIndex = filterList.indexOf(targetSec);
                setTargetFilter(targetSecIndex);
                return;

            }
        }
        //if filter from chapter Page
        if (theChapter && commentBookSecCh[2] !== -1) {
            let chComment = bookComment.filter(x => x.chapterId === theChapter.chapterId);
            chComment = processMidComment(chComment);
            setMidComment(chComment);
            setTargetFilter(filterList.length - 1);
        }

    }


    return <div
        className={` ${theme === 'night' ? 'border-medium' : 'border-base'}  border-2 rounded-md p-2 w-full my-3`}>
        {
            showPost === true && theChapter && <Post targetBook={-1} targetChapter={theChapter} targetMain={-1} toggleReply={-1} />
        }
        {
            showPost === true && !theChapter && <Post targetBook={theBook} targetChapter={-1} targetMain={-1} toggleReply={-1} />
        }
        <div className={`flex gap-2 w-full justify-center `}>
            <h2 className="flex gap-2 justify-center font-bold items-center mb-2">
                评论
            </h2>
            {
                canComment.status === true && <div className={`flex`}>
                    <button className={` ${theme === 'night' ? 'bg-medium' : 'bg-base'}    opacity-80 hover:opacity-100 rounded size-6 p-1 scale-x-[-1] hover:ring-2 `}
                        onClick={() => togglePost(true)}
                    >
                        <PostComment customStyle={`fill-light`} />
                    </button>
                    <span className="relative flex size-3 -ml-1 -mt-1">  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>  <span className="relative inline-flex size-3 rounded-full bg-sky-500"></span></span>
                </div>
            }
        </div>
        {

            canComment.status === false && <p className={`${theme === 'night' ? 'text-medium' : ''} text-defaultBlack text-center text-sm`}>{canComment.message}</p>
        }
        <div className='flex justify-center mt-2 mb-4'>
            <button className={`rounded-md px-8  py-1 ${theme === 'night' ? '' : ''} bg-medium text-defaultBlack`}
                onClick={() => setShow(!show)}
            >
                {show === true ? '收 起' : '展 开'}
            </button>
        </div>

        <div className={`${show === true ? '' : 'hidden'}`}>

            <ul id='filters' className='flex gap-2 flex-wrap my-2 justify-center sm:gap-3'>
                {
                    filterList.length > 0 && bookComment.length > 0 && filterList.map((opt, i) => {

                        if (opt.name === '本章评论') {
                            return <li key={i} onClick={() => handleFilterByChapter()}
                                className={`hover:cursor-pointer rounded-md  px-3 py-1 ${targetfilter === i ? 'underline underline-offset-2 font-bold' : 'opacity-65 '} relative overflow-hidden`}
                            >
                                {
                                    targetfilter === i && <div className={`absolute ${theme === 'night' ? 'bg-medium' : 'bg-base'}  opacity-20 w-full h-full top-0 left-0`}></div>
                                }
                                {
                                    targetfilter !== i && <div className={`absolute ${theme === 'night' ? 'bg-medium' : 'bg-base'}  opacity-15 w-full h-full top-0 left-0`}></div>
                                }
                                {opt.name} ({opt.comments.total ? opt.comments.total : 0})
                            </li>
                        }
                        if (opt.name !== '本章评论') {
                            return <li key={i} onClick={() => handleFilterByBookAndSection(i)}
                                className={`hover:cursor-pointer rounded-md  px-3 py-1 ${targetfilter === i ? 'underline underline-offset-2 font-bold' : 'opacity-65 '} relative overflow-hidden`}
                            >
                                {
                                    targetfilter === i && <div className={`absolute ${theme === 'night' ? 'bg-medium' : 'bg-base'}  opacity-20 w-full h-full top-0 left-0`}></div>
                                }
                                {
                                    targetfilter !== i && <div className={`absolute ${theme === 'night' ? 'bg-medium' : 'bg-base'}  opacity-15 w-full h-full top-0 left-0`}></div>
                                }
                                {opt.name} ({opt.comments.total ? opt.comments.total : 0})
                            </li>
                        }
                    })
                }
            </ul>
            <div className={``}>

                <div id='commentMetaData' className='mb-4 text-center'>
                    {
                        //message for book have 0 comment
                        canComment.status === false && bookComment.length === 0 && <p>目前没有评论。</p>
                    }
                    {
                        //message for book have 0 comment
                        canComment.status === true && bookComment.length === 0 && <p>目前没有评论,留下你的评论吧 :D</p>
                    }
                    {
                        //message for section have 0 comment
                        bookComment.length > 0 && midComment.length === 0 && commentBookSecCh[2] === -1 && <p>此卷目前没有评论。</p>
                    }
                    {
                        //message for section have 0 comment
                        bookComment.length > 0 && midComment.length === 0 && commentBookSecCh[2] !== -1 && <p>此章目前没有评论。</p>
                    }
                    {
                        midComment.length > 0 && <div className=''>
                            <p>
                                {targetfilter !== 0 && commentBookSecCh[0] !== -1 && commentBookSecCh[2] !== -1 && !theChapter && `章节：【${midComment[0].chapterHeading}】`}

                                共{midComment.total}评论, 共{midComment.paginationNum.length}页
                            </p>
                            <p className='text-sm px-1'>{commentPerPage} 主评论／页</p>
                        </div>
                    }

                </div>

                {
                    midComment.length > 0 && <MainSubContainer midComment={midComment} />
                }

            </div>
        </div>

    </div >

}