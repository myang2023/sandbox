
'use client'
import { useAppContext } from "@/components/ContextProvider";

export default function Footer() {
    const { theme } = useAppContext();


    return <footer className={`theme-${theme}  ${theme === 'beach' ? 'text-defaultBlack' : 'text-defaultWhite'} bg-base mt-auto p-3 text-xs text-center`}>
        <p > © 2025 [Giant_A]. All rights reserved.</p>
        <p > 请勿转载,请勿二次上传 Giant_A 的书籍作品。</p>
        <p>本站书籍或含有成人内容描写,未满18岁,或未达到当地法定成人年龄的未成年人禁止阅读。</p>
    </footer>
}