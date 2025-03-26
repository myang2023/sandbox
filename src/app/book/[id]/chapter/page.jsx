
"use client";

import { useParams, useSearchParams } from "next/navigation";
import ChapterContextWrapper from '@/components/chapter/ChapterContextWrapper';
import AuthWrappter from "@/components/AuthWrapper"


export default function Chapter() {
    const { id } = useParams();

    const searchParams = useSearchParams();
    const ch = searchParams.get("ch");
    const sec = searchParams.get('sec');

    return <AuthWrappter>
        <div className="w-full">
            <h1 className="hidden">Chapter Page</h1>
            <ChapterContextWrapper bookId={id} initialChId={ch} initialSecId={sec} />

        </div>

    </AuthWrappter>




}