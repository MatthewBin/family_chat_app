/**
 * Created by maxiaobin on 17/5/4.
 * @providesModule JoinFamilyPage
 */

'use strict'

import React, {Component}from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    NetInfo,
    ToastAndroid
}from 'react-native';
import * as Utils from 'Utils';

const ips = [
    // '192.168.1.100',
    // '192.168.1.101',
    // '192.168.1.102',
    // '192.168.1.103',
    '192.168.1.104',
    '192.168.1.24',
    '192.168.1.23',
    // '192.168.1.105',
    // '192.168.1.106',
    // '192.168.1.107',
    // '192.168.1.108',
    // '192.168.1.109',
    // '192.168.1.110'
];

export default class JoinFamilyPage extends Component{
    static navigationOptions = {
        title:'网络连接',
    }

    constructor(props) {
        super(props);
        this.state = {
            isConnected: null,
            connectionInfo: null,
            isConnectionExpensive:null,
            server:'- - - -',
            address:'- - - -',
            connect_log:null
        };
    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener(
            'change',
            this._handleConnectivityChange.bind(this)
        );
        //检测网络是否连接
        NetInfo.isConnected.fetch().done(
            (isConnected) => {
                this.setState({isConnected});
            }
        );
        //检测网络连接信息
        NetInfo.fetch().done(
            (connectionInfo) => {
                this.setState({connectionInfo});
            }
        );
        let try_count=0;
        if(!global.family_url ){
            let connect_handle = setInterval(function () {
                let index = (try_count)%ips.length;
                this.setState({
                    address: ips[try_count],
                    connect_log: '正在连接...'
                });
                Utils.Utils.postFetch('http://'+ips[index] + ':8675/connect',{},(success)=>{
                    clearInterval(connect_handle);
                    this.setState({
                        server:ips[index],
                        connect_log: '成功!'
                    });
                    global.family_url = 'http://'+ips[index] + ':8675/';
                    global.RootNavigator.navigate('LoginPage');
                    // global.RootNavigator.navigate('RegisterPage');
                },(err)=>{

                });
                try_count++;
            }.bind(this),500);
        }
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener(
            'change',
            this._handleConnectivityChange
        );
    }

    _handleConnectivityChange(isConnected) {
        ToastAndroid.show((isConnected ? 'online' : 'offline'), ToastAndroid.SHORT);
        this.setState({
            isConnectionExpensive:NetInfo.isConnectionExpensive,
            isConnected:isConnected,
        });
        //检测网络连接信息
        NetInfo.fetch().done(
            (connectionInfo) => {
                this.setState({connectionInfo});
            }
        );
    }

    render() {
        return (
            <View style={[styles.container]}>
                <Text style={[styles.text1,{fontSize:30,textAlign:'center'}]}>FamilyStorage</Text>

                <View style={[styles.block]}>
                    <Text style={styles.text1}>
                        服务器地址：<Text style={styles.text2}>{this.state.server}</Text>
                    </Text>
                    <Text style={styles.text1}>
                        尝试连接：<Text style={styles.text2}>{this.state.address}</Text>
                    </Text>
                    <Text style={styles.text1}>
                        连接状态：<Text style={styles.text2}>{this.state.connect_log}</Text>
                    </Text>
                </View>

                <View style={[styles.block]}>
                    <Text style={styles.text1}>
                        网络状态：<Text style={styles.text2}>{this.state.isConnected ? '网络在线' : '离线'}</Text>
                    </Text>
                    <Text style={styles.text1}>
                        连接类型：<Text style={styles.text2}>{this.state.connectionInfo}</Text>
                    </Text>
                    <Text style={styles.text1}>
                        是否计费：<Text style={styles.text2}>{this.state.isConnectionExpensive === true ? '需要计费' : '不计费'}</Text>
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop:20,
        flex: 1,
        alignItems:'center',
        backgroundColor: '#222',
    },
    block: {
        padding:20,
        alignItems: 'flex-start'
    },
    text1:{
        fontSize:18,
        color:'#EB0',
    },
    text2:{
        fontSize:18,
        color:'#61B2A7',
    },
    iconStyle: {
        color: '#fff',
        fontFamily: 'iconfont',
        fontSize: 50
    }
});