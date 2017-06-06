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
    ToastAndroid
} from 'react-native';

import * as Utils from 'Utils';

export default class MsgPage extends Component {
    static navigationOptions = {
        tabBarLabel: '消息',
        tabBarIcon: ({tintColor}) => (
            <Text style={[styles.iconStyle,{color:tintColor,fontSize:20}]}>&#xe606;</Text>),
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
            if(global.currentScrern == "MsgPage"){
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
                <View style={{height:40,backgroundColor:'#222',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'#fff',fontSize:20}}>消息列表</Text>
                </View>
                <ListView style={{ padding: 5, flex: 1 }}
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
                                  style={{ padding: 2, margin: 2,backgroundColor:"#fff" }}
                                  activeOpacity={1}
                                  onPress={this.go_to_chat.bind(this,rowData)}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems:'center' }}>
                        <Image style={{ width: 60, height: 60,margin:10 }} source={rowData.head_img}/>
                        <View style={{justifyContent:'center',flex:1}}>
                            <Text style={{ fontSize: 18 ,marginBottom:5}}>{rowData.nickname}</Text>
                            <Text style={{ color: '#999', fontSize: 14 }}>{rowData.content}</Text>
                        </View>
                        <View style={{margin:5,width:16,height:16,borderRadius:8,backgroundColor:((!rowData.is_read) && rowData.to_uid == global.userid)?'#f00':'#f000'}}/>
                    </View>
                </TouchableOpacity>
            );
        } else {
            return null;
        }
    }

    go_to_chat(rowData) {
        global.current_friend = {
            id: rowData.from_uid == global.userid ? rowData.to_uid : rowData.from_uid,
            head_img: rowData.head_img
        };
        Utils.Utils.postFetch(global.family_url + 'user_chat/set_is_read', {
            token: global.token,
            from_uid:global.current_friend.id
        }, (success) => {
        }, (err) => {
        });
        this.get_recently_list();
        global.RootNavigator.navigate('ChatPage');
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    // ------
    inputView: {
        margin: 3,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#CCC',
        paddingHorizontal: 5,
        paddingVertical: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    msg: {
        flex: 1,
        margin: 8
    },
    textInput: {
        marginLeft: -15
    },
});
