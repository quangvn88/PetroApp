import AsyncStorage from "@react-native-community/async-storage";

import { API_PO } from '../../../common/api';

export const search = async (props) => {
    let result = {};
    const user = await AsyncStorage.getItem('user');
    const pass = await AsyncStorage.getItem('pass');
    const { year, month } = props;
    await fetch(API_PO, {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            gjahr: year,
            month: month,
            username: user,
            pass: pass
        })
    }).then(res => res.json()).then(res => {
        if (res.DATA) {
            if (res.DATA.length === 0)
                result = {
                    info: [],
                    warning: 'Không tìm thấy kết quả phù hợp'
                }
            else
                result = {
                    info: res.DATA,
                    warning: ''
                }
        }
        else {
            result = {
                info: [],
                warning: ''
            }
        }
    }).catch(err => {
        result = {
            info: [],
            warning: 'Có lỗi xảy ra, Vui lòng thử lại'
        }
    })

    return result;
}