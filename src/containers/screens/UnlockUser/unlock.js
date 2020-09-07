import AsyncStorage from '@react-native-community/async-storage';

import { API_UNLOCKUSER, API_USERDETAIL } from '../../../common/api';

const checkUserUnlock = async ({ username, user, pass }) => {
    //get detail user login
    let userDetail = await AsyncStorage.getItem('userDetail');
    let roomUser;
    if (userDetail)
        roomUser = '' + JSON.parse(userDetail).ROOMNUMBER;
    //get detail user unlock
    let userUnlock;
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
    }).then(res => res.json()).then(async (res) => {
        userUnlock = res.DATA[0];
    }).catch(err => console.log(err))

    return (roomUser.substring(0, 2) === userUnlock.ROOMNUMBER.substring(0, 2));
}

export const unlock = async (props) => {
    let result = {};
    const user = await AsyncStorage.getItem('user');
    const pass = await AsyncStorage.getItem('pass');
    const { username } = props;
    const check = await checkUserUnlock({ username: username, user: user, pass: pass });
    // console.log(check);
    if (check)
        await fetch(API_UNLOCKUSER, {
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
            // console.log(res);
            if (res.RETURN[0].TYPE === 'S')
                result = {
                    type: 'S',
                    warning: ''
                };
            else {
                result = {
                    type: 'W',
                    warning: 'Tài khoản không có quyền'
                };
            }
        }).catch(err => {
            result = {
                type: 'E',
                warning: 'Có lỗi xảy ra, vui lòng thử lại'
            }
        })
    else {
        result = {
            type: 'W',
            warning: 'Tài khoản không có quyền'
        };
    }
    return result;
}