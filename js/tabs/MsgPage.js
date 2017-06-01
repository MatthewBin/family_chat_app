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
    Image
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
        if (!global.token) {
            global.RootNavigator.navigate('LoginPage');
            return;
        }
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
            <ListView style={{ padding: 5, flex: 1 }}
                      ref="list"
                      dataSource={this.state.dataSource}
                      renderRow={this.renderRow.bind(this)}
                      enableEmptySections={true}
                      onEndReachedThreshold={50}
                      onLayout={(event) => {} }
                      renderFooter={() => {} }
            />
        );
    }

    renderRow(rowData, sectionID, rowID, highlightRow) {
        if (rowData != undefined) {
            return (
                <TouchableOpacity key={`${sectionID}-${rowID}`}
                                  style={{ padding: 2, margin: 2 }}
                                  activeOpacity={1}
                                  onPress={this.go_to_chat.bind(this,rowData)}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <Image style={{ width: 40, height: 40 }} source={rowData.head_img}/>
                        <View style={[styles.bold1]}>
                            <Text style={[styles.msg]}>{rowData.content}</Text>
                        </View>
                    </View>
                    <Text style={{ textAlign: 'center', color: '#666', fontSize: 12 }}>{rowData.description}</Text>
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
