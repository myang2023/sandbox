'use client'
import { useAppContext } from "@/components/ContextProvider";
import { useEffect, useState } from "react";
import BookCard from "./BookCard";


export default function SortedBookListPanel({ isOriginal }) {
    const { book, theme, author } = useAppContext();
    const [subOpt, setSubOption] = useState('');
    const [targetBooks, setTargetBooks] = useState([]);
    const [subCategory, setSubCategory] = useState(['全部']);

    let oriBookList = [];
    let fanBookList = [];
    if (isOriginal) {
        oriBookList = book.filter(b => b.original === true);
    } else {
        fanBookList = book.filter(b => b.original === false);
    }


    useEffect(() => {
        if (subCategory !== undefined && subCategory !== null && subCategory.length > 0) {
            setSubOption(subCategory[0]);
            sortBookSubOptBasedOnOriFan(subCategory[0]);
        }

        if (author.categoryList.length > 0) {
            const newSubCategory = ['全部', ...author.categoryList];
            setSubCategory(newSubCategory);
        }
        setSubOption(subCategory[0]);
        sortBookSubOptBasedOnOriFan(subCategory[0]);
    }, [])



    const handleSubOptChange = (e, opt) => {
        e.stopPropagation();
        if (subOpt === opt) {
            return;
        }
        setSubOption(opt);
        sortBookSubOptBasedOnOriFan(opt);
    }


    const sortBookSubOptBasedOnOriFan = (subOption) => {
        let sortBookList = [];

        if (isOriginal) {
            if (subOption === subCategory[0]) {
                sortBookList = oriBookList;
            } else {
                sortBookList = oriBookList.filter(b => b.category === subOption);
            }
        } else {
            if (subOption === subCategory[0]) {
                sortBookList = fanBookList;
            } else {
                sortBookList = fanBookList.filter(b => b.category === subOption);
            }
        }
        setTargetBooks(sortBookList);
    }


    return <div
        className={`${theme === 'night' ? 'border-medium' : 'border-base'}  border-2 rounded-md  flex flex-col items-center`}>
        <h3 className="font-bold bg-medium text-defaultBlack text-lg px-2 py-1 rounded-md my-2">{isOriginal ? '原创' : '同人'}</h3>
        {
            subCategory && <ul className="bg-medium p-2 flex gap-5 w-full flex-wrap">
                {
                    subCategory.map((sc, i) => {
                        return <li key={i} className={`${sc === subOpt && theme !== 'night' ? 'font-bold underline bg-light' : ''} ${sc === subOpt && theme === 'night' ? 'bg-base text-light underline' : ''} text-defaultBlack rounded-md px-1 hover:cursor-pointer`} onClick={(e) => handleSubOptChange(e, sc)}>
                            {sc} {sc === subCategory[0] ? `(${isOriginal ? oriBookList.length : fanBookList.length})` : ''}
                        </li>
                    })
                }
            </ul>
        }
        <ul className="flex flex-col gap-2  relative p-2 flex-grow w-full">
            <div className={`absolute bg-base  opacity-20 w-full h-full top-0 left-0`}></div>
            <li><p className="text-sm">*书籍缺失最新章节不代表书籍没有章节。</p></li>
            {
                targetBooks.length > 0 ? targetBooks.map((b, i) => {
                    return <li key={i} className={`relative p-2  ${theme === 'night' ? 'bg-medium' : 'bg-light'} text-defaultBlack rounded-md hover:cursor-pointer transition-transform duration-200   hover:translate-x-1`}>
                        <BookCard book={b} />
                    </li>
                }) : <li>【{isOriginal ? '原创' : '同人'} - {subOpt}】 目前没有书籍。</li>
            }
        </ul>

    </div>
}