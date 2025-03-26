
'use client'
import { useAppContext } from "@/components/ContextProvider";
import { useEffect } from "react";
import { useRouter } from 'next/navigation'



export default function AuthWrappter({ children }) {
    const { author } = useAppContext();
    const router = useRouter();

    useEffect(() => {
        if (author === undefined) {
            router.push('/');
            return;
        }
    }, [])
    if (author === undefined) return null;
    return <>{children}</>

}