"use client";

import { createContext, useContext, useState, useRef } from "react";
import { usePathname } from 'next/navigation'
import { Converter, HTMLConverter } from '../utlis/opencc';
import TopNav from "./TopNav";
import Footer from "./Footer";
import CommentContainer from "./comment/CommentContainer";
import { textSizeList, textLineList, textGapList } from "@/utlis/general";

const AppContext = createContext();

export function ContextProvider({ children }) {
    const [user, setUser] = useState({
        name: "",
        avatarId: -1,
        eligible: false,
        size: textSizeList[0].value,
        gap: textGapList[0].value,
        line: textLineList[0].value
    });
    const [theme, setTheme] = useState("default");
    const [fontVersion, setFontVersion] = useState("font-sim");

    const [book, setBook] = useState([]);
    const [author, setAuthor] = useState();
    const [chapter, setChapter] = useState([]);
    const [comment, setComment] = useState([]);
    const [topFive, setTopFive] = useState([]);
    const [commentBookSecCh, setCommentBookSecCh] = useState([-1, -1, -1]);
    const [showPost, togglePost] = useState(false);
    const commentContainerRef = useRef(null);
    const pathname = usePathname();
    const isIndexPage = pathname === '/';

    const isBookOrChapterPage = (pathname.includes('book') || pathname.includes('chapter'));

    const scrollToComment = () => {
        commentContainerRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const switchLangVersion = async (currentVersion, toVersion) => {

        const converter = Converter({ from: currentVersion, to: toVersion });

        const rootNode = document.documentElement;
        const HTMLConvertHandler = HTMLConverter(converter, rootNode, `zh-${currentVersion}`, `zh-${toVersion}`);

        await HTMLConvertHandler.convert();
        if (toVersion === 'cn') {
            setFontVersion('font-sim');
        } else if (toVersion === 'tw') {
            setFontVersion('font-trad');
        }
    }

    return (
        <AppContext.Provider value={{
            user, setUser,
            theme, setTheme,
            book, setBook,
            author, setAuthor,
            chapter, setChapter,
            comment, setComment,
            topFive, setTopFive,
            switchLangVersion,
            commentBookSecCh, setCommentBookSecCh,
            showPost, togglePost,
            scrollToComment
        }}>
            {!isIndexPage && <TopNav />}
            <div lang="zh-cn" className={`${fontVersion} theme-${theme} min-h-screen flex flex-col pt-14 ${theme === 'night' ? 'bg-base text-light' : 'bg-light text-defaultBlack'} `}>
                <main className={` container flex justify-center items-center  flex-grow mx-auto flex-col px-1`}>
                    {children}
                    {
                        isBookOrChapterPage && author && <div className="w-full" ref={commentContainerRef}>
                            <CommentContainer />
                        </div>
                    }
                </main>

                <Footer />

            </div>
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}

