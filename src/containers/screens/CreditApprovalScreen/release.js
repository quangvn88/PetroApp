import AsyncStorage from '@react-native-community/async-storage';

import { API_RELEASE_VBELN } from '../../../common/api';

export const release = async (props) => {
    let result = {};
    const user = await AsyncStorage.getItem('user');
    const pass = await AsyncStorage.getItem('pass');
    const { vbeln, reason } = props;
    await fetch(API_RELEASE_VBELN, {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            reason: reason,
            vbeln: vbeln,
            username: user,
            pass: pass
        })
    }).then(res => res.json()).then(res => {
        if (res.RETURN.TYPE === 'S') {
            result = {
                type: 'S',
            }
        } else {
            result = {
                type: 'W',
            }
        }
    }).catch(err => {
        console.log(err);
        result = {
            type: 'E',
        };
    })
    return result;
}