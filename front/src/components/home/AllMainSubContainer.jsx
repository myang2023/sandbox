'use client'

import { useEffect, useState } from 'react';
import { useAppContext } from "@/components/ContextProvider";
import { FirstLastPage, PreviousNext, Warn } from '../svg/GeneralIcons';
import MainCommentLink from '../comment/MainCommentLink';
import SubComment from '../comment/SubComment';
import { commentPerPageHome } from '@/utlis/commentSortMethod';


export default function AllMainSubContainer({ midComment }) {
    const { theme } = useAppContext();
    const [sortComment, setSortComment] = useState([]);
    const [targetPage, setTargetPage] = useState(0);
    const [inputNum, setInputNum] = useState('');


    useEffect(() => {
        handlePagination(0);
        setInputNum('');

    }, [midComment])


    const handlePagination = (targetPageNum) => {

        if (targetPageNum < 0 || targetPageNum > midComment.lastPageNum) {
            return;
        }

        setTargetPage(targetPageNum);
        const startIndex = targetPageNum * commentPerPageHome;
        const targetComment = midComment.slice(startIndex, startIndex + commentPerPageHome);
        setSortComment(targetComment);
    }

    const handleInputPageNum = (num) => {
        setInputNum(num);
    }

    return <div className='mt-3' >
        <p className='text-center'>
            共{midComment.total}评论, 共{midComment.paginationNum.length}页
        </p>
        <p className='text-sm px-1 text-center'>{commentPerPageHome} 主评论／页</p>
        <div
        >
            <div id='pageNav' className={`flex flex-col gap-4 items-center sm:flex-row sm:justify-center sm:items-start sm:gap-10 p-1 ${theme === 'night' ? '' : ''} mb-4 `}>

                <div id='autoPageNum' className='flex gap-6 sm:mt-1'>
                    <button className={`size-6 rounded-md p-1 bg-medium  opacity-85 hover:opacity-100`} onClick={() => handlePagination(0)}>
                        <FirstLastPage customStyle={`fill-defaultBlack`} />
                    </button>
                    <button className={`size-6 flex items-center justify-center rounded-md p-1 bg-medium opacity-85 hover:opacity-100`} onClick={() => handlePagination(targetPage - 1)}>
                        <PreviousNext customStyle={`fill-defaultBlack`} />
                    </button>
                    <p className='px-2'>{targetPage + 1}/{midComment.paginationNum?.length}</p>

                    <button className={`size-6 flex items-center justify-center rounded-md p-1 bg-medium opacity-85 hover:opacity-100 rotate-180`} onClick={() => handlePagination(targetPage + 1)}>
                        <PreviousNext customStyle={`fill-defaultBlack`} />
                    </button>
                    <button className={`size-6 rounded-md p-1 bg-medium  opacity-85 hover:opacity-100 rotate-180`} onClick={() => handlePagination(midComment.lastPageNum)}>
                        <FirstLastPage customStyle={`fill-defaultBlack `} />
                    </button>
                </div>


                <div id='customPageNum' className=''>
                    <input
                        name="pageInput"
                        id="pageInput"
                        type="number"
                        value={inputNum}
                        className={`${theme === 'night' ? 'bg-slate-400/50' : ''} rounded px-2   py-1 w-16`}
                        onChange={(e) => handleInputPageNum(e.target.value)}
                    />
                    <span className='pl-2'>页</span>
                    <button className={`rounded-md px-2  py-1 ${theme === 'night' ? '' : ''} bg-medium text-defaultBlack ml-4`}
                        onClick={() => handlePagination(inputNum - 1)}
                    >
                        跳转
                    </button>
                    {inputNum !== '' && (inputNum <= 0 || inputNum > midComment.lastPageNum + 1) && <div className='text-sm flex items-center'>
                        <div className='w-6 p-1'>
                            <Warn customStyle={`${theme === 'night' ? 'fill-medium' : ''}`} />
                        </div>
                        页数超出范围
                    </div>}
                </div>
            </div>

            <ul id='commentList' className={`flex flex-col gap-3 `}>
                {
                    sortComment.length > 0 && sortComment.map((item, i) => {
                        return <li key={i}
                            className={`rounded-md p-2 ${theme !== 'plant' && theme !== 'beach' ? 'bg-slate-400/20' : ''} ${theme == 'plant' ? 'bg-green-400/20' : ''} ${theme == 'beach' ? 'bg-sky-400/20' : ''}`}
                        >
                            <div className='relative'>
                                <MainCommentLink comment={item} />
                            </div>

                            {
                                item.subList.length > 0 && <div className={`flex flex-col ml-5 gap-2 mt-3`}>
                                    {
                                        item.subList.map((sc, index) => {
                                            return <SubComment comment={sc} key={index} />
                                        })
                                    }
                                </div>
                            }
                        </li>
                    })
                }
            </ul>
        </div>

    </div>

}