


export function processAuthorData(data) {

    if (data.IsSafe === false) {
        return false;
    }
    const author = {
        safe: true,
        name: data.PenName ?? '',
        bio: data.Bio ?? [],
        announcement: data.Announcement ?? [],
        canComment: data.AllowComment,
        commentWordCount: data.CommentWordCount,
        categoryList: data.SexualityList ?? [],
        updateDate: data.UpdateDateString ?? ''
    };

    return author;
}


export function processBookData(data) {

    let bookList = data.map(b => {
        return {
            id: b.BookId,
            title: b.Title,
            seq: b.DisplaySequence,
            intro: b.Introduction,
            era: b.Era,
            category: b.Sexuality,
            tags: b.TagList,
            characters: b.CharacterPool,
            sections: b.SectionList.map(s => {
                return {
                    id: s.Id,
                    name: s.Name,
                    seq: s.DisplaySequence,
                    era: s.Era,
                    description: s.Description ?? [],
                    chapterList: []
                }
            }),
            status: b.Finished,
            original: b.Original,
            meat: b.Meat,
            canComment: b.AllowComment,
            maxCommentQty: b.MaxCommentLength,
            newestChId: b.NewestChapterId ?? -1,
            newestChSecId: b.NewestChapterBelongSecId ?? -1,
            newestChHeading: b.NewestChapterHeading ?? '',

        };
    });

    bookList = bookList.sort((a, b) => a.seq - b.seq);
    bookList = bookList.map(b => {
        let sortSection = b.sections.sort((a, b) => a.seq - b.seq);
        sortSection.map((s, index) => {
            s.seq = index + 1;
        })
        b.sections = sortSection;
        return b;
    });

    return bookList;

}


export function processChapterData(data) {
    let allChapter = [];
    let processChapterList = [];

    processChapterList = data.map(c => {
        return {
            bookId: c.BookId,
            secId: c.SectionId,
            bookTitle: c.BookTitle,
            secName: c.SectionName,
            chapterId: c.ChapterId,
            seq: c.Sequence,
            heading: c.Heading,
            content: c.Content,
            authorNote: c.AuthorNote ?? [],
            authorNoteTop: c.AuthorNotePosition,
            sidenote: c.Sidenote ?? '',
            characterIds: c.CharacterIdList,
            postDate: c.PostDateString,
            wordCount: c.WordCount,
            comments: 0
        }
    });

    if (processChapterList.length > 0) {
        allChapter = processChapterList;
    }

    return allChapter;
}



export function processCommentData(data) {

    let allComment = [];
    let processCommentList = [];

    if (data !== undefined && data !== null && data.length > 0) {
        processCommentList = data.map(c => {

            return {
                commentId: c.CommentId,
                mainCommentId: c.MainCommentId,
                bookId: c.BookId,
                bookTitle: c.BookTitle,
                secId: c.SectionId,
                secName: c.SectionName,
                chapterId: c.ChapterId ?? -1,
                chapterHeading: '',
                content: c.Content,
                postDate: c.PostDateString,
                profileId: c.ProfileId,
                username: c.Username,
                canBeCommented: c.CanBeCommented,
                maxSubCommentQty: c.MaxSubCommentLength,
                author: c.IsAuthor,
            }
        });
    }
    if (processCommentList.length > 0) {
        //sort by latest first
        processCommentList.sort((a, b) => b.commentId - a.commentId);

        let mainComment = processCommentList.filter(x => x.mainCommentId === -1);
        let subComment = processCommentList.filter(x => x.mainCommentId !== -1);
        mainComment = mainComment.map(x => {
            x.subList = [];
            return x;
        });

        if (subComment.length !== 0) {
            mainComment = mainComment.map(x => {
                let relatedSub = subComment.filter(s => s.mainCommentId === x.commentId);
                x.subList = relatedSub;
                return x;
            });
        }

        allComment = mainComment;
    }

    return allComment;
}





