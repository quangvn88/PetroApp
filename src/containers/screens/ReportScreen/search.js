import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';

import { API_GET_QUANTITY_REVENUE } from '../../../common/api';

export const search = async (props) => {
    let result = {};
    const user = await AsyncStorage.getItem('user');
    const pass = await AsyncStorage.getItem('pass');
    const { fromBukrs, toBukrs, fromItem, toItem, fromDate, toDate, bukrs, matnr } = props;
    const todate = moment(moment('' + (toDate.replace(/\./g, '')), 'DDMMYYYY')).format('YYYYMMDD');
    const fromdate = moment(moment('' + (fromDate.replace(/\./g, '')), 'DDMMYYYY')).format('YYYYMMDD');
    await fetch(API_GET_QUANTITY_REVENUE, {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            bukrs: bukrs,
            matnr: matnr,
            frombukrs: fromBukrs,
            tobukrs: toBukrs,
            fromitem: fromItem,
            toitem: toItem,
            fromdate: fromdate,
            todate: todate,
            username: user,
            pass: pass
        })
    }).then(res => res.json()).then(res => {
        // console.log(res);
        if (res.DATA) {
            if (res.NOT_AUTH.length !== 0) {
                result = {
                    resultReport: {},
                    warning: 'Tài khoản không có quyền: ' + res.NOT_AUTH.join(', ')
                }
            }
            else if (res.DATA.length === 0)
                result = {
                    resultReport: {},
                    warning: 'Không tìm thấy kết quả phù hợp'
                }
            else
                result = {
                    resultReport: res,
                    warning: ''
                }
        }
        else {
            result = {
                resultReport: {},
                warning: ''
            }
        }
    }).catch(err => {
        console.log(err);
        result = {
            resultReport: {},
            warning: 'Có lỗi xảy ra, Vui lòng thử lại'
        }
    })

    return result;
}