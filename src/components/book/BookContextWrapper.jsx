'use client'
import { useAppContext } from "@/components/ContextProvider";
import { useEffect, useState } from "react";
import BookInfoCard from "./BookInfoCard";
import SectionChapterContainer from "./SectionChapterContainer";


export default function BookContextWrapper({ bookId, secId }) {
    const { book, setCommentBookSecCh } = useAppContext();
    const [targetBook, setTargetBook] = useState();

    useEffect(() => {

        if (book.length > 0) {
            const id = Number(bookId);
            const b = book.find(x => x.id === id) ?? -1;

            if (b !== -1) {
                setTargetBook(b);
                let secIdNum = 1;
                if (secId) {
                    secIdNum = Number(secId);

                }
                setCommentBookSecCh([id, secIdNum, -1]);
            }
        }
    }, [])

    return targetBook && <div className="flex flex-col gap-4">
        <BookInfoCard book={targetBook} />
        <SectionChapterContainer book={targetBook} secId={secId} />
    </div>




}