import AsyncStorage from "@react-native-community/async-storage";

import { API_RELEASE_EBELN } from '../../../common/api';

export const release = async (props) => {
    let result = {};
    const user = await AsyncStorage.getItem('user');
    const pass = await AsyncStorage.getItem('pass');
    const { ebeln } = props;
    await fetch(API_RELEASE_EBELN, {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ebeln: ebeln,
            username: user,
            pass: pass
        })
    }).then(res => res.json()).then(res => {
        if (res.RETURN.TYPE === "S") {
            result = {
                type: 'S',
            }
        } else {
            result = {
                type: 'W',
                warning: res.RETURN.MESSAGE
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