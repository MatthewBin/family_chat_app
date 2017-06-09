/**
 * Created by maxiaobin on 17/5/4.
 * @providesModule SettingPage
 */

'use strict'

import React, {
    Component
} from 'react';

import {
    AsyncStorage,
    InteractionManager,
    Platform,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
    Image
} from 'react-native';
import CommonButton from 'CommonButton';
import Nothing from '../nothing.png';

export default class SettingPage extends Component {
    static navigationOptions = {
        drawerLabel: '设置',
        // drawerIcon: ({ tintColor }) => (
        //     <Text style={[styles.icon, {tintColor: tintColor}]}
        //     >b</Text>
        // ),
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fafafa'}}>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <Image style={{width:80,height:80,marginVertical:80}} source={Nothing}/>
                </View>
                <View style={Styles.separator}/>
                <CommonButton
                    style={{
                        marginHorizontal: 15,
                        marginTop: 15
                    }}
                    text='退出当前帐号'
                    onPress={() => {
                        global.token='';
                        global.RootNavigator.goBack();
                    }}/>
            </View>
        );
    }
}

const Styles = StyleSheet.create({
    row: {
        backgroundColor: 'white',
        flexDirection: 'row',
        height: 60,
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        alignItems: 'center'
    },
    rowTitle: {
        fontFamily: 'PingFang SC',
        fontSize: 16,
        lineHeight: 23,
        letterSpacing: 1,
        color: '#333333'
    },
    rowValue: {
        fontFamily: 'PingFang SC',
        fontSize: 16,
        lineHeight: 23,
        letterSpacing: 1,
        color: '#8a909f'
    },
    separator: {
        alignSelf: 'stretch',
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#e5e7eb'
    }
});