
import { BASE_URL } from "./apiConfig";


export const getAuthorData = async () => {

    try {
        const res = await fetch(`${BASE_URL}author`, {
            cache: 'no-store'
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (e) {
        console.log(`error on fetching author data: ${e}`)
    }

}

export const getBook = async () => {
    const res = await fetch(`${BASE_URL}book`, {
        cache: 'no-store'
    });
    const bookData = await res.json();

    return bookData;
}

export const getTopChapter = async () => {
    const res = await fetch(`${BASE_URL}chapter/top`, {
        cache: 'no-store'
    });
    const topFiveData = await res.json();
    return topFiveData;
}

export const getChapter = async (bookIds) => {

    const query = bookIds.join(",");
    const res = await fetch(`${BASE_URL}chapter?ids=${query}`, {
        cache: 'no-store'
    });
    const chapterData = res.json();

    return chapterData;
}

export const getComment = async (bookIds) => {

    const query = bookIds.join(",");
    const res = await fetch(`${BASE_URL}comment?ids=${query}`, {
        cache: 'no-store'
    });
    const commentData = res.json();

    return commentData;
}



export const getBookAndTopChapter = async () => {
    const [bookData, topFiveData] = await Promise.all([
        getBook(), getTopChapter()
    ]);

    return { bookData, topFiveData };
}


//pass the bookIds to fetch chapter&comment

export const getChapterAndComment = async (bookIds) => {

    const [chapterData, commentData] = await Promise.all([
        getChapter(bookIds), getComment(bookIds)
    ]);

    return { chapterData, commentData };
}






