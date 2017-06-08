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
import MsgPage from 'MsgPage';
import WhatYouDoPage from 'WhatYouDoPage';

// 主要Tab导航
export const ChatNavigator = TabNavigator({
    FriendPage: {
        screen: FriendPage
    },
    MsgPage: {
        screen: MsgPage
    },
    WhatYouDoPage: {
        screen: WhatYouDoPage
    }
}, {
    ...TabNavigator.Presets.iOSBottomTabs,
    initialRouteName: 'FriendPage',
    headerMode: 'screen',
    tabBarOptions: {
        activeTintColor: '#13b7f6',
        activeBackgroundColor: '#fff',
        inactiveTintColor: '#999',
        inactiveBackgroundColor: '#fff',
        labelStyle: {
            fontSize: 16,
        },
        style: {
            height: 60,
        },
    }
});

// 侧边导航
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

// 主要登录导航
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
    ChatPage:{
        screen:ChatPage
    }
}, {
    initialRouteName: 'JoinFamilyPage',
    headerMode: 'none',
});

