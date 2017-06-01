/**
 * Created by maxiaobin on 17/5/3.
 * @providesModule Utils
 */
'use strict'
const Utils = {};


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

export function dateFormat(input) {
    let date = new Date(input);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}

export function dateFilter(input) {
    if (input == undefined || input === '') {
        return "";
    }
    var mSec_timestamp = (Date.parse(new Date()) - Date.parse(input)) / 1000;
    if (mSec_timestamp < 3600) {
        return "1小时之内"
    } else if (mSec_timestamp > 3600 && mSec_timestamp < 3600 * 2) {
        return "1小时之前"
    } else if (mSec_timestamp > 3600 * 2 && mSec_timestamp < 3600 * 3) {
        return "2小时之前"
    } else if (mSec_timestamp > 3600 * 3 && mSec_timestamp < 3600 * 24) {
        return "24小时之内"
    } else if (mSec_timestamp > 3600 * 24 && mSec_timestamp < 3600 * 24 * 2) {
        return "1天之前"
    } else if (mSec_timestamp > 3600 * 24 * 2 && mSec_timestamp < 3600 * 24 * 7) {
        return "1周之内"
    } else if (mSec_timestamp > 3600 * 24 * 7 && mSec_timestamp < 3600 * 24 * 14) {
        return "1周之前"
    } else {
        var date = new Date(input);
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    }
}

export {Utils};