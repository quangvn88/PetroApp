import AsyncStorage from "@react-native-community/async-storage";

import { API_WAREHOUSE } from '../../../common/api';

export const search = async (props) => {
    let result = {};
    const user = await AsyncStorage.getItem('user');
    const pass = await AsyncStorage.getItem('pass');
    const { bukrs } = props;
    await fetch(API_WAREHOUSE, {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            bukrs: bukrs,
            username: user,
            pass: pass
        })
    }).then(res => res.json()).then(res => {
        if (res.DATA.length != 0)
            result = {
                resultWarehouse: res.DATA[0],
                warning: ''
            };
        else {
            result = {
                resultWarehouse: [],
                warning: 'Không tìm thấy kết quả phù hợp'
            };
        }
    }).catch(err => {
        result = {
            resultWarehouse: [],
            warning: 'Có lỗi xảy ra, Vui lòng thử lại'
        };
    })

    return result;
}