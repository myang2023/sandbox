
export const commentPerPage = 5;

export const commentPerPageHome = 10;

export const calculateTotalCommentQty = (sort) => {
    let mainQTY = sort.length;
    let subQTY = 0;
    if (sort.length > 0) {
        sort.forEach(c => {
            subQTY = subQTY + c.subList.length;
        });
    }
    const total = mainQTY + subQTY;
    return total;
}

export const calculateTotalPage = (sort, home) => {
    let pageList = [];
    if (sort.length > 0) {
        let pQTY = Math.ceil(sort.length / commentPerPage); // 10/2 => 5
        if (home) {
            pQTY = Math.ceil(sort.length / commentPerPageHome);
        }
        const arr = [...Array(pQTY)].map((_, i) => i); // [1,2,3...]
        pageList = arr;
    }
    return pageList;

}

export const getLastPageNum = (pageArr) => {
    if (pageArr.length > 0) {
        const lastPageNum = pageArr[pageArr.length - 1];
        return lastPageNum;
    }

}


export const processMidComment = (sort, home) => {
    if (sort.length > 0) {
        sort.total = calculateTotalCommentQty(sort);
        sort.paginationNum = calculateTotalPage(sort, home);
        sort.lastPageNum = getLastPageNum(sort.paginationNum);
    }
    return sort;
}