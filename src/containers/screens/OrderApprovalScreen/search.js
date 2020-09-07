import moment from 'moment';
import AsyncStorage from "@react-native-community/async-storage";

import { API_EBELNS } from '../../../common/api';

export const search = async (props) => {
    let result = {};
    const user = await AsyncStorage.getItem('user');
    const pass = await AsyncStorage.getItem('pass');
    const { fromDate, toDate, fromBukrs, toBukrs, ebeln } = props;
    if (ebeln == '') {
        const todate = moment(moment('' + (toDate.replace(/\./g, '')), 'DDMMYYYY')).format('YYYYMMDD');
        const fromdate = moment(moment('' + (fromDate.replace(/\./g, '')), 'DDMMYYYY')).format('YYYYMMDD');
        await fetch(API_EBELNS, {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                frombukrs: fromBukrs,
                tobukrs: toBukrs,
                todate: todate,
                fromdate: fromdate,
                username: user,
                pass: pass
            })
        }).then(res => res.json()).then(res => {

            if (res.DATA.length != 0) {
                result = {
                    resultOrder: res.DATA,
                    warning: ''
                };
            }
            else {
                result = {
                    resultOrder: [],
                    warning: 'Không tìm thấy kết quả phù hợp'
                };
            }
        }).catch(err => {
            console.log(err);
            result = {
                resultOrder: [],
                warning: 'Có lỗi xảy ra, Vui lòng thử lại'
            };
        })
    } else {
        await fetch(API_EBELNS, {
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
            if (res.DATA.length != 0) {
                result = {
                    resultOrder: res.DATA,
                    warning: ''
                };
            }
            else {
                result = {
                    resultOrder: [],
                    warning: 'Không tìm thấy kết quả phù hợp'
                };
            }
        }).catch(err => {
            result = {
                resultOrder: [],
                warning: 'Có lỗi xảy ra, Vui lòng thử lại'
            };
        })

    };

    return result;
}