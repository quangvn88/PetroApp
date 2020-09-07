export const checkParam = (props) => {
    const { fromBukrs, fromPeriod, toPeriod, fromYear, toYear, type } = props;
    // check mã công ty
    if (fromBukrs == '') {
        return {
            type: 'E',
            warning: 'Chưa nhập mã công ty'
        }
    };
    // check kỳ
    const resultCheckPeriod = checkPeriod(fromPeriod, toPeriod);

    if (resultCheckPeriod.type === 'E') {
        return {
            type: 'E',
            warning: resultCheckPeriod.warning
        }
    };
    // check năm
    const resultCheckYear = checkYear(fromYear, toYear);
    if (resultCheckYear.type === 'E') {
        return {
            type: 'E',
            warning: resultCheckYear.warning
        }
    };
    //check type
    if (type == '') {
        return {
            type: 'E',
            warning: 'Chưa nhập Type'
        }
    };
    // Pass hết return true
    return {
        type: 'S',
        warning: ''
    }
};

const regex = /[^0-9]/g;

const checkPeriod = (fromPeriod, toPeriod) => {
    if (Number(fromPeriod) > 16 || Number(toPeriod) > 16) {
        return {
            type: 'E',
            warning: 'Mời nhập kỳ nhỏ hơn 16'
        }
    };
    if (Number(fromPeriod) <= 0 && fromPeriod != '' || Number(toPeriod) <= 0 && toPeriod != '') {
        return {
            type: 'E',
            warning: 'Mờ nhập kỳ lớn hơn 0'
        }
    };
    if (fromPeriod.match(regex) || toPeriod.match(regex)) {
        return {
            type: 'E',
            warning: 'Mời nhập kỳ là một số, không chứa ký tự đặc biệt'
        }
    };
    if (Number(fromPeriod) > Number(toPeriod) && toPeriod !== '') {
        return {
            type: 'E',
            warning: '"Từ kỳ" cần nhỏ hơn "Đến kỳ"'
        }
    }
    return {
        type: 'S',
        warning: ''
    }
}

const checkYear = (fromYear, toYear) => {
    if (fromYear.match(regex) || toYear.match(regex)) {
        return {
            type: 'E',
            warning: 'Mời nhập năm là một số, không chứa ký tự đặc biệt'
        }
    };
    if (Number(fromYear) > Number(toYear) && toYear !== '') {
        return {
            type: 'E',
            warning: '"Từ năm" cần nhỏ hơn "Đến năm"'
        }
    };
    return {
        type: 'S',
        warning: ''
    }
}