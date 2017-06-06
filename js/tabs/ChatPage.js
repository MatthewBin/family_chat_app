/**
 * Created by maxiaobin on 17/5/26.
 * @providesModule ChatPage
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
    Image
} from 'react-native';

import CommonTextInput from 'CommonTextInput';
import * as Utils from 'Utils';
export default class ChatPage extends Component {
    static navigationOptions = {
        tabBarLabel: '聊天',
        tabBarIcon: ({tintColor}) => (
            <Text style={[styles.iconStyle,{color:tintColor,fontSize:20}]}>&#xe606;</Text>),
        drawerLabel: '聊天'
    }

    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([]),
            isRefreshing: false,
            msg: null,
            refresh_title:'查看更多'
        };

        this.currentPageIndex = 0;
        this.pageSize = 10;
        this.datasource = [];
        this.lockmore = false;
        this.gotoLast = true;
        this.lastY = 0;
    }

    componentDidMount() {
        this.loadMore();
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
            <View style={{flex:1}}>
                <ListView style={{ padding: 5, flex: 1 }}
                          ref="list"
                          dataSource={this.state.dataSource}
                          renderRow={this.renderRow.bind(this)}
                          enableEmptySections={true}
                          onEndReachedThreshold={50}
                          onLayout={(event) => {
                            var layout = event.nativeEvent.layout;
                            this.setState({
                              listHeight: layout.height
                            });
                          } }
                          renderFooter={() => {
                            return <View onLayout={(event) => {
                              var layout = event.nativeEvent.layout;
                              this.setState({
                                footerY: layout.y
                              });
                            } }></View>
                          } }
                          refreshControl={<RefreshControl
                              refreshing={this.state.isRefreshing}
                              onRefresh={this.loadMore.bind(this)}
                              tintColor="#000000"
                              title={this.state.refresh_title}
                              titleColor="#000000"
                              colors={['#000000']}
                              progressBackgroundColor="#ffffff"/>
                          }/>
                <View style={[styles.inputView]}>
                    <CommonTextInput
                        style={styles.textInput}
                        ref={(ref) => this.input = ref}
                        onChangeText={msg => this.setState({ msg })}
                        keyboardType='default'
                        multiline={true}
                        maxLength={200}
                        placeholder=''/>
                    <TouchableOpacity style={{ padding: 5 }}
                                      activeOpacity={1}
                                      onPress={this.sendMsg.bind(this)}>
                        <Text style={{ fontSize: 18 }}>发送</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    renderRow(rowData, sectionID, rowID, highlightRow) {
        if (rowData != undefined) {
            return (
                <TouchableOpacity key={`${sectionID}-${rowID}`}
                                  style={{ padding: 2, margin: 2 }}
                                  activeOpacity={1}
                                  onLongPress={() => this.setState({ delModal: true, delRow: rowData })}>
                    <View>
                        <Text style={{ textAlign: 'center', color: '#666', fontSize: 12 }}>{Utils.dateFormat(rowData.create_time)}</Text>
                        {rowData.to_uid != global.current_friend.id ?
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <Image style={{ width: 40, height: 40 }} source={global.current_friend.head_img}/>
                                <View style={[styles.bold1]}>
                                    <Text style={[styles.msg]}>{rowData.content}</Text>
                                </View>
                            </View> :
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <View style={[styles.bold2, { backgroundColor: 'white' }]}>
                                    <Text style={[styles.msg, { textAlign: 'left' }]}>{rowData.content.toString().replace(/&nbsp;/g, " ")}</Text>
                                </View>
                                <Image style={{ width: 40, height: 40 }} source={global.head_img}/>
                            </View>
                        }
                    </View>
                </TouchableOpacity>
            );
        } else {
            return null;
        }
    }

    loadMore() {
        if (this.lockmore) {
            return;
        }

        this.lockmore = true;
        this.setState({isRefreshing: true});
        Utils.Utils.postFetch(global.family_url + 'user_chat/get_chat_list', {
            token: global.token,
            to_uid: global.current_friend.id,
            page_index: this.currentPageIndex,
            page_size: this.pageSize
        }, (success) => {
            if (success.res_code == 1) {
                this.setState({
                    refresh_title:'没有更多了'
                })
                if (success.msg.length > 0) {
                    this.currentPageIndex++;
                    let newlist = success.msg.reverse();
                    this.datasource = newlist.concat(this.datasource);
                    this.setState(prevState => ({
                        dataSource: prevState.dataSource.cloneWithRows(this.datasource),
                        refresh_title:'查看更多'
                    }));
                }
                this.lockmore = false;
            }
            this.setState({isRefreshing: false});
        }, (err) => {
            this.setState({isRefreshing: false});
            console.log(err)
        });
    }

    sendMsg() {
        let check_msg = this.state.msg.concat();
        if (check_msg.replace('/\s/g', '') != '') {
            Utils.Utils.postFetch(global.family_url + 'user_chat/send_msg', {
                token: token,
                to_uid: global.current_friend.id,
                content: this.state.msg
            }, (success) => {
                if (success.res_code == 1) {
                    let temp = this.datasource.slice();
                    temp.push(success.msg);
                    this.datasource.push(success.msg);
                    this.setState(prevState => ({dataSource: prevState.dataSource.cloneWithRows(temp)}));
                    this.gotoLast = true;
                }
            }, (err) => {
                console.log(err)
            });

            this.input.clear();
        }
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
        paddingVertical: 1,
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