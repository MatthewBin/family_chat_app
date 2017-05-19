/**
 * Created by maxiaobin on 17/5/19.
 * @providesModule GlobalStyle
 */
'use strict'

import React from 'react';

import {
    Platform,
    StyleSheet,
    Dimensions
} from 'react-native';

export const AccentColor = '#f06b1d';

export const { height, width } = Dimensions.get('window');

const ArrowHeight = 8;

export const GlobalStyle = StyleSheet.create({
    //隐藏
    hidden: {
        width: 0,
        height: 0,
    },
    //普通页面
    commonPage: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
    //分割线
    splitLine: {
        height: 1,
        alignItems: 'stretch',
        backgroundColor: '#D9E1E9',
    },
    //垂直分割线
    splitLineVertical: {
        width: 1,
        alignItems: 'stretch',
        backgroundColor: '#D9E1E9',
    },
    //icon字体
    iconFontFamily: {
        // fontFamily: "dscj-appfont",
    },
    textInputContainer: {
        height: 65,
        paddingVertical: 12,
        borderRadius: 5,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: ArrowHeight,
        borderRightWidth: ArrowHeight,
        borderBottomWidth: ArrowHeight,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'white'
    }
});
