/**
 * Created by maxiaobin on 17/5/3.
 * @providesModule Utils
 */
'use strict'

global.Buffer = global.Buffer || require('buffer').Buffer;
var dgram = require('react-native-udp')
var socket = dgram.createSocket('udp4')
socket.bind(5555)
socket.once('listening', function () {

    var uint = [];
    var str = JSON.stringify({
        type:0
    });
    for (var i = 0, l = str.length; i < l; i++){
        uint[i] = str.charCodeAt(i);
    }

    socket.send(uint, 0, uint.length, 8677, '192.168.1.23', function(err) {
        if (err) throw err
        console.log('message was sent')
    })
}.bind(this))

global.socket = socket;

socket.on('message', function (msg, rinfo) {
    console.log(msg)
    // msg = JSON.stringify();
    console.log(msg.toString())
    console.log('message was received',msg.content)
})