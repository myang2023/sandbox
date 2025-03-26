'use client'
import { useAppContext } from "@/components/ContextProvider";
import { useState } from "react";
import Link from 'next/link'
import { textSizeList, textGapList, textLineList } from "@/utlis/general";
import { Menu } from "@/components/svg/GeneralIcons";


export default function ChapterContextWrapper({ targetBook, currentChapter, scrollTop, scrollHalf, scrollBottom, adjustTextSize, adjustTextGap, adjustTextLine, currentSec, jumpToChapter }) {
    const { theme, user, scrollToComment } = useAppContext();
    const [show, setShow] = useState(false);

    const goToComment = () => {
        scrollToComment();
        setShow(false);
    }

    return <div className={`fixed z-20 bottom-3 left-3 `} >
        <div id='relativeDiv' className="relative pl-4 pb-4 "
        >
            <div className={` flex flex-col gap-3  w-fit p-2 rounded-md  ${theme !== 'plant' && theme !== 'beach' ? 'bg-slate-400/90' : ''} ${theme == 'plant' ? 'bg-green-400/90' : ''} ${theme == 'beach' ? 'bg-sky-400/90' : ''} text-defaultBlack ${show === true ? '' : 'hidden'}`}>

                <div className="flex items-center   gap-3">
                    <Link href={'/home'} className={`rounded-md  p-1 border border-light    hover:underline opacity-85 hover:opacity-100 bg-medium `}>主页</Link>
                    <Link href={`/book/${targetBook.id}`} className={`rounded-md  p-1 border border-light    hover:underline opacity-85 hover:opacity-100 bg-medium `}>书详情/目录</Link>
                    <button onClick={goToComment} className={`rounded-md  p-1 border border-light    hover:underline opacity-85 hover:opacity-100 bg-medium `}>评论({currentChapter.comments})</button>
                </div>
                <div className="flex justify-between   items-center">
                    <p>至章节</p>
                    <button onClick={scrollTop} className={`rounded-md  p-1 border border-light bg-medium`}>
                        顶部
                    </button>
                    <button onClick={scrollHalf} className={`rounded-md  p-1 border border-light bg-medium`}>
                        中部
                    </button>
                    <button onClick={scrollBottom} className={`rounded-md  p-1 border border-light bg-medium`}>
                        底部
                    </button>
                </div>


                <ul className="flex gap-5  ">
                    <li>字体大小</li>
                    {
                        textSizeList.map((s, i) => {
                            return <li key={i} onClick={() => adjustTextSize(s.value)}
                                className={`${user.size === s.value ? ' opacity-100 font-bold border-light  ' : 'opacity-60 border-transparent'} hover:cursor-pointer select-none  rounded-md px-1 border`}
                            >{s.name}</li>
                        })
                    }
                </ul>
                <ul className="flex gap-5  ">
                    <li>字体间隔</li>
                    {
                        textGapList.map((g, i) => {
                            return <li key={i} onClick={() => adjustTextGap(g.value)}
                                className={`${user.gap === g.value ? ' opacity-100 font-bold border-light  ' : 'opacity-60 border-transparent'} border  rounded-md px-1 hover:cursor-pointer select-none `}
                            >{g.name}</li>
                        })
                    }
                </ul>
                <ul className="flex gap-5  ">
                    <li>字体行距</li>
                    {
                        textLineList.map((l, i) => {
                            return <li key={i} onClick={() => adjustTextLine(l.value)}
                                className={`${user.line === l.value ? ' opacity-100 font-bold border-light  ' : 'opacity-60 border-transparent'} border rounded-md px-1 hover:cursor-pointer select-none sel`}
                            >{l.name}</li>
                        })
                    }
                </ul>
                <div className=" flex  w-full  gap-3">
                    <div className="flex flex-col  text-center ml-1">
                        <p>卷<span className="">{currentSec.seq}</span> - <span className="font-bold">{currentChapter.seq + 1}</span>/{currentSec.chapterList.length}章</p>
                        <p className="text-sm">(书 - <span className="font-bold">{currentChapter.indexInBook + 1}</span>/{targetBook.totalChapter}章)</p>
                    </div>
                    <div className="flex gap-6 items-center  ">
                        {
                            targetBook.totalChapter > 1 && currentChapter.indexInBook !== 0 ? <button onClick={() => jumpToChapter('prev')} className={`${theme === 'night' ? 'bg-medium' : ''} text-defaultBlack px-2 py-1 border  border-light  opacity-70 hover:opacity-100 rounded-md select-none`}>
                                上章
                            </button> : <div className="w-12"></div>
                        }
                        {
                            targetBook.totalChapter > 1 && currentChapter.indexInBook !== targetBook.totalChapter - 1 && <button onClick={() => jumpToChapter('next')} className={`${theme === 'night' ? 'bg-medium' : ''} text-defaultBlack px-2 py-1 border border-light  opacity-70 hover:opacity-100 rounded-md select-none`}>
                                下章
                            </button>
                        }
                    </div>

                </div>

            </div>
            <button onClick={() => setShow(!show)}
                className={`size-10 border border-light drop-shadow-md rounded-full p-2 bg-medium absolute left-0 bottom-0 opacity-70 hover:opacity-85 hover:-rotate-12`}>
                <Menu />

            </button>
        </div>


    </div>






}