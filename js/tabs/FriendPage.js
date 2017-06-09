/**
 * Created by maxiaobin on 17/5/4.
 * @providesModule FriendPage
 */
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
    Dimensions
} from 'react-native';

import * as Utils from 'Utils';
import {GlobalStyle} from 'GlobalStyle';
import {ICON} from 'GlobalString';

const {height, width} = Dimensions.get('window');

export default class FriendPage extends Component {
    static navigationOptions = {
        tabBarLabel: '好友',
        tabBarIcon: ({tintColor}) => (
            <Text style={[GlobalStyle.iconFontFamily,{color:tintColor,fontSize:28,margin:10}]}>{ICON.FRIEND}</Text>),
        drawerLabel: '好友'
    }

    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([])
        };
    }

    componentDidMount() {
        DeviceEventEmitter.addListener('notify', (msg) => {
            this.get_friend_list();
        });
        this.get_friend_list();
    }

    componentWillUnmount() {
        DeviceEventEmitter.removeListener('notify');
    }

    get_friend_list() {
        Utils.Utils.postFetch(global.family_url + 'user/get_friend_list', {
            token: global.token
        }, (success) => {
            if (success.res_code == 1) {
                this.setState(prevState => ({
                    dataSource: prevState.dataSource.cloneWithRows(success.msg)
                }));
                global.friend_list = success.msg;
            }
        }, (err) => {
        });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{height:40,backgroundColor:'#13b7f6',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'#fff',fontSize:20}}>
                        <Text style={[GlobalStyle.iconFontFamily,{color:'#fff',fontSize:24}]}>{ICON.FRIEND} </Text>
                        好友列表
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
                                  style={{ paddingTop: 10,backgroundColor:'#fff'}}
                                  activeOpacity={1}
                                  onPress={this.go_to_chat.bind(this,rowData)}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems:'flex-start' }}>
                        <Image style={{ width: 50, height: 50,borderRadius:25,borderWidth:StyleSheet.hairlineWidth,borderColor:'#ccc', marginHorizontal:15 }} source={rowData.head_img}/>
                        <View style={{justifyContent:'center',marginRight:20}}>
                            <Text style={{ fontSize: 18 ,marginBottom:5}}>{rowData.nickname}</Text>
                            <Text style={{ color: '#999', fontSize: 14,width:width-100}}>签名: {rowData.description}</Text>
                            <View style={styles.separator}/>
                        </View>
                    </View>

                </TouchableOpacity>
            );
        } else {
            return null;
        }
    }

    go_to_chat(rowData) {
        global.current_friend = rowData;
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

