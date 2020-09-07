import AsyncStorage from "@react-native-community/async-storage";

import { API_DELETE_PO } from '../../../common/api';

export const removePo = async (props) => {
    let result = {};
    const user = await AsyncStorage.getItem('user');
    const pass = await AsyncStorage.getItem('pass');
    const { bedat, timef, period } = props;
    await fetch(API_DELETE_PO, {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            bedat: bedat,
            timef: timef,
            username: user,
            pass: pass
        })
    }).then(res => res.json()).then(res => {
        if (res.RETURN.TYPE === 'S') {
            result = {
                type: 'S',
                warning: `Ngày: ${bedat}\nKỳ: ${period}\nThời gian: ${timef}`
            }
        } else if (res.RETURN.MESSAGE_V1 === 'Delete failed') {
            result = {
                type: 'W',
                warning: 'Có lỗi xảy ra, Vui lòng thử lại'
            }
        } else {
            result = {
                type: 'W',
                warning: 'Tài khoản không có quyền'
            }
        }
    }).catch(err => {
        result = {
            type: 'E',
            warning: 'Có lỗi xảy ra, Vui lòng thử lại'
        }
    })

    return result;
}