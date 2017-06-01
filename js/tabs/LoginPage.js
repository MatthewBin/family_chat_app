/**
 * Created by maxiaobin on 17/5/4.
 * @providesModule LoginPage
 */

'use strict'

import React, {
    Component
} from 'react';
import {
    View,
    Text,
    Image,
    Platform,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    ToastAndroid,
    DeviceEventEmitter
} from 'react-native';
import {GlobalStyle} from 'GlobalStyle';
import CommonButton from 'CommonButton';
import CommonTextInput from 'CommonTextInput';
import * as Utils from 'Utils';

export default class LoginPage extends Component {
    static navigationOptions = {
        // title:"登录",
        header: (navigation) => {
            return <Text>登录</Text>;
        }
    }

    constructor(props) {
        super(props);
        this.state={
            username:'1',
            pwd:'1'
        };
    }

    render() {
        const {navigate} = this.props.navigation;
        const {username,pwd}=this.state;
        return (
            <View>
                <View
                    style={[GlobalStyle.textInputContainer, { flexDirection: 'column',height: 130, paddingHorizontal: 20, justifyContent: 'center'}]}>
                    <View style={{flexDirection: 'row',alignItems: 'center'}}>
                        <Text style={Styles.text}>账号：</Text>
                        <CommonTextInput
                            style={Styles.textInput}
                            onChangeText={username => this.setState({ username })}
                            keyboardType='phone-pad'
                            placeholder='请输入你的用户名'/>
                    </View>
                    <View style={Styles.separator}/>
                    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={Styles.text}>密码：</Text>
                        <CommonTextInput
                            style={Styles.textInput}
                            secureTextEntry
                            onChangeText={pwd => this.setState({ pwd })}
                            placeholder='请输入密码'/>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => global.RootNavigator.navigate('RegisterPage')}
                    style={{alignItems: 'center',marginTop: 5,paddingVertical: 10}}>
                    <Text style={Styles.agreement}>没有账号？点此注册</Text>
                </TouchableOpacity>
                <CommonButton
                    style={{ marginTop: 20 }}
                    enable={!!(username && pwd)}
                    text='登录'
                    onPress={this.login.bind(this)}/>
            </View>
        );
    }

    login(){
        let {username,pwd}=this.state;
        Utils.Utils.postFetch(global.family_url + 'user/login', {
            username,
            pwd,
            client:1
        }, (success) => {
            if(success.res_code==1){
                global.token = success.msg.token;
                global.userid = success.msg.user_id;
                global.RootNavigator.goBack();
                ToastAndroid.show('登录成功', ToastAndroid.SHORT);
                DeviceEventEmitter.emit('get_info',success.msg.token);
                return;
            }
            ToastAndroid.show(success.msg, ToastAndroid.SHORT);
        }, (err) => {
            ToastAndroid.show("登录异常", ToastAndroid.SHORT);
            console.log(err)
        });
    }
}

const Styles = StyleSheet.create({
    agreement: {
        fontFamily: 'PingFang SC',
        fontSize: 13,
        lineHeight: 18,
        color: '#858585'
    },
    separator: {
        alignSelf: 'stretch',
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#dce2ea',
        marginVertical: Platform.OS === 'android' ? 12 : 18
    },
    textInput: {
        marginLeft: -15
    },
    text: {
        marginTop: Platform.OS === 'android' ? -2 : 0,
        fontFamily: 'PingFang SC',
        fontSize: 18,
        lineHeight: 25,
        color: '#333333'
    }
});
