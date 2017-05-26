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
import ChatPage from 'ChatPage';
import WhatYouDoPage from 'WhatYouDoPage';

export const ChatNavigator = TabNavigator({
    FriendPage: {
        screen: FriendPage
    },
    ChatPage: {
        screen: ChatPage
    },
    WhatYouDoPage: {
        screen: WhatYouDoPage
    }
}, {
    ...TabNavigator.Presets.iOSBottomTabs,
    initialRouteName: 'FriendPage',
    headerMode: 'screen',
    tabBarOptions: {
        activeTintColor: '#fc0',
        activeBackgroundColor: '#000',
        inactiveTintColor: '#fff',
        inactiveBackgroundColor: '#000',
    }
});


export const FriendNavigator = DrawerNavigator({
    ChatNavigator: {
        screen: ChatNavigator
    },
    SettingPage: {
        screen: SettingPage
    },
    PersonalInfoPage: {
        screen: PersonalInfoPage
    }
}, {
    initialRouteName: 'ChatNavigator',
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
