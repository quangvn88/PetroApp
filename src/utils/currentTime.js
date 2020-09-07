export const CurrentDate = () => {
    var date = new Date().getDate(); //Current Date
    date = date < 10 ? '0' + date : date;
    var month = new Date().getMonth() + 1; //Current Month
    month = month < 10 ? '0' + month : month;
    var year = new Date().getFullYear(); //Current Year
    return (date + '/' + month + '/' + year);
}

export const CurrentHours = () => {
    var hours = new Date().getHours();
    if (hours < 10) hours = '0' + hours;
    var minutes = new Date().getMinutes();
    if (minutes < 10) minutes = '0' + minutes;
    return (hours + ':' + minutes + ':00');
}