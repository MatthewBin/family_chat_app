/**
 * Created by maxiaobin on 17/5/4.
 * @providesModule Router
 */

'use strict'

import {
    Platform,
} from 'react-native';

import {StackNavigator, DrawerNavigator, TabNavigator, TabView} from 'react-navigation';

import SettingPage from 'SettingPage';
import FriendPage from 'FriendPage';
import JoinFamilyPage from 'JoinFamilyPage';
import LoginPage from 'LoginPage';
import RegisterPage from 'RegisterPage';
import PersonalInfoPage from 'PersonalInfoPage';

export const FriendNavigator = DrawerNavigator({
    FriendPage: {
        screen: FriendPage
    },
    SettingPage: {
        screen: SettingPage
    },
    PersonalInfoPage: {
        screen: PersonalInfoPage
    }
}, {
    initialRouteName: 'PersonalInfoPage',
    headerMode: 'screen',
    drawerWidth: 200,
    drawerPosition: 'left'
});


export const MainNavigator = StackNavigator({
    JoinFamilyPage: {
        screen: JoinFamilyPage
    },
    RegisterPage: {
        screen: RegisterPage
    },
    LoginPage: {
        screen: LoginPage
    },
    FriendNavigator: {
        screen: FriendNavigator
    },
}, {
    initialRouteName: 'JoinFamilyPage',
    headerMode: 'none',
});
