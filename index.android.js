/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Alert,
    Keyboard,
    Platform,
    BackHandler,
    ToastAndroid
} from 'react-native';
import {
    MainNavigator
} from 'Router';
import * as Utils from 'Utils';

import SettingPage from 'SettingPage';
import FriendPage from 'FriendPage';
import JoinFamilyPage from 'JoinFamilyPage';
import LoginPage from 'LoginPage';
var canExitApp=false;
export default class family_chat_app extends Component {
    componentWillMount() {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
        }
    }

    componentDidMount() {
        if (this.navigator) {
            global.RootNavigator = this.navigator._navigation;
        }
    }

    onBackAndroid() {
        console.log('--- back ---')
        if (canExitApp) {
            BackHandler.exitApp();
        } else {
            canExitApp = true;
            setTimeout(() => {
                canExitApp = false;
            }, 3000);
            ToastAndroid.show('再按一次退出', ToastAndroid.SHORT);
        }
        return true;
    }


    render() {
        return (
            // <JoinFamilyPage/>
            <MainNavigator ref={navigator => this.navigator = navigator}
                           onNavigationStateChange={(prevState, currentState) => {
                                  const currentScreen = Utils.getCurrentRouteName(currentState);
                                  const prevScreen = Utils.getCurrentRouteName(prevState);
                                  global.currentScrern = currentScreen;
                                  console.log(currentScreen)
                              }}/>
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

AppRegistry.registerComponent('family_chat_app', () => family_chat_app);
