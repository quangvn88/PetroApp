import AsyncStorage from '@react-native-community/async-storage';

import { API_USERDETAIL } from '../../../common/api';

export const search = async (props) => {
    let result = {};
    const user = await AsyncStorage.getItem('user');
    const pass = await AsyncStorage.getItem('pass');
    const { username } = props;
    await fetch(API_USERDETAIL, {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: username,
            username: user,
            pass: pass
        })
    }).then(res => res.json()).then(res => {
        if (res.DATA.length != 0)
            result = {
                userDetail: res.DATA[0],
                warning: ''
            };
        else {
            result = {
                userDetail: {},
                warning: 'Tài khoản không tồn tại'
            };
        }
    }).catch(err => {
        // console.log(err);
        result = {
            userDetail: {},
            warning: 'Có lỗi xảy ra, Vui lòng thử lại'
        };
    })

    return result;
}