/**
 * Created by maxiaobin on 17/5/19.
 * @providesModule PersonalInfoPage
 */

'use strict'

import React, {
    Component
} from 'react';
import {
    View,
    Text,
    Image,
    Platform,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    DatePickerAndroid,
    DatePickerIOS,
    Alert,
    ToastAndroid
} from 'react-native';

import {GlobalStyle} from 'GlobalStyle';
import ImagePicker from 'react-native-image-picker';
import CommonButton from 'CommonButton';
import * as Utils from 'Utils';

export default class PersonalInfoPage extends Component {
    // 导航的头
    static navigationOptions = {
        drawerLabel: '个人信息',
        // drawerIcon: ({ tintColor }) => (
        //     <Text style={[styles.icon, {tintColor: tintColor}]}
        //     >c</Text>
        // ),
    }

    constructor(props) {
        super(props);
        this.state = {
            head_img: {uri: 'data:image/jpeg;base64,' + '', isStatic: true},
            nickname: "",
            description: ""
        };
    }

    componentDidMount() {
        this.setState ({
            head_img: global.head_img,
            nickname: global.nickname,
            description: global.description
        });
    }

    render() {
        return (
            <View style={[GlobalStyle.commonPage]}>
                <View style={[Styles.separator,{marginTop:20}]}/>
                <TouchableOpacity activeOpacity={1} style={[Styles.row,{height:80}]}
                                  onPress={this.selectPhotoTapped.bind(this)}>
                    <Text style={Styles.rowTitle}>头像</Text>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
                        <Image style={{height:50,width:50,borderRadius:25,marginRight:5}}
                               source={this.state.head_img}/>
                    </View>
                </TouchableOpacity>
                <View style={Styles.separator}/>
                <View activeOpacity={1} style={[Styles.input_container,{height: 47}]}>
                    <Text style={[Styles.rowTitle,{marginTop:12}]}
                          onPress={
                              ()=>{}
                          }>昵称</Text>
                    <TextInput style={[Styles.input]} underlineColorAndroid='transparent'
                               autoCorrect={false}
                               autoCapitalize='none'
                               keyboardType={'default'}
                               includeFontPadding={false}
                               placeholderTextColor={'#CCC'}
                               maxLength={15}
                               value={this.state.nickname}
                               onChangeText={(txt)=>this.setState({nickname:txt})}
                               onFocus={()=>{}
                               }/>
                </View>
                <View style={Styles.separator}/>
                <View activeOpacity={1} style={[Styles.input_container,{height:120}]}>
                    <Text style={[Styles.rowTitle,{marginTop:15}]}
                          onPress={()=>{}
                          }>简介</Text>
                    <TextInput style={[Styles.input,{marginRight:20,marginVertical:Platform.OS=='ios'?12:5}]}
                               underlineColorAndroid='transparent'
                               autoCorrect={false}
                               autoCapitalize='none'
                               keyboardType={'default'}
                               includeFontPadding={false}
                               textAlignVertical="top"
                               placeholderTextColor={'#8a909f'}
                               multiline={true}
                               placeholderText="请输入你的简介"
                               value={this.state.description}
                               onChangeText={(txt)=>this.setState({description:txt})}
                               onFocus={()=>{

                                    }
                               }/>

                </View>
                <View style={Styles.separator}/>

                <CommonButton onPress={()=>{this.save_info()}} text="保存"
                              style={{marginHorizontal:5,marginVertical:10}}/>
            </View>
        );
    }

    save_info() {
        Utils.Utils.postFetch(global.family_url + 'user/set_info', {
            token: global.token,
            head_img: this.state.head_img,
            nickname: this.state.nickname,
            description: this.state.description
        }, (success) => {
            if (success.res_code == 1) {
                ToastAndroid.show('设置成功', ToastAndroid.SHORT);
                return;
            }
            ToastAndroid.show('设置失败', ToastAndroid.SHORT);
        }, (err) => {
            console.log(err)
            ToastAndroid.show('设置异常', ToastAndroid.SHORT);
        });
    }

    selectPhotoTapped() {
        let options = {
            title: "选择头像",
            cancelButtonTitle: "取消",
            takePhotoButtonTitle: "拍照选择",
            chooseFromLibraryButtonTitle: "从相册选择",
            storageOptions: {
                skipBackup: true,
                path: 'images'
            },
            allowsEditing: true,
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled photo picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                // You can display the image using either:
                var source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
                this.setState({
                    head_img:source
                });
            }
        });
    }
}

const Styles = StyleSheet.create({
    row: {
        backgroundColor: 'white',
        flexDirection: 'row',
        height: 47,
        paddingHorizontal: 15,
        alignItems: 'center'
    },
    rowTitle: {
        fontFamily: 'PingFang SC',
        fontSize: 16,
        // lineHeight: 23,
        letterSpacing: 2,
        color: '#8a909f'
    },
    separator: {
        alignSelf: 'stretch',
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#e5e7eb'
    },
    input: {
        marginHorizontal: Platform.OS == 'ios' ? 2 : 0,
        fontSize: 16,
        flex: 1,
        marginLeft: 18
    },
    input_container: {
        backgroundColor: 'white',
        flexDirection: 'row',
        paddingHorizontal: 15,
    },
    sex_menu_item: {
        backgroundColor: '#FFFFFF',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
