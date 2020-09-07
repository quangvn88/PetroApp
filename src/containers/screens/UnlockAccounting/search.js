import AsyncStorage from '@react-native-community/async-storage';

import { API_ACOUNTING } from '../../../common/api';

export const search = async (props) => {
    const { bukrs, fromBukrs, toBukrs } = props;
    let result = {};
    const user = await AsyncStorage.getItem('user');
    const pass = await AsyncStorage.getItem('pass');
    await fetch(API_ACOUNTING, {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            bukrs: bukrs,
            fromBukrs: fromBukrs,
            toBukrs: toBukrs,
            username: user,
            pass: pass
        })
    }).then(res => res.json()).then(res => {
        if (res.NOT_AUTH.length == 0)
            if (res.DATA.length != 0)
                result = {
                    resultAcounting: res.DATA,
                    warning: ''
                };
            else {
                result = {
                    resultAcounting: [],
                    warning: 'Không tìm thấy kết quả phù hợp'
                };
            }
        else {
            result = {
                resultAcounting: [],
                warning: 'Tài khoản không có quyền với: ' + res.NOT_AUTH.join(', ')
            };
        }
    }).catch(err => {
        result = {
            resultAcounting: [],
            warning: 'Có lỗi xảy ra, Vui lòng thử lại'
        };
    })

    return result;
}