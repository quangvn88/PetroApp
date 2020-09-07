import AsyncStorage from "@react-native-community/async-storage";

import { API_UNLOCK_WAREHOUSE } from '../../../common/api';

export const createWarehouse = async (props) => {
    let result = {};
    const user = await AsyncStorage.getItem('user');
    const pass = await AsyncStorage.getItem('pass');

    const { bukrs,
        period,
        year,
        checkAndClosePeriod,
        checkPeriod,
        closePeriod,
        quantity,
        value
    } = props
    const bodyRequest = {
        bukrs: bukrs,
        period: period,
        year: year,
        xcomp: checkAndClosePeriod ? 'X' : '',
        xinco: checkPeriod ? 'X' : '',
        xmove: closePeriod ? 'X' : '',
        xnegq: quantity ? 'X' : '',
        xnegv: value ? 'X' : '',
        username: user,
        pass: pass
    }

    await fetch(API_UNLOCK_WAREHOUSE, {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyRequest)
    }).then(res => res.json()).then(res => {
        if (res.RETURN.TYPE === 'W')
            result = {
                type: 'W',
                warning: 'Tài khoản không có quyền'
            }
        else {
            result = {
                type: 'S',
                warning: '',
                createResult: res.ET_DATA
            }
        }
    }).catch(err => {
        result = {
            type: 'E',
            warning: 'Tạo kỳ kho thất bại'
        }
    })

    return result;
}