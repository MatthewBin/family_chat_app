/**
 * Created by maxiaobin on 17/5/26.
 * @providesModule ChatGroup
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
import ChatNavigator from 'ChatNavigator';

export default class ChatGroup extends Component {
    static navigationOptions = {
        title:'Family Chat',
        drawerLabel: 'Family Chat'
    }

    componentDidMount(){
        if(!global.token){
            global.RootNavigator.navigate('LoginPage');
        }
        if (this.navigator) {
            global.SubNavigator = this.navigator._navigation;
        }
    }

    render() {
        return (
            <ChatNavigator ref={navigator => this.navigator = navigator}/>
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