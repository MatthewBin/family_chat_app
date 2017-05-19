/**
 * Created by maxiaobin on 17/5/19.
 * @providesModule RegisterPage
 */
'use strict'

import React, {
    Component
} from 'react';

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Button
} from 'react-native';

import {AccentColor, GlobalStyle} from 'GlobalStyle';
import CommonTextInput from 'CommonTextInput';
import CommonButton from 'CommonButton';

export default class RegisterPage extends Component {
    static navigationOptions = {
        title: '注册'
    }

    constructor(props) {
        super(props);
        this.state = {
            username:null,
            email: null,
            code: null,
            pwd: null,
            confirm_pwd: null
        };
    }

    componentWillReceiveProps(nextProps) {

    }

    register() {
        if (this.state.pwd !== this.state.confirm_pwd) {
            // TODO modal
            return;
        }
        // TODO register
    }

    render() {
        const {username, email, code, pwd, confirm_pwd} = this.state;
        return (
            <View style={[GlobalStyle.commonPage,
			{
				paddingVertical: 40,
				paddingHorizontal: 10
			}]}>
                <View style={[GlobalStyle.textInputContainer, {
					flexDirection: 'column',
					height: 250
				}]}>
                    <CommonTextInput
                        onChangeText={username => this.setState({ username })}
                        keyboardType='phone-pad'
                        placeholder='请输入你的账号'/>
                    <View style={Styles.separator}/>
                    <CommonTextInput
                        onChangeText={email => this.setState({ email })}
                        placeholder='请输入你的邮箱'/>
                    <View style={Styles.separator}/>
                    <CommonTextInput
                        onChangeText={code => this.setState({ code })}
                        placeholder='请输入注册码'/>
                    <View style={Styles.separator}/>
                    <CommonTextInput
                        secureTextEntry
                        onChangeText={pwd => this.setState({ pwd })}
                        placeholder='请输入6-20位字符数字密码'/>
                    <View style={Styles.separator}/>
                    <CommonTextInput
                        secureTextEntry
                        onChangeText={confirm_pwd => this.setState({ confirm_pwd })}
                        placeholder='请再次输入密码'/>
                </View>
                <CommonButton
                    style={{ marginTop: 25 }}
                    enable={!!(username && pwd && confirm_pwd && code && email)}
                    text='确认'
                    onPress={this.register.bind(this)}/>
            </View>
        );
    }
}

const Gray = '#858585';

const Styles = StyleSheet.create({
    agreement: {
        fontFamily: 'PingFang SC',
        fontSize: 13,
        lineHeight: 18,
        color: Gray
    },
    separator: {
        alignSelf: 'stretch',
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#dce2ea',
        marginVertical: 10,
        marginHorizontal: 20
    },
    sendSmsCodeButtonText: {
        fontFamily: 'PingFang SC',
        fontSize: 16,
        lineHeight: 23,
        color: Gray
    }
});