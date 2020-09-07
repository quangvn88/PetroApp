import AsyncStorage from "@react-native-community/async-storage";

import { API_NEGATIVE } from '../../../common/api';

export const search = async (props) => {
    let result = {};
    const user = await AsyncStorage.getItem('user');
    const pass = await AsyncStorage.getItem('pass');
    const { matnr, plant } = props;
    await fetch(API_NEGATIVE, {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            matnr: matnr,
            werks: plant,
            username: user,
            pass: pass
        })
    }).then(res => res.json()).then(res => {
        if (res.DATA.MATNR != '') {
            result = {
                info: res.DATA,
                warning: ''
            }
        } else {
            result = {
                info: {},
                warning: 'Không tìm thấy kết quả phù hợp'
            }
        }
    }).catch(err => {
        result = {
            info: {},
            warning: 'Có lỗi xảy ra, Vui lòng thử lại'
        };
    })

    return result;
}