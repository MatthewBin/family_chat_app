/**
 * Created by maxiaobin on 17/5/27.
 */
/**
 * Created by maxiaobin on 17/5/26.
 * @providesModule MsgPage
 */
'use strict'

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Alert
} from 'react-native';

export default class MsgPage extends Component {
    static navigationOptions = {
        tabBarLabel: '消息',
        tabBarIcon: ({tintColor}) => (
            <Text style={[styles.iconStyle,{color:tintColor,fontSize:20}]}>&#xe606;</Text>),
        drawerLabel: '消息'
    }

    componentDidMount(){
        if(!global.token){
            global.RootNavigator.navigate('LoginPage');
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit index.ios.js
                </Text>
                <Text style={styles.instructions}>
                    Press Cmd+R to reload,{'\n'}
                    Cmd+D or shake for dev menu
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});