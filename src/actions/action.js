//actions.js

import * as types from './types';

export function increment() {
    return {
        type: types.INCREMENT
    };
}

export function decrement() {
    return {
        type: types.DECREMENT
    };
}


// 模拟服务器返回的用户信息
let user = {
    'name': 'admin',
    'age': '24'
}

// 执行登录
export function doLogin() {
    return dispatch =>{
        dispatch(isLogining());
        // 模拟用户登录
        let result = fetch('https://github.com/').then((res) =>{
                dispatch(loginSuccess(true, user));
    }).catch((e) =>{
            dispatch(loginSuccess(false, null));
    });
    }
}

// 正在登录
function isLogining() {
    return {
        type: types.LOGIN_IN_DOING
    }
}

// 登录完成
function loginSuccess(isSuccess, user) {
    return {
        type: types.LOGIN_IN_DONE,
        isSuccess: isSuccess,
        user: user
    }
}
