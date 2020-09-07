import { API_LOGIN } from '../../common/api';

export const checkLogin = async ({ username, password }) => {
    let result = {};
    await fetch(API_LOGIN, {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            pass: password,
        }),
    }).then(res => res.json()).then(async (res) => {
        console.log(res);
        if (res.success === "true") {
            result = {
                type: 'S',
                warning: '',
            }
        } else {
            const messageError = res.msg;
            if (messageError.includes("Name or password is incorrect")) {
                result = {
                    type: 'W',
                    warning: 'Tài khoản hoặc mật khẩu không chính xác',
                }
            }
            else if (messageError.includes("User is locked")) {
                result = {
                    type: 'W',
                    warning: 'Tài khoản đã bị khóa',
                }
            }
            else
                result = {
                    type: 'W',
                    warning: messageError,
                }
        }
    }).catch((error) => {
        console.log(error);
        let myError = new Error(error);
        let messageError = myError.message;
        if (messageError.includes("Network request failed")) {
            result = {
                type: 'E',
                warning: 'Lỗi kết nối, kiểm tra đường truyền',
            }
        } else
            result = {
                type: 'E',
                warning: 'Có lỗi xảy ra, vui lòng thử lại',
            }
    })

    return result;
}