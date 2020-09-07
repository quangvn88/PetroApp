export const convertNumber = (num) => {
    var str = num.toString();
    var result = str.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    return result;
}

export const sumQuantity = arr => {
    const quantity = arr.map((item) => {
        return item.FKLMG_ND + item.FKLMG_TX
    });
    const result = quantity.reduce((accumulator, currentValue) => accumulator + currentValue);
    return result;
};
export const sumRevenue = arr => {
    const revenue = arr.map((item) => {
        return item.NETWR_ND + item.NETWR_TX
    });
    const result = revenue.reduce((accumulator, currentValue) => accumulator + currentValue);
    return result;
}