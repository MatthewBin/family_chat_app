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
    Alert
} from 'react-native';

import {GlobalStyle} from 'GlobalStyle';
import DataPicker from 'react-native-picker';
import DSBottomModal from 'DSBottomModal';
import ImagePicker from 'react-native-image-picker';
import RealPath from 'react-native-realpath';
import * as Utils from 'Utils';
import CommonButton from 'CommonButton';

export default class PersonalInfoPage extends Component {
    // 导航的头
    static navigationOptions = {
        title: '个人信息'
    }

    constructor(props) {
        super(props);
        this.state = {
            userInfo: this.props.userInfo,
            head_img_url: "",
            nickname: "test",
            description: "desc",
            sex: "nv",
            city: '未设置',
            city_id: 1,
            birthday: new Date('1989-01-01'),
            sexmodalVisible: false,
            timemodalVisible: false
        };
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    openCityPicker() {
        let pcity = this.state.city;
        let select_data = [];
        for (let city of this.props.setting.cities) {
            if (city.id == this.state.city_id) {
                if (city.parent_id == 0) {
                    select_data.push(pcity);
                } else {
                    for (let p_c of  this.props.setting.cities) {
                        if (p_c.id == city.parent_id) {
                            select_data.push(p_c.name);
                            select_data.push(city.name);
                            break;
                        }
                    }
                }
                break;
            }
        }

        DataPicker.init({
            pickerData: this.props.setting.city_picker_data,
            selectedValue: select_data,
            pickerConfirmBtnText: '确定',
            pickerConfirmBtnColor: [51, 51, 51, 1],
            pickerCancelBtnText: '取消',
            pickerCancelBtnColor: [51, 51, 51, 1],
            pickerTitleText: '设置城市',
            // pickerTitleColor:[255,0,0,1],
            pickerToolBarBg: [249, 249, 249, 1],
            pickerBg: [255, 255, 255, 1],
            pickerToolBarFontSize: 16,
            pickerFontSize: 24,
            pickerFontColor: [0, 0, 0, 1],
            onPickerConfirm: data => {
                for (let p of this.props.setting.city_tree_data) {
                    if (p.name == data[0]) {
                        for (let c of p.cities) {
                            if (c.name == data[1]) {
                                this.setState({
                                    city: data[1],
                                    city_id: c.id
                                });
                            }
                        }
                    }
                }
            },
            onPickerCancel: data => {
            },
            onPickerSelect: data => {
            }
        });
        DataPicker.show();
    }

    openDatePicker() {
        if (Platform.OS == 'ios') {
            this.setState({
                timemodalVisible: true
            });
        } else {
            try {
                DatePickerAndroid.open({
                    // 要设置默认值为今天的话，使用`new Date()`即可。
                    // 下面显示的会是2020年5月25日。月份是从0开始算的。
                    date: this.state.birthday,
                    mode: 'spinner'
                }).then(para => {
                    if (para.action == 'dateSetAction') {
                        let month = para.month < 9 ? '0' + (para.month + 1).toString() : para.month + 1;
                        let day = para.day < 10 ? '0' + para.day.toString() : para.day;
                        this.setState({
                            birthday: new Date(para.year + '-' + month + '-' + day)
                        });
                    }
                });
            } catch ({code, message}) {
                Alert.alert('Cannot open date picker');
            }
        }
    }

    iosPickerSelectDate(date) {
        this.setState({birthday: date});
    }

    setSex(sex) {
        this.setState({
            sex: sex,
            sexmodalVisible: false
        });
    }

    renderRow(title, text, onSet) {
        return (
            <TouchableOpacity activeOpacity={1} style={Styles.row}
                              onPress={()=>{
                                  DataPicker.hide();
                                  onSet();
                              }}>
                <Text style={Styles.rowTitle}>{title}</Text>
                <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',paddingLeft:20}}>
                    <Text style={[Styles.rowTitle,{color:'#333'}]}>{text}</Text>
                    <Text style={[GlobalStyle.iconFontFamily, {fontSize: 20,color: '#c4c7cd',
                        transform: [{
                            rotate: '180deg'
                        }]
                    }]}>
                        GlobalString.ICON_LEFTARROW
                    </Text>
                </View>

            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={[GlobalStyle.commonPage]}>
                <View style={[Styles.separator,{marginTop:20}]}/>
                <TouchableOpacity activeOpacity={1} style={[Styles.row,{height:80}]}
                                  onPress={()=>{
                                      DataPicker.hide();
                                      this.selectPhotoTapped();
                                  }}>
                    <Text style={Styles.rowTitle}>头像</Text>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
                        <Image style={{height:50,width:50,borderRadius:25,marginRight:5}}
                               source={{uri:this.state.head_img_url}}/>
                        <Text style={[GlobalStyle.iconFontFamily, {fontSize: 20,color: '#c4c7cd',
                        transform: [{
                            rotate: '180deg'
                        }]
                    }]}>
                            GlobalString.ICON_LEFTARROW
                        </Text>
                    </View>
                </TouchableOpacity>
                <View style={Styles.separator}/>
                <View activeOpacity={1} style={[Styles.input_container,{height: 47}]}>
                    <Text style={[Styles.rowTitle,{marginTop:12}]}
                          onPress={
                              ()=>{DataPicker.hide();}
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
                               onFocus={()=>{
                                  DataPicker.hide();}
                               }/>
                </View>
                <View style={Styles.separator}/>
                <View activeOpacity={1} style={[Styles.input_container,{height:120}]}>
                    <Text style={[Styles.rowTitle,{marginTop:15}]}
                          onPress={()=>{DataPicker.hide();}
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
                                  DataPicker.hide();
                                    }
                               }/>

                </View>
                <View style={Styles.separator}/>

                <View>
                    <View style={[Styles.separator,{marginTop:10}]}/>
                    {this.renderRow('性别', this.state.sex == 0 ? '女' : this.state.sex == 1 ? '男' : '未设置', () => {
                        this.setState({sexmodalVisible: true});
                    })}
                    <View style={Styles.separator}/>
                    {this.renderRow('城市', this.state.city, () => {
                        this.openCityPicker();
                    })}
                    <View style={Styles.separator}/>
                    {this.renderRow('生日', Utils.dateFormat(this.state.birthday, 'yyyy-MM-dd'), () => {
                        this.openDatePicker();
                    })}
                    <View style={Styles.separator}/>
                </View>

                <DSBottomModal
                    animationType='none'//'fade'
                    transparent={true}
                    visible={this.state.sexmodalVisible}
                    visibleCallBack={()=>{this.setState({sexmodalVisible:false});}}
                    backgroundColor='transparent'
                    height={150}
                    onRequestClose={() => { } }>
                    {
                        Platform.OS == 'ios' ?
                            <View style={{flex:1,padding:10}}>
                                <TouchableOpacity onPress={()=>this.setSex(1)}>
                                    <View style={[Styles.sex_menu_item,{borderTopLeftRadius:5,borderTopRightRadius:5}]}>
                                        <Text>男</Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={Styles.separator}/>
                                <TouchableOpacity onPress={()=>this.setSex(0)}>
                                    <View
                                        style={[Styles.sex_menu_item,{borderBottomLeftRadius:5,borderBottomRightRadius:5}]}>
                                        <Text>女</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={()=>this.setState({sexmodalVisible:false})}
                                                  style={{paddingTop:10}}>
                                    <View style={[Styles.sex_menu_item,{borderRadius:5}]}>
                                        <Text>取消</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={{flex:1,justifyContent:'flex-end'}}>
                                <TouchableOpacity onPress={()=>this.setSex(1)}>
                                    <View style={[Styles.sex_menu_item]}>
                                        <Text>男</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>this.setSex(0)}>
                                    <View style={[Styles.sex_menu_item]}>
                                        <Text>女</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                    }

                </DSBottomModal>
                {
                    Platform.OS == 'ios' ?
                        <DSBottomModal
                            animationType='none'//'fade'
                            transparent={true}
                            visible={this.state.timemodalVisible}
                            visibleCallBack={()=>{this.setState({timemodalVisible:false});}}
                            backgroundColor='transparent'
                            height={210}
                            onRequestClose={() => { } }>
                            <View style={{flex:1,backgroundColor:'#fff'}}>
                                <DatePickerIOS
                                    date={this.state.birthday}
                                    mode="date"
                                    timeZoneOffsetInMinutes={8 * 60} //北京时区
                                    onDateChange={this.iosPickerSelectDate.bind(this)}
                                />
                            </View>
                        </DSBottomModal>
                        : null
                }
                <CommonButton onPress={()=>{this.save_info()}} text="保存"
                              style={{marginHorizontal:5,marginVertical:10}}/>
            </View>
        );
    }

    save_info() {
        this.props.dispatch(ACTIONS.setUserInfo(
            this.state.head_img_url,
            this.state.nickname,
            this.state.description,
            this.state.sex,
            this.state.city_id,
            this.state.birthday));
    }

    callback(file, file2) {
        if (file !== 'error') {
            this.setState({
                head_img_url: file
            });
        }
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
                //source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
                //Or:
                if (Platform.OS === 'android') {
                    RealPath.getRealPath(response.uri).then((path) => {
                        let date = new Date().toGMTString();

                    });
                } else {
                    let path = response.uri.replace('file://', '');
                    let date = new Date().toGMTString();

                }
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
