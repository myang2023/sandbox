'use client'
import { useAppContext } from "@/components/ContextProvider";
import { useEffect, useState, useRef } from "react";
import Link from 'next/link'
import BookSimpleCard from "./BookSimpleCard";
import Attribute from "./Attribute";
import DynamicChapter from "./DynamicChapter";
import useWindowSize from "@/hooks/useWindowSize";
import More from './More';



export default function ChapterContextWrapper({ bookId, initialSecId, initialChId }) {
    const { theme, book, setCommentBookSecCh, user, setUser } = useAppContext();
    const [targetBook, setTargetBook] = useState();
    const [currentSec, setCurrentSec] = useState();
    const [currentChapter, setCurrentChapter] = useState();
    const [secChapterList, setSecChapterList] = useState([]);
    const { height } = useWindowSize();
    const chapterDiv = useRef(null);
    const chapterTop = useRef(null);
    const chapterBottom = useRef(null);


    const scrollDocTop = () => {

        window.scrollTo({
            top: 0,
        });
    };

    const scrollHalf = () => {
        if (chapterDiv.current) {
            const rect = chapterDiv.current.getBoundingClientRect();
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const offsetTop = rect.top + scrollTop;
            const halfHeight = rect.height / 2;

            window.scrollTo({
                top: offsetTop + halfHeight,
                behavior: "smooth",
            });
        }
    };

    const scrollTop = () => {
        if (chapterDiv.current) {
            const rect = chapterDiv.current.getBoundingClientRect();
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            window.scrollTo({
                top: rect.top,
                behavior: "smooth",
            });
        }
    };
    const scrollBottom = () => {
        if (chapterDiv.current) {
            const rect = chapterDiv.current.getBoundingClientRect();
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const offsetTop = rect.top + scrollTop;
            window.scrollTo({
                top: offsetTop + rect.height - height + 32,
                behavior: "smooth",
            });
        }
    };

    const adjustTextSize = (newSize) => {
        setUser({ ...user, size: newSize })
    }
    const adjustTextGap = (newGap) => {
        setUser({ ...user, gap: newGap })
    }
    const adjustTextLine = (newLine) => {
        setUser({ ...user, line: newLine })
    }

    const jumpToChapter = (opt) => {

        if (targetBook.totalChapter === 1) {
            return;
        }
        if (currentChapter.indexInBook === 0 && opt === 'prev') {
            return;
        }
        if (currentChapter.indexInBook === (targetBook.totalChapter - 1) && opt === 'next') {
            return;
        }

        let newChIndex = currentChapter.indexInBook + 1;
        if (opt === 'prev') {
            newChIndex = currentChapter.indexInBook - 1;
        }

        let newCh = -1;

        for (const sec of targetBook.sections) {
            const found = sec.chapterList.find(x => x.indexInBook === newChIndex);
            if (found) {
                newCh = found;
                setCurrentSec(sec);
                setCurrentChapter(newCh);
                setCommentBookSecCh([-1, -1, newCh.chapterId]);
                break;
            }
        }
        scrollDocTop();
    }

    useEffect(() => {

        if (book.length > 0) {
            const id = Number(bookId);
            const b = book.find(x => x.id === id) ?? -1;

            if (b !== -1) {
                setTargetBook(b);
                setSecChapterList(b.sections);
                let targetSecId = Number(initialSecId);
                let targetChId = Number(initialChId);
                let targetSec = b.sections.find(x => x.id === targetSecId) ?? -1;
                if (targetSec !== -1) {
                    let targetCh = targetSec.chapterList.find(x => x.chapterId === targetChId) ?? -1;
                    if (targetChId !== -1) {
                        setCurrentSec(targetSec);
                        setCurrentChapter(targetCh);
                        setCommentBookSecCh([-1, -1, targetChId]);
                    }
                }
            }
        }
    }, [])

    return targetBook && currentChapter && <div className="">
        <div className="flex items-center -mb-1">
            <Link href={'/home'} className="text-medium font-bold text-sm hover:underline opacity-85 hover:opacity-100 ">主页</Link>
            <p className="px-1 text-lg ">/</p>
            <Link href={`/book/${bookId}`} className="text-medium font-bold text-sm hover:underline opacity-85 hover:opacity-100 ">《{targetBook.title}》</Link>
        </div>

        <div className={`${theme === 'night' ? 'border-medium' : 'border-base'}  border-2 rounded-md  p-2 flex flex-col gap-2 items-center`}>
            <BookSimpleCard bookBasic={targetBook} />
            <Attribute chapterAttribute={currentChapter} />
        </div>

        <div ref={chapterDiv} >
            <div ref={chapterTop}></div>
            <DynamicChapter targetCh={currentChapter} />
            <div ref={chapterBottom} ></div>

        </div>
        <More targetBook={targetBook} currentSec={currentSec} currentChapter={currentChapter} scrollBottom={scrollBottom} scrollTop={scrollTop} scrollHalf={scrollHalf} adjustTextSize={adjustTextSize} adjustTextGap={adjustTextGap} adjustTextLine={adjustTextLine} jumpToChapter={jumpToChapter} />

        <div className="w-full flex flex-col items-center">
            <div className="flex gap-3 items-center ">

                {
                    targetBook.totalChapter > 1 && currentChapter.indexInBook !== 0 && <button onClick={() => jumpToChapter('prev')} className={`${theme === 'night' ? 'bg-medium' : 'bg-light'} text-defaultBlack px-2 py-1 border hover:drop-shadow border-medium  opacity-70 hover:opacity-100 rounded-md`}>
                        上章
                    </button>
                }

                <Link href={`/book/${targetBook.id}`} className={`${theme === 'night' ? 'bg-medium' : ''} text-defaultBlack px-2 py-1 border border-medium  opacity-70 hover:opacity-100 rounded-md`}>书详情/目录</Link>

                {
                    targetBook.totalChapter > 1 && currentChapter.indexInBook !== targetBook.totalChapter - 1 && <button onClick={() => jumpToChapter('next')} className={`${theme === 'night' ? 'bg-medium' : ''} text-defaultBlack px-2 py-1 border border-medium  opacity-70 hover:opacity-100 rounded-md`}>
                        下章
                    </button>
                }

            </div>
            <div className="flex gap-2">
                <p>阅读进度: </p>
                <p>卷<span className="">{currentSec.seq}</span> - <span className="font-bold">{currentChapter.seq + 1}</span>/{currentSec.chapterList.length}章</p>
                <p>(书 - <span className="font-bold">{currentChapter.indexInBook + 1}</span>/{targetBook.totalChapter}章)</p>
            </div>
        </div>



    </div>




}