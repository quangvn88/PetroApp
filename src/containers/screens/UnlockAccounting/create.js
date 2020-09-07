import AsyncStorage from '@react-native-community/async-storage';

import { API_UNLOCK_ACOUNTING } from '../../../common/api';

export const createAccounting = async (props) => {
    const { bukrs, fromBukrs, toBukrs, fromPeriod, toPeriod, fromYear, toYear, type } = props;
    let result = {};
    const user = await AsyncStorage.getItem('user');
    const pass = await AsyncStorage.getItem('pass');

    await fetch(API_UNLOCK_ACOUNTING, {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            type: type,
            fromBukrs: fromBukrs,
            toBukrs: toBukrs,
            bukrs: bukrs,
            fromperiod: fromPeriod,
            toperiod: toPeriod,
            fromyear: fromYear,
            toyear: toYear,
            username: user,
            pass: pass
        })
    }).then(res => res.json()).then(res => {
        if (res.NOT_AUTH.length === 0)
            if (res.RETURN.TYPE == 'S') {
                result = {
                    type: 'S',
                    warning: ''
                }
            }
            else if (res.RETURN.TYPE == 'E') {
                result = {
                    type: 'E',
                    warning: 'Mã công ty không tồn tại'
                }
            } else {
                result = {
                    type: 'W',
                    warning: 'Tài khoản không có quyền'
                }
            }
        else {
            result = {
                type: 'W',
                warning: 'Tài khoản không có quyền với: ' + res.NOT_AUTH.join(', ')
            }
        }
    }).catch(err => {
        result = {
            type: 'E',
            warning: 'Có lỗi xảy ra, vui lòng thử lại'
        }
    })
    return result;
}