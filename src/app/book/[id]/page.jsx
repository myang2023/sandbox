
"use client";

import { useParams, useSearchParams } from "next/navigation";
import BookContextWrapper from "@/components/book/BookContextWrapper";
import AuthWrappter from "@/components/AuthWrapper"
import Link from "next/link";


export default function Book() {
    const { id } = useParams();
    const searchParams = useSearchParams();
    const sec = searchParams.get("sec") || 1;


    return <AuthWrappter>
        <div className="w-full">
            <h1 className="hidden">Book Page</h1>
            <Link href={'/home'} className="text-medium font-bold text-sm hover:underline opacity-85 hover:opacity-100 ">主页</Link>
            <BookContextWrapper bookId={id} secId={sec} />

        </div>

    </AuthWrappter>

}