/**
 * Created by maxiaobin on 17/5/19.
 * @providesModule CommonTextInput
 */

'use strict'

import React, {
    Component,
    PropTypes
} from 'react';

import {
    Platform,
    Text,
    TextInput
} from 'react-native';

export default class CommonTextInput extends Component {
    render() {
        const {onFocus, style, onChangeText, maxLength, secureTextEntry, placeholder, keyboardType} = this.props;
        return (
            <TextInput
                secureTextEntry={secureTextEntry}
                placeholderTextColor="#8a909f"
                onChangeText={onChangeText}
                maxLength={maxLength}
                keyboardType={keyboardType}
                onFocus={onFocus}
                underlineColorAndroid='transparent'
                style={[{
          flex: 1,
          alignSelf: 'stretch',
          fontFamily: 'PingFang SC',
          paddingHorizontal: 20,
          marginVertical: Platform.OS === 'android' ? 0 : 0,
          fontSize: 16,
          lineHeight: 23,
          letterSpacing: 1,
          color: '#333333'
        }, style]}
                autoCapitalize='none'
                autoCorrect={false}
                placeholder={placeholder}/>
        );
    }
}

CommonTextInput.propTypes = {
    onFocus: PropTypes.func,
    style: Text.propTypes.style,
    onChangeText: PropTypes.func,
    maxLength: PropTypes.number,
    secureTextEntry: PropTypes.bool,
    placeholder: PropTypes.string,
    keyboardType: PropTypes.oneOf(['phone-pad', 'default'])
}

CommonTextInput.defaultProps = {
    maxLength: 20,
    keyboardType: 'default'
}