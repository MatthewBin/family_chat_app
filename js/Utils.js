/**
 * Created by maxiaobin on 17/5/3.
 * @providesModule Utils
 */
'use strict'
const Utils = {};

import io from 'socket.io-client'

const socket = io('http://192.168.1.23:9521', {
    transports: ['websocket'],
    reconnectionDelay:1000,
    reconnectionDelayMax:5000,
    timeout:10000
});

socket.on('connect', function () {
    socket.emit('test', "Real time baby  ")
});

Utils.postFetch = function (url, body, successCallback, errorCallback) {
    if (!url || !body) {
        if (errorCallback) {
            errorCallback("body或url为空");
        }
        return;
    }

    let initpara = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    };

    fetch(url, initpara)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw response;
            }
        }).then((responseJson) => {
        if (successCallback) {
            successCallback(responseJson);
        }
    }).catch((error) => {
        if (errorCallback) {
            errorCallback(error);
        }
    });

};

export function getCurrentRouteName(navigationState) {
    if (!navigationState) {
        return null;
    }
    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
        return getCurrentRouteName(route);
    }
    return route.routeName;
}

export function dateFormat(date, fmt) {
    var o = {
        "M+": date.getMonth() + 1,                 //月份
        "d+": date.getDate(),                    //日
        "h+": date.getHours(),                   //小时
        "m+": date.getMinutes(),                 //分
        "s+": date.getSeconds(),                 //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

export {Utils};