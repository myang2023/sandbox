



const APP_BASE_URL = '/api'
export const getAuthorData = async () => {
    const res = await fetch(`${APP_BASE_URL}`);
    const data = await res.json();
    return data;

}

export const getBook = async () => {
    const res = await fetch(`${APP_BASE_URL}/book`);
    const bookData = await res.json();

    return bookData;
}

export const getTopChapter = async () => {
    const res = await fetch(`${APP_BASE_URL}/chapter/top`);
    const topFiveData = await res.json();
    return topFiveData;
}

export const getChapter = async (bookIds) => {

    const query = bookIds.join(",");
    const res = await fetch(`${APP_BASE_URL}/chapter?ids=${query}`);
    const chapterData = res.json();

    return chapterData;
}

export const getComment = async (bookIds) => {

    const query = bookIds.join(",");
    const res = await fetch(`${APP_BASE_URL}/comment?ids=${query}`);
    const commentData = res.json();

    return commentData;
}



export const getBookAndTopChapter = async () => {
    const [bookData, topFiveData] = await Promise.all([
        getBook(), getTopChapter()
    ]);

    return { bookData, topFiveData };
}


export const getChapterAndComment = async (bookIds) => {

    const [chapterData, commentData] = await Promise.all([
        getChapter(bookIds), getComment(bookIds)
    ]);

    return { chapterData, commentData };
}


