import AsyncStorage from '@react-native-community/async-storage';

import {
    API_COMPANYCODE,
    API_PLANTCODE,
    API_PRODUCTCODE,
    API_USERNAME,
    API_USERDETAIL
} from '../../common/api';

export const getData = async (props) => {
    const { username, password } = props;
    //Mã công ty
    await fetch(API_COMPANYCODE, {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            pass: password
        })
    }).then(res => res.json()).then(async (res) => {
        // console.log(res);
        await AsyncStorage.setItem('listCompanyCode', JSON.stringify(res.DATA.map(({ NAME }) => ({ name: NAME }))));
    }).catch(err => console.log(err));
    //Mã kho
    await fetch(API_PLANTCODE, {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            pass: password
        })
    }).then(res => res.json()).then(async (res) => {
        await AsyncStorage.setItem('listPlantCode', JSON.stringify(res.DATA.map(({ NAME }) => ({ name: NAME }))));
    }).catch(err => console.log(err));
    //Mã mặt hàng
    await fetch(API_PRODUCTCODE, {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            pass: password
        })
    }).then(res => res.json()).then(async (res) => {
        await AsyncStorage.setItem('listItemCode', JSON.stringify(res.DATA.map(({ NAME }) => ({ name: NAME }))));
    }).catch(err => console.log(err));
    //Tên tài khoản
    await fetch(API_USERNAME, {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            pass: password
        })
    }).then(res => res.json()).then(async (res) => {
        await AsyncStorage.setItem('listUserName', JSON.stringify(res.DATA.map(({ NAME }) => ({ name: NAME }))));
    }).catch(err => console.log(err));
    //Thông tin user
    await fetch(API_USERDETAIL, {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: username,
            username: username,
            pass: password
        })
    }).then(res => res.json()).then(async (res) => {
        await AsyncStorage.setItem('userAuth', JSON.stringify(res.E_AUTH));
        await AsyncStorage.setItem('userDetail', JSON.stringify(res.DATA[0]));
    }).catch(err => console.log(err))
}