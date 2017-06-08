/**
 * Created by maxiaobin on 17/5/26.
 * @providesModule WhatYouDoPage
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
    ToastAndroid,
    Keyboard
} from 'react-native';

import {GlobalStyle} from 'GlobalStyle';
import {ICON} from 'GlobalString';
import CommonTextInput from 'CommonTextInput';
import * as Utils from 'Utils';
export default class WhatYouDoPage extends Component {
    static navigationOptions = {
        tabBarLabel: '动态',
        tabBarIcon: ({tintColor}) => (
            <Text style={[GlobalStyle.iconFontFamily,{color:tintColor,fontSize:28,margin:10}]}>{ICON.TODO}</Text>),
        drawerLabel: '动态'
    }

    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([]),
            isRefreshing: false,
            isLoadAll: false,
            msg: ''
        };

        this.currentPageIndex = 0;
        this.pageSize = 5;
        this.datasource = [];
        this.lockmore = false;
        this.gotoLast = true;
        this.lastY = 0;
    }

    componentDidMount() {
        this.refresh();
    }

    componentDidUpdate() {
        if (this.gotoLast && "listHeight" in this.state && "footerY" in this.state && this.state.footerY > this.state.listHeight) {
            let scrollDistance = this.state.listHeight - this.state.footerY;
            if (this.lastY != scrollDistance) {
                this.refs.list.scrollTo({x: 0, y: -scrollDistance, animated: true});
                this.gotoLast = false;
                this.lastY = scrollDistance;
            }
        }
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{height:40,backgroundColor:'#13b7f6',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'#fff',fontSize:20}}>
                        <Text style={[GlobalStyle.iconFontFamily,{color:'#fff',fontSize:24}]}>{ICON.TODO} </Text>
                        好友动态
                    </Text>
                </View>
                <View style={{height:80,backgroundColor:'#fff',flexDirection:'row'}}>
                    <Image style={{ width: 80, height: 80}} source={global.head_img}/>
                    <CommonTextInput
                        style={styles.textInput}
                        ref={(ref) => this.input = ref}
                        onChangeText={msg => this.setState({ msg })}
                        keyboardType='default'
                        multiline={true}
                        maxLength={500}
                        placeholder='发表一下动态吧...'/>
                    <TouchableOpacity style={{ padding: 5,backgroundColor:'#eee' ,justifyContent:'center'}}
                                      activeOpacity={1}
                                      onPress={this.sendActive.bind(this)}>
                        <Text style={{ fontSize: 20 ,marginHorizontal:10}}>发送</Text>
                    </TouchableOpacity>
                </View>
                <ListView style={{ padding: 5, flex: 1 ,height:200}}
                          ref="list"
                          dataSource={this.state.dataSource}
                          renderRow={this.renderRow.bind(this)}
                          enableEmptySections={true}
                          onEndReached={this.endReached.bind(this)}
                          renderFooter={ ()=>{
                              return ( <View style={{justifyContent:'center',alignItems:'center',backgroundColor:"#fff"}}>
                                            <Text style={{color:'#ccc'}}>{this.state.isLoadAll ? '已加载全部' : '正在加载更多……'}</Text>
                                       </View>)
                          } }
                          refreshControl={<RefreshControl
                              refreshing={this.state.isRefreshing}
                              onRefresh={this.refresh.bind(this)}
                              tintColor="#000000"
                              title='刷新'
                              titleColor="#000000"
                              colors={['#000000']}
                              progressBackgroundColor="#ffffff"/>
                          }
                />
            </View>
        );
    }

    renderRow(rowData, sectionID, rowID, highlightRow) {
        if (rowData != undefined) {
            return (
                <View
                    style={{ padding: 2, margin: 2,backgroundColor:"#fff",flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <Image style={{ width: 40, height: 40,marginRight:15}} source={rowData.head_img}/>
                    <View style={{justifyContent:'center',flex:1}}>
                        <View style={{height:40,justifyContent:'center'}}>
                            <Text style={{ fontSize: 20 ,marginBottom:5}}>{rowData.nickname}</Text>
                        </View>
                        <Text
                            style={[GlobalStyle.iconFontFamily,{ color: '#999', fontSize: 14 }]}>{rowData.content}</Text>
                        <Text
                            style={{ textAlign: 'left', color: '#999', marginTop:10, fontSize: 10 }}>{Utils.dateFormat(rowData.create_time)}</Text>
                    </View>
                </View>
            );
        } else {
            return null;
        }
    }

    sendActive() {
        Keyboard.dismiss();
        let check_msg = this.state.msg.concat();
        if (check_msg.replace('/\s/g', '') != '') {
            Utils.Utils.postFetch(global.family_url + 'user_chat/send_active', {
                token: token,
                content: this.state.msg
            }, (success) => {
                if (success.res_code == 1) {
                    let temp = [success.msg].concat(this.datasource);
                    this.datasource = temp;
                    this.setState(prevState => ({dataSource: prevState.dataSource.cloneWithRows(temp)}));
                    ToastAndroid.show('发表成功', ToastAndroid.SHORT);
                }
            }, (err) => {
                console.log(err)
            });

            this.input.clear();
        }
    }

    endReached() {
        if (this.lockmore) {
            return;
        }
        this.lockmore = true;
        Utils.Utils.postFetch(global.family_url + 'user_chat/get_active_list', {
            token: global.token,
            page_index: this.currentPageIndex,
            page_size: this.pageSize
        }, (success) => {
            if (success.res_code == 1) {
                if (success.msg.length > 0) {
                    this.currentPageIndex++;
                    let newlist = success.msg;
                    this.datasource = this.datasource.concat(newlist);
                    this.setState(prevState => ({
                        dataSource: prevState.dataSource.cloneWithRows(this.datasource)
                    }));
                } else {
                    this.setState({isLoadAll: true});
                }
            }
            this.lockmore = false;
        }, (err) => {
            console.log(err)
        });
    }

    refresh() {
        this.setState({isLoadAll: false});
        this.currentPageIndex = 0;
        Utils.Utils.postFetch(global.family_url + 'user_chat/get_active_list', {
            token: global.token,
            page_index: this.currentPageIndex,
            page_size: this.pageSize
        }, (success) => {
            if (success.res_code == 1) {
                if (success.msg.length > 0) {
                    this.currentPageIndex++;
                    this.datasource = success.msg;
                    this.setState(prevState => ({
                        dataSource: prevState.dataSource.cloneWithRows(this.datasource),
                    }));
                } else {
                    this.setState({isLoadAll: true});
                }
            }
            this.setState({isRefreshing: false});
        }, (err) => {
            this.setState({isRefreshing: false});
            console.log(err)
        });
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
    bold1: {
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 5,
        marginLeft: 10,
        marginRight: 80,
        marginTop: 5,
        marginBottom: 10
    },
    bold2: {
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 5,
        marginLeft: 80,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 10,
    },
    textInput: {
        marginLeft: -15
    },
});
