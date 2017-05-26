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
        const { style, textStyle, disableStyle, disableTextStyle, enable, text, onPress } = this.props;
        const currentStyle = enable ? [DefaultButtonStyle, style] : [DefaultButtonStyle, style, disableStyle];
        const currentTextStyle = enable ? [DefaultTextStyle, textStyle] : [DefaultTextStyle, textStyle, disableTextStyle];
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

const DefaultButtonStyle = {
    height: 43,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#f06b1d',
    borderRadius: 5,
    backgroundColor: 'rgba(240,107,29,0.8)',
    justifyContent: 'center',
    alignItems: 'center'
}

const DefaultTextStyle = {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 18,
    color: 'white',
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