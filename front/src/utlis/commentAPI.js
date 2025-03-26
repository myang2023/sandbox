


export const getCurrentDateTime = () => {
    const options = {
        timeZone: 'Asia/Hong_Kong',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    };

    const formatter = new Intl.DateTimeFormat('en-US', options);
    const formattedDate = formatter.format(new Date());
    let newStr = formattedDate.split(", ");
    let dateStr = newStr[0];
    let timeStr = newStr[1];
    let dateStrParts = dateStr.split('/');
    let formattedDateStr = `${dateStrParts[2]}-${dateStrParts[0]}-${dateStrParts[1]}`;
    let finalStr = formattedDateStr + ' ' + timeStr;

    return finalStr;
}