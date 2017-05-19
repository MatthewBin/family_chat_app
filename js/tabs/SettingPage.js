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
    Button,
    View
} from 'react-native';

export default class SettingPage extends Component {
    static navigationOptions = {
        title: '设置',
        header: (navigation) => {
            let tintColor = '#333333';
            let left = (<Button title='back' onPress={() => {
                navigation.goBack();
            }} />);
            let titleStyle = {
                fontSize: 16,
                fontWeight: 'normal',
            }
            let style = {
                backgroundColor: 'white',
            }
            return { tintColor, left, titleStyle, style }
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            cacheSize: 0,
            isAutoPlayOnlyInWifi: true
        };
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() {
        this.willUnmount = true;
    }

    setAutoPlay(value) {
        this.setState({ isAutoPlayOnlyInWifi: value });
    }

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#fafafa'
            }}>
                {
                    Platform.OS === 'ios' ?
                        <View style={Styles.separator} /> : null
                }
                <View style={[Styles.separator, { marginTop: 10 }]} />
                <View style={Styles.row}>
                    <Text style={Styles.rowTitle}>
                        仅在WIFI下自动播放视频
                    </Text>
                    <Switch
                        onValueChange={this.setAutoPlay}
                        value={this.state.isAutoPlayOnlyInWifi} />
                </View>
                <View style={[Styles.separator, { marginBottom: 10 }]} />
                <View style={Styles.separator} />
                <TouchableOpacity
                    style={Styles.row}
                    onPress={this.cleanCache}>
                    <Text style={Styles.rowTitle}>清除缓存</Text>
                    <Text style={Styles.rowValue}>{(this.state.cacheSize / 1024).toFixed(2) + ' Kb'}</Text>
                </TouchableOpacity>
                <View style={[Styles.separator, { marginBottom: 10 }]} />
                <View style={Styles.separator} />
                <View style={Styles.row}>
                    <Text style={Styles.rowTitle}>版本信息</Text>
                    <Text style={Styles.rowValue}>{this.version}</Text>
                </View>
                <View style={Styles.separator} />
                <Button
                    style={{
                        marginHorizontal: 15,
                        marginTop: 15
                    }}
                    title='退出当前帐号'
                    onPress={() => {}} />
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