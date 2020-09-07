import AsyncStorage from "@react-native-community/async-storage";
import moment from 'moment';

import { API_CREATE_PO } from '../../../common/api';

export const createPo = async (props) => {
    let result = {};
    const user = await AsyncStorage.getItem('user');
    const pass = await AsyncStorage.getItem('pass');
    const { date, time, period } = props;
    const bedat = moment(moment('' + (date.replace(/\./g, '')), 'DDMMYYYY')).format('YYYYMMDD');
    const timef = time.split(":").join("");
    // console.log(time);
    await fetch(API_CREATE_PO, {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            bedat: bedat,
            timef: timef,
            period: period,
            username: user,
            pass: pass
        })
    }).then(res => res.json()).then(res => {
        if (res.RETURN.TYPE === 'S') {
            result = {
                type: 'S',
                warning: `Ngày: ${date}\nKỳ: ${period}\nThời gian: ${time}`
            }
        } else {
            result = {
                type: 'W',
                warning: 'Tài khoản không có quyền'
            }
        }
    }).catch(err => {
        result = {
            type: 'E',
            warning: 'Tạo chu kỳ giá thất bại'
        }
    })

    return result;
}