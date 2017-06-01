/**
 * Created by maxiaobin on 17/5/27.
 * @providesModule Socket
 */

'use strict'

import io from 'socket.io-client'
import * as Utils from 'Utils';
import {
    Alert,
    DeviceEventEmitter,
    ToastAndroid
}from 'react-native';

export const socket = io('http://192.168.1.23:9521', {
    transports: ['websocket'],
    // reconnectionDelay: 1000,
    // reconnectionDelayMax: 5000,
    // timeout: 5000
});

socket.on('connect', function () {
    socket.emit('someone_conn', "ready to connect...");
});

socket.on('notify', function (msg) {
    DeviceEventEmitter.emit('notify', msg);
    ToastAndroid.show(msg, ToastAndroid.SHORT);
});

DeviceEventEmitter.addListener('get_info', (token) => {
    Utils.Utils.postFetch(global.family_url + 'user/user_info', {
        token: token
    }, (success) => {
        if (success.res_code == 1) {
            global.head_img = success.msg.head_img;
            global.nickname = success.msg.nickname;
            global.description = success.msg.description;

        }
        socket.emit('online', {
            user_id: global.userid,
            nickname: global.nickname
        })
    }, (err) => {

    });
});