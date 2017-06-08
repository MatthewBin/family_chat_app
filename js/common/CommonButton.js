/**
 * Created by maxiaobin on 17/5/19.
 * @providesModule CommonButton
 */

'use strict'

import React, {
    Component,
    PropTypes
} from 'react';

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default class CommonButton extends Component {
    render() {
        const { style, textStyle, disableStyle, disableTextStyle, enable, text, onPress,is_simple } = this.props;

        if(is_simple){
            const currentStyle = enable ? [DefaultSimpleButtonStyle, style] : [DefaultSimpleButtonStyle, style, disableStyle];
            const currentTextStyle = enable ? [DefaultSimpleTextStyle, textStyle] : [DefaultSimpleTextStyle, textStyle, {color: '#fff'}];
            return (
                <TouchableOpacity
                    activeOpacity={enable ? 0.2 : 1}
                    onPress={enable ?onPress:()=>{}}
                    style={currentStyle}>
                    <Text style={currentTextStyle}>
                        {text}
                    </Text>
                </TouchableOpacity>
            );
        }else {
            const currentStyle = enable ? [DefaultButtonStyle, style] : [DefaultButtonStyle, style, disableStyle];
            const currentTextStyle = enable ? [DefaultTextStyle, textStyle] : [DefaultTextStyle, textStyle,disableTextStyle];
            return (
                <TouchableOpacity
                    activeOpacity={enable ? 0.2 : 1}
                    onPress={enable ?onPress:()=>{}}
                    style={currentStyle}>
                    <Text style={currentTextStyle}>
                        {text}
                    </Text>
                </TouchableOpacity>
            );
        }
    }
}

const DefaultButtonStyle = {
    height: 43,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#13b7f6',
    borderRadius: 5,
    backgroundColor: '#13b7f6',
    justifyContent: 'center',
    alignItems: 'center'
}

const DefaultSimpleButtonStyle = {
    height: 43,
    borderWidth: 2,
    borderColor: '#13b7f6',
    borderRadius: 5,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
}

const DefaultTextStyle = {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 18,
    color: 'white',
}

const DefaultSimpleTextStyle = {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 18,
    color: '#13b7f6',
}

CommonButton.propTypes = {
    style: View.propTypes.style,
    textStyle: Text.propTypes.style,
    disableStyle: View.propTypes.style,
    disableTextStyle: Text.propTypes.style,
    enable: PropTypes.bool,
    text: PropTypes.string,
    onPress: PropTypes.func
}

CommonButton.defaultProps = {
    enable: true,
    disableStyle: {
        height: 43,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#b2b2b2',
        borderRadius: 5,
        backgroundColor: '#b2b2b2',
        justifyContent: 'center',
        alignItems: 'center'
    }
}