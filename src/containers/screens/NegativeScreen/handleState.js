import AsyncStorage from "@react-native-community/async-storage";

import { API_CHECK_NEGATIVE } from '../../../common/api';

export const handleState = async (props) => {
    const { info } = props;
    // console.log(info);
    const result = info.XMCNG == 'X' ? uncheck(info) : check(info);
    return result;
}

const check = async (info) => {
    // console.log(info)
    let result = {};
    const user = await AsyncStorage.getItem('user');
    const pass = await AsyncStorage.getItem('pass');
    await fetch(API_CHECK_NEGATIVE, {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            matnr: info.MATNR,
            werks: info.WERKS,
            xmcng: 'X',
            username: user,
            pass: pass
        })
    }).then(res => res.json()).then(res => {
        // console.log(res);
        if (res.RETURN.TYPE === 'S') {
            result = {
                type: 'S',
                warning: 'Cho phép xuất âm thành công'
            }
        }
        else {
            result = {
                type: 'W',
                warning: 'Tài khoản không có quyền'
            }
        }
    }).catch((err) => {
        result = {
            type: 'E',
            warning: 'Có lỗi xảy ra, vui lòng thử lại'
        }
    })

    return result;
}

const uncheck = async (info) => {
    let result = {};
    const user = await AsyncStorage.getItem('user');
    const pass = await AsyncStorage.getItem('pass');
    await fetch(API_CHECK_NEGATIVE, {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            matnr: info.MATNR,
            werks: info.WERKS,
            xmcng: '',
            username: user,
            pass: pass
        })
    }).then(res => res.json()).then(res => {
        if (res.RETURN.TYPE === 'S') {
            result = {
                type: 'S',
                warning: 'Không cho phép xuất âm thành công'
            }
        }
        else {
            result = {
                type: 'W',
                warning: res.RETURN.MESSAGE
            }
        }
    }).catch((err) => {
        result = {
            type: 'E',
            warning: 'Có lỗi xảy ra, vui lòng thử lại'
        }
    })

    return result;
}