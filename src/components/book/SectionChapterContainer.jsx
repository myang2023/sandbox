'use client'

import { useEffect, useState } from 'react';
import { useAppContext } from "@/components/ContextProvider";
import useWindowSize from '@/hooks/useWindowSize';
import { Date, Chapter, Comment } from '../svg/GeneralIcons';
import ChapterCard from './ChapterCard';


const chPerPage = 25;
const mdBreakpoint = 768;

export default function SectionChapterContainer({ book, secId }) {
    const { width } = useWindowSize();
    const { theme, setCommentBookSecCh, scrollToComment } = useAppContext();
    const [targetSec, setTargetSec] = useState();
    const [targetSecChList, setTargetSecChList] = useState([]);
    const [targetChList, setTargetChList] = useState([]);
    const [targetPage, setTargetPage] = useState(0);
    const [pagination, setPagination] = useState(width < mdBreakpoint);

    let sectionList = book.sections;

    useEffect(() => {
        if (sectionList.length > 0) {

            sectionList = sectionList.map(sc => {
                sc.paginationNum = [];
                if (sc.chapterList.length > 0) {
                    let pQTY = Math.ceil(sc.chapterList.length / chPerPage); // 10/3 => 4
                    const arr = [...Array(pQTY)].map((_, i) => i); // [1,2,3...]
                    sc.paginationNum = arr;
                }
                return sc;
            });

            const section = sectionList.find(x => x.id === Number(secId)) ?? sectionList[0];

            setTargetSec(section);

            setTargetSecChList(section.chapterList);
            if (!pagination) {
                setTargetChList(section.chapterList);
            } else if (pagination) {
                handlePagination(section.chapterList, 0);

            }

        }
    }, [])

    useEffect(() => {

        if (width < mdBreakpoint && !pagination) {
            setPagination(true);
            handlePagination(-1, 0)

        } else if (width > mdBreakpoint && pagination) {
            setPagination(false);
            const chList = targetSecChList;
            setTargetChList(chList);
        }

    }, [width])


    //if width < 768px, pagniation bar show up, default to page 1
    const handlePagination = (secChList, targetPageNum) => {

        if (secChList === -1) {
            //user navigate inside the target secChList
            //only change the page index
            setTargetPage(targetPageNum);
            const startIndex = targetPageNum * chPerPage;
            const chList = targetSecChList.slice(startIndex, startIndex + chPerPage);
            setTargetChList(chList);
            return;
        }
        if (secChList !== -1) {
            //user switch between section, so default the page to #1
            setTargetPage(targetPageNum);
            const chList = secChList.slice(0, chPerPage);
            setTargetChList(chList);
        }
    }


    const handleSwitchSection = (sectionId) => {

        if (sectionId === targetSec.id) {
            return;
        }
        const section = sectionList.find(x => x.id === sectionId) ?? -1;
        if (section !== -1) {
            setTargetSec(section);
            setTargetSecChList(section.chapterList);

            //extra filter for pagination if device width is < 768px
            //pass page 1 by default when switch section
            if (pagination) {
                //further filter by paging 
                handlePagination(section.chapterList, 0);
                return;
            }

            //if no need to page the chapters, so set it directly here
            setTargetChList(section.chapterList);
        }
    }


    const handleClickChapterComment = (ch) => {

        setCommentBookSecCh([book.id, ch.secId, ch.chapterId]);
        scrollToComment();
    }

    return <div>
        <h2 className='hidden'>Book Chapter</h2>
        <ul id='bookSections' className='flex gap-1 flex-wrap'>
            {
                sectionList.length > 0 && targetSec && sectionList.map((sec, i) => {

                    return <li key={i} onClick={() => handleSwitchSection(sec.id)}
                        className={`hover:cursor-pointer rounded-t-md  px-3 py-1 ${targetSec.id === sec.id ? 'underline underline-offset-2 font-bold' : 'opacity-65 '} relative overflow-hidden`}
                    >
                        {
                            targetSec.id === sec.id && <div className={`absolute ${theme === 'night' ? 'bg-medium' : 'bg-base'}  opacity-20 w-full h-full top-0 left-0`}></div>
                        }
                        {
                            targetSec.id !== sec.id && <div className={`absolute ${theme === 'night' ? 'bg-medium' : 'bg-base'}  opacity-15 w-full h-full top-0 left-0`}></div>
                        }
                        {sec.name}
                    </li>
                })
            }
        </ul>
        <div id='chList' className={`relative`}>
            <div className={`absolute ${theme === 'night' ? 'bg-medium' : 'bg-base'}  opacity-20 w-full h-full top-0 left-0`}></div>
            <div className='relative px-2 py-1'>
                {targetSec?.description && <p className='text-sm'>{targetSec.description}</p>}
                {targetSec?.chapterList.length === 0 ? '' : <p className='text-sm'>共{targetSec?.chapterList.length}章
                    {
                        pagination === true && targetSec?.chapterList.length > 0 && <span className='text-sm px-1'>({chPerPage} 章／页)</span>
                    }
                </p>}
                {pagination === true && targetSec?.paginationNum?.length > 0 ? <div className={`flex gap-2 mt-2 p-1 ${theme === 'night' ? 'bg-medium' : 'bg-light'} rounded flex-wrap`}>
                    <span className='text-defaultBlack'>换页: </span>
                    {
                        targetSec.paginationNum.map((p, i) => {
                            return <button key={i} className={` rounded px-3 opacity-85 hover:underline ${targetPage === p ? 'font-bold' : 'opacity-50 text-defaultBlack'}  ${targetPage === p && theme === 'night' ? 'bg-base' : ''} ${targetPage === p && theme !== 'night' ? 'bg-medium' : ''}`} onClick={() => handlePagination(-1, p)} >{p + 1}</button>
                        })
                    }
                </div> : ''
                }
            </div>

            <ul className="grid md:grid-cols-2 xl:grid-cols-3 gap-3  relative p-2">
                {
                    targetChList.length > 0 ? targetChList.map((ch, i) => {
                        return <li key={i} className='relative'>
                            <div className={`flex flex-col `}>
                                <ChapterCard chapter={ch} />
                                <div className={`flex gap-3 self-end opacity-80 mr-1`}>
                                    <div className={`flex items-center`}>
                                        <div className='w-6 p-1'>
                                            <Chapter customStyle={`${theme === 'night' ? 'fill-light' : ''} `} />
                                        </div>
                                        <p className="text-sm">{ch.wordCount} 字  </p>
                                    </div>
                                    <div className={`flex items-center`}>
                                        <div className='w-6 p-1'>
                                            <Date customStyle={`${theme === 'night' ? 'fill-light' : ''} `} />
                                        </div>
                                        <p className="text-sm">{ch.postDate}</p>
                                    </div>
                                    <div className={`flex  items-center ${ch.comments === 0 ? '' : 'hover:cursor-pointer  hover:underline'} `}
                                        onClick={() => { handleClickChapterComment(ch) }}
                                    >
                                        <div className='w-6 p-1'>
                                            <Comment customStyle={`${theme === 'night' ? 'fill-light' : ''} `} />
                                        </div>
                                        <p className="text-sm">{ch.comments}</p>
                                    </div>
                                </div>
                            </div>

                        </li>
                    })
                        : <li>此卷目前没有章节。</li>
                }
            </ul>
            <div className='relative p-2'>
                {
                    pagination === true && targetSec?.paginationNum.length > 0 ? <div className={`flex gap-2 mt-2 p-1 ${theme === 'night' ? 'bg-medium' : 'bg-light'} rounded flex-wrap`}>
                        <span className='text-defaultBlack'>换页: </span>
                        {
                            targetSec.paginationNum.map((p, i) => {
                                return <button key={i} className={` rounded px-2 opacity-85 hover:underline ${targetPage === p ? 'font-bold' : 'opacity-50 text-defaultBlack'}  ${targetPage === p && theme === 'night' ? 'bg-base' : ''} ${targetPage === p && theme !== 'night' ? 'bg-medium' : ''}`} onClick={() => handlePagination(-1, p)} >{p + 1}</button>
                            })
                        }
                    </div> : ''
                }
            </div>

        </div>

    </div>

}