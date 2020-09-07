const regex = /[^0-9]/g;

export const checkParam = ({ bukrs, period, year }) => {
    // Check mã công ty
    if (bukrs == '') {
        return {
            type: 'E',
            warning: 'Chưa nhập mã công ty'
        };
    };
    // Check period
    if (period == '') {
        return {
            type: 'E',
            warning: 'Chưa nhập kỳ'
        };
    };
    if (Number(period) <= 0) {
        return {
            type: 'E',
            warning: 'Mời nhập kỳ lớn hơn 0'
        };
    };
    if (Number(period) > 12) {
        return {
            type: 'E',
            warning: 'Mời nhập kỳ nhỏ hơn 12'
        };
    };
    if (period.match(regex))
        return {
            type: 'E',
            warning: 'Mời nhập kỳ một số, không chứa ký tự đặc biệt'
        };
    // Check year
    if (year == '') {
        return {
            type: 'E',
            warning: 'Chưa nhập năm'
        };
    };
    if (Number(year) <= 0) {
        return {
            type: 'E',
            warning: 'Mời nhập năm lớn hơn 0'
        };
    };
    if (year.match(regex))
        return {
            type: 'E',
            warning: 'Mời nhập năm một số, không chứa ký tự đặc biệt'
        };
    return {
        type: 'S',
        warning: ''
    }
}