/**
 * Created by maxiaobin on 17/5/27.
 * @providesModule Socket
 */

'use strict'

import io from 'socket.io-client'

export const socket = io('http://192.168.1.23:9521', {
    transports: ['websocket'],
    reconnectionDelay:1000,
    reconnectionDelayMax:5000,
    timeout:10000
});

socket.on('connect', function () {
    socket.emit('test', "Real time baby  ")
});
