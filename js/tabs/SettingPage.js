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
    View
} from 'react-native';
import CommonButton from 'CommonButton';

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

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fafafa'}}>
                <Text>没有内容</Text>
                <View style={Styles.separator}/>
                <CommonButton
                    style={{
                        marginHorizontal: 15,
                        marginTop: 15
                    }}
                    text='退出当前帐号'
                    onPress={() => {
                        global.token='';
                        global.RootNavigator.navigate('JoinFamilyPage');
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