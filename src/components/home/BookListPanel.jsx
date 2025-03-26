'use client'
import { useAppContext } from "@/components/ContextProvider";
import { useEffect, useState } from "react";
import BookCard from "./BookCard";


export default function BookListPanel() {
    const { book, theme, author } = useAppContext();
    const [original, setOption] = useState(true);
    const [subOpt, setSubOption] = useState('');
    const [targetBooks, setTargetBooks] = useState([]);
    const [subCategory, setSubCategory] = useState(['全部']);

    const oriBookList = book.filter(b => b.original === true);
    const fanBookList = book.filter(b => b.original === false);

    useEffect(() => {

        if (author.categoryList.length > 0) {
            const newSubCategory = ['全部', ...author.categoryList];
            setSubCategory(newSubCategory);
        }
        setSubOption(subCategory[0]);
        sortBookSubOptBasedOnOriFan(original, subCategory[0]);
    }, [])


    const handleOriFanChange = () => {
        setOption(!original);
        sortBookSubOptBasedOnOriFan(!original, subOpt);
    }

    const handleSubOptChange = (e, opt) => {
        e.stopPropagation();
        if (subOpt === opt) {
            return;
        }
        setSubOption(opt);
        sortBookSubOptBasedOnOriFan(original, opt);
    }


    const sortBookSubOptBasedOnOriFan = (oriFan, subOption) => {
        let sortBookList = [];
        //if original= true
        if (oriFan) {
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


    return <div id='books'
        className={`${theme === 'night' ? 'border-medium' : 'border-base'}  border-2 rounded-md  `}>
        <h3 className="hidden">Book List</h3>

        <div id='smViewOption' className=" flex gap-5 py-3 justify-center">
            <button className={`${original ? 'bg-medium text-defaultBlack font-bold' : ''}  px-2 py-1 rounded-md`} onClick={handleOriFanChange}>
                原创
            </button>
            <button className={`${!original ? 'bg-medium text-defaultBlack font-bold' : ''} px-2 py-1 rounded-md`} onClick={handleOriFanChange}>
                同人
            </button>
        </div>
        {
            subCategory && <ul className="bg-medium p-2 flex gap-5 flex-wrap ">
                {
                    subCategory.map((sc, i) => {
                        return <li key={i} className={`${sc === subOpt && theme !== 'night' ? 'font-bold underline bg-light' : ''} ${sc === subOpt && theme === 'night' ? 'bg-base text-light underline' : ''} text-defaultBlack rounded-md px-1 hover:cursor-pointer`} onClick={(e) => handleSubOptChange(e, sc)}>
                            {sc} {sc === subCategory[0] ? `(${original ? oriBookList.length : fanBookList.length})` : ''}
                        </li>
                    })
                }
            </ul>
        }
        <ul className="flex flex-col gap-2  relative p-2">
            <div className={`absolute bg-base  opacity-20 w-full h-full top-0 left-0`}></div>
            <li><p className="text-sm">*书籍缺失最新章节不代表书籍没有章节。</p></li>
            {
                targetBooks.length > 0 ? targetBooks.map((b, i) => {
                    return <li key={i} className={`relative p-2  ${theme === 'night' ? 'bg-medium' : 'bg-light'} text-defaultBlack rounded-md hover:cursor-pointer transition-transform duration-200   hover:translate-x-1`}>
                        <BookCard book={b} />
                    </li>
                }) : <li>【{original ? '原创' : '同人'} - {subOpt}】 目前没有书籍。</li>
            }
        </ul>

    </div>
}