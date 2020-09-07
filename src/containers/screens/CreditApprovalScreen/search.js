import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';

import { API_VBELNS } from '../../../common/api';

export const search = async ({ fromDate, toDate, fromBukrs, toBukrs, vbeln, i_skunnr, i_mkunnr }) => {
    let result = {};
    const user = await AsyncStorage.getItem('user');
    const pass = await AsyncStorage.getItem('pass');
    if (vbeln == '') {
        const i_sKunnr = i_skunnr;//singer
        const i_mKunnr = i_mkunnr;//multi
        const frombukrs = fromBukrs;
        const tobukrs = toBukrs;
        const todate = moment(moment('' + (toDate.replace(/\./g, '')), 'DDMMYYYY')).format('YYYYMMDD');
        const fromdate = moment(moment('' + (fromDate.replace(/\./g, '')), 'DDMMYYYY')).format('YYYYMMDD');
        await fetch(API_VBELNS, {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sKunnr: i_sKunnr,
                mKunnr: i_mKunnr,
                frombukrs: frombukrs,
                tobukrs: tobukrs,
                todate: todate,
                fromdate: fromdate,
                username: user,
                pass: pass
            })
        }).then(res => res.json()).then(res => {
            console.log(res);
            if (res.NOT_AUTH.length !== 0) {
                result = {
                    resultCredit: [],
                    warning: 'Tài khoản không có quyền: ' + res.NOT_AUTH.join(', ')
                }
            }
            else if (res.DATA.length === 0) {
                result = {
                    resultCredit: [],
                    warning: 'Không tìm thấy kết quả phù hợp'
                }
            }
            else {
                result = {
                    resultCredit: res.DATA.map((props) => ({ ...props, checked: false })),
                    warning: ''
                };
            }
        }).catch(err => {
            console.log(err);
            result = {
                resultCredit: [],
                warning: 'Có lỗi xảy ra, Vui lòng thử lại'
            };
        })
    } else {
        await fetch(API_VBELNS, {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                vbeln: vbeln,
                username: user,
                pass: pass
            })
        }).then(res => res.json()).then(res => {
            if (res.NOT_AUTH.length !== 0) {
                result = {
                    resultCredit: [],
                    warning: 'Tài khoản không có quyền: ' + res.NOT_AUTH.join(', ')
                }
            }
            else if (res.DATA.length === 0) {
                result = {
                    resultCredit: [],
                    warning: 'Không tìm thấy kết quả phù hợp'
                }
            }
            else {
                result = {
                    resultCredit: res.DATA.map((props) => ({ ...props, checked: false })),
                    warning: ''
                };
            }
        }).catch(err => {
            console.log(err)
            result = {
                resultCredit: [],
                warning: 'Có lỗi xảy ra, Vui lòng thử lại'
            };
        })

    };

    return result;
}