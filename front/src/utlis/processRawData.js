
import { calculateTotalCommentQty } from "./commentSortMethod";


export function processTopChapterData({ data, top5Id }) {

    let topFiveChapter = [];

    if (top5Id !== undefined && top5Id.length > 0) {
        let topCh = data.filter(c => top5Id.includes(c.chapterId));
        if (topCh.length > 0) {
            topFiveChapter = topCh.map(c => {
                c.seqInTop = top5Id.indexOf(c.chapterId);
                return c;
            });
            if (topFiveChapter.length > 1) {
                topFiveChapter.sort((a, b) => a.seqInTop - b.seqInTop);
            }
        }
    }
    return topFiveChapter;
}


//filter the comment and chapter before pass to this function
export function processCommentChHeading(data, chapterList) {

    let allComment = [];
    let processCommentList = [];

    if (data.length > 0 && chapterList.length > 0) {
        processCommentList = data.map(c => {

            if (c.chapterId !== -1) {
                let ch = chapterList.find(x => x.chapterId === c.chapterId);
                c.chapterHeading = ch.heading;
            }
            return c;

        });
    }

    return allComment;
}


//calculate each chapter's related comment quantity
export function getEachChapterRelatedCommentQty(allChapter, allComment) {

    if (allChapter.length > 0) {
        allChapter = allChapter.map(c => {
            const relatedComment = allComment.filter(x => x.chapterId === c.chapterId);
            const qty = calculateTotalCommentQty(relatedComment);

            c.comments = qty;
            return c;
        });
    }

    return allChapter;
}

const formatWordCount = (num) => {
    let numString = `${num} 字`;
    if (num.toString().length > 4) {
        let processNumString = num.toString();
        if (processNumString.length === 5) {
            numString = `${processNumString[0]} 万字`;
        } else if (processNumString.length === 6) {
            numString = `${processNumString.substring(0, 2)} 万字`;
        } else if (processNumString.length === 7) {
            numString = `${processNumString[0]} 百万字`;
        } else {
            numString = `${processNumString[0]} 千万字`;
        }

    }
    return numString;
}

//sort chapter list based on book
export function sortBookChapter(allBook, allChapter) {

    allBook.map(b => {
        let relatedCh = allChapter.filter(x => x.bookId === b.id);
        const totalWordCount = relatedCh.reduce((sum, ch) => sum + ch.wordCount, 0);

        b.totalWordCount = formatWordCount(totalWordCount);
        b.totalChapter = relatedCh.length;

        let count = 0;
        b.sections.forEach(sec => {
            let secChapter = relatedCh.filter(x => x.secId === sec.id);
            if (secChapter.length > 0) {
                secChapter = secChapter.sort((a, b) => a.seq - b.seq);

                secChapter.forEach((ch, index) => {
                    ch.seq = index;
                    if (count < b.totalChapter) {
                        ch.indexInBook = count;
                        count = count + 1;
                    }
                })
            }

            sec.chapterList = secChapter;

        });
        return b;
    })
    return allBook;

}


