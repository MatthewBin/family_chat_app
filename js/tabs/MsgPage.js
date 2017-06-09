/**
 * Created by maxiaobin on 17/5/27.
 * @providesModule MsgPage
 */

'use strict'

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Alert,
    ListView,
    RefreshControl,
    TouchableOpacity,
    Image,
    DeviceEventEmitter,
    ToastAndroid,
    Dimensions
} from 'react-native';

import {GlobalStyle} from 'GlobalStyle';
import {ICON} from 'GlobalString';
import * as Utils from 'Utils';

const {height, width} = Dimensions.get('window');

export default class MsgPage extends Component {
    static navigationOptions = {
        tabBarLabel: '消息',
        tabBarIcon: ({tintColor}) => (
            <Text style={[GlobalStyle.iconFontFamily,{color:tintColor,fontSize:28,margin:10}]}>{ICON.CHAT}</Text>),
        drawerLabel: '消息'
    }

    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([])
        };
    }

    componentDidMount() {
        DeviceEventEmitter.addListener('chat', (msg) => {
            if (global.currentScrern == "MsgPage") {
                this.get_recently_list();
            }
        });
        this.get_recently_list();
    }

    get_recently_list() {
        Utils.Utils.postFetch(global.family_url + 'user_chat/get_recently_list', {
            token: global.token
        }, (success) => {
            if (success.res_code == 1) {
                this.setState(prevState => ({
                    dataSource: prevState.dataSource.cloneWithRows(success.msg)
                }));
            }
        }, (err) => {
        });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{height:40,backgroundColor:'#13b7f6',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'#fff',fontSize:20}}>
                        <Text style={[GlobalStyle.iconFontFamily,{color:'#fff',fontSize:24}]}>{ICON.CHAT} </Text>
                        消息列表
                    </Text>
                </View>
                <ListView style={{ flex: 1 }}
                          ref="list"
                          dataSource={this.state.dataSource}
                          renderRow={this.renderRow.bind(this)}
                          enableEmptySections={true}
                          onEndReachedThreshold={50}
                          onLayout={(event) => {} }
                          renderFooter={() => {} }
                />
            </View>
        );
    }

    renderRow(rowData, sectionID, rowID, highlightRow) {
        if (rowData != undefined) {
            return (
                <TouchableOpacity key={`${sectionID}-${rowID}`}
                                  style={{ paddingTop: 10,backgroundColor:"#fff" }}
                                  activeOpacity={1}
                                  onPress={this.go_to_chat.bind(this,rowData)}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <Image
                            style={{ width: 50, height: 50,borderRadius:25,borderWidth:StyleSheet.hairlineWidth,borderColor:'#ccc',marginHorizontal:15 }}
                            source={rowData.head_img}/>
                        <View style={{justifyContent:'center',flex:1}}>
                            <View
                                style={{flexDirection:'row',marginBottom:5,justifyContent:'space-between',alignItems:'center'}}>
                                <Text style={{ fontSize: 20,color:'#13b7f6' }}>{rowData.nickname}</Text>
                                <Text
                                    style={{ color:'#999',fontSize:12,marginRight:10 }}>{Utils.dateFormat(rowData.create_time)}</Text>
                            </View>
                            <Text style={[GlobalStyle.iconFontFamily,{ color: '#666', fontSize: 16,width:width-120 }]}
                                  numberOfLines={1}
                            >{rowData.content}</Text>
                            <View style={styles.separator}/>
                        </View>
                        <View
                            style={{marginTop:15,marginRight:15,width:14,height:14,borderRadius:7,backgroundColor:((!rowData.is_read) && rowData.to_uid == global.userid)?'#f00':'#f000'}}/>
                    </View>
                </TouchableOpacity>
            );
        } else {
            return null;
        }
    }

    go_to_chat(rowData) {
        let t_id = rowData.from_uid == global.userid ? rowData.to_uid : rowData.from_uid;
        let nickname = "";
        for (let f of global.friend_list) {
            if (f.id == t_id) {
                nickname = f.nickname;
                break;
            }
        }
        global.current_friend = {
            id: t_id,
            head_img: rowData.head_img,
            nickname: nickname
        };
        Utils.Utils.postFetch(global.family_url + 'user_chat/set_is_read', {
            token: global.token,
            from_uid: global.current_friend.id
        }, (success) => {
        }, (err) => {
        });
        this.get_recently_list();
        global.RootNavigator.navigate('ChatPage');
    }
}

const styles = StyleSheet.create({
    separator: {
        alignSelf: 'stretch',
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#dce2ea',
        marginTop: 10
    }
});
