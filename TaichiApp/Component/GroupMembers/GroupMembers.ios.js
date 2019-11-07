/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
// icon
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {createStackNavigator, StackActions, NavigationActions, createAppContainer} from "react-navigation";
import {
    Alert,
    Platform,
    TouchableOpacity,
    TouchableHighlight,
    DatePickerIOS,
    Button,
    Image,
    ImageBackground,
    Dimensions,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
    ScrollView,
    Animated
} from "react-native";
import ScrollableTabView, {ScrollableTabBar, DefaultTabBar} from 'react-native-scrollable-tab-view'
import Loading from '../LoadingAnimation/LoadingAnimation';
import BlankPages from '../BlankPages/BlankPages';
import global from '../global';
let {width, height} = Dimensions.get('window');
import {JFAPI} from './API/API';
import AsyncStorage from "@react-native-community/async-storage";

export default class GroupMembersIos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            catchData: '',
            loadingState: true,
            groupList: '',
            userInfo: '',
            status: ''
        }
    }

    static navigationOptions = {
        headerTitle: '群成员',
        headerStyle: {
            backgroundColor: "#323232"
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
            fontWeight: 'bold'
        },
    };

    render() {
        return (
            <View style={styles.containerAppTaiMore}>
                <ScrollView>
                    <View style={{backgroundColor: "#FFFFFF", marginTop: 10}}>
                        {
                            this.state.groupList.length > 0 ? this.state.groupList.map((item, index) => {
                                return (
                                    <View key={index} style={this.state.groupList.length == index + 1 ? styles.containerAppTaiMoreChild1N:styles.containerAppTaiMoreChild1}>
                                        {
                                            item.headUrl ? <View>
                                                <Image style={{width: 45, height: 45, borderRadius: 22}}
                                                       source={{uri: global.PicUrl + item.headUrl}}/>
                                            </View> : <View>
                                                <Image style={{width: 45, height: 45, borderRadius: 22}}
                                                       source={require('./Images/bj.png')}/>
                                            </View>
                                        }
                                        <View style={styles.containerAppTaiMoreChild12}>
                                                <Text style={styles.containerAppTaiMoreChild12Text1}>{item.nickName}</Text>
                                                {/*<Text style={styles.containerAppTaiMoreChild12Text2}>弘毅一级</Text>*/}
                                                {
                                                    item.status == 2 ? null : item.status == 0 ? null : <TouchableWithoutFeedback onPress={() => this.removeGruop(item)}>
                                                        <View style={{position: "absolute", justifyContent: "center", alignItems: "center", width: 30, height: 30, right: 8, top: 10}}>
                                                            <Image source={require('./Images/1.png')}/>
                                                        </View>
                                                    </TouchableWithoutFeedback>
                                                }
                                        </View>
                                    </View>
                                )
                            }) : <BlankPages width={width} height={height} justify={'center'} align={'center'}/>
                        }
                    </View>
                </ScrollView>
                <Loading show={this.state.loadingState}/>
            </View>
        );
    }

    confirmRemoveGroup = (item) => {
        console.log(this.state.catchData);
        console.log(item);
        let url = JFAPI.quitGroup;
        let formData = new FormData();
        formData.append('groupsId', this.props.navigation.state.params.data.id);
        formData.append('userId', item.userId);
        let opts = {
            body: formData,
            method: "POST"
        };
        fetch(url, opts)
            .then((response) => response.json())
            .then((res) => {
                console.log(res);
                if (res.code == 0) {
                    this.getGruopList(this.props.navigation.state.params.data.id);
                    this.props.navigation.state.params.refresh();
                } else {
                    this.getGruopList(this.props.navigation.state.params.data.id);
                }
            })
            .catch((err) => {
                console.log(err);
                this.getGruopList(this.props.navigation.state.params.data.id);
            })
    }
    // 移除该团
    removeGruop = (item) => {
        Alert.alert(
            '提示',
            '是否将成员移除该团?',
            [
                {text: '取消'},
                {text: "确定", onPress: () => this.confirmRemoveGroup(item)}
            ]
        );
    }
    // 列表
    getGruopList = (id) => {
        let url = JFAPI.getUserList;
        let formData = new FormData();
        formData.append('id', id);
        let opts = {
            body: formData,
            method: "POST"
        };
        console.log(url);
        console.log(opts);
        fetch(url, opts)
            .then((response) => response.json())
            .then((res) => {
                console.log('列表详情', res);
                if (res.code == 0) {
                    this.setState({
                        loadingState: false
                    })
                    if (res.data.length > 0) {
                        let array = [];
                        for (let i = 0; i < res.data.length; i++) {
                            if (res.data[i].userId == this.state.catchData.userId && this.state.catchData.userStatus == 2) {
                                array.push(
                                    {
                                        headUrl: res.data[i].headUrl,
                                        id: res.data[i].id,
                                        nickName: res.data[i].nickName,
                                        property: res.data[i].property,
                                        userId: res.data[i].userId,
                                        status: 2
                                    }
                                )
                            } else {
                                array.push(
                                    {
                                        headUrl: res.data[i].headUrl,
                                        id: res.data[i].id,
                                        nickName: res.data[i].nickName,
                                        property: res.data[i].property,
                                        userId: res.data[i].userId,
                                        status: 0
                                    }
                                )
                            }
                        }
                        console.log(array);
                        this.setState({
                            groupList: array
                        })
                    } else {
                        this.setState({
                            groupList: ''
                        })
                    }
                } else {
                    this.setState({
                        groupList: '',
                        loadingState: false
                    })
                }
            })
            .catch((err) => {
                this.setState({
                    loadingState: false
                })
                this.setState({
                    groupList: ''
                })
                console.log(err);
            })
    }

    componentDidMount() {
        console.log(this.props.navigation.state.params);
        if (this.props.navigation.state.params.data) {
            this.setState({
                status: this.props.navigation.state.params.data.userStatus,
                catchData: this.props.navigation.state.params.data
            })
            this.getGruopList(this.props.navigation.state.params.data.id);
        }
        AsyncStorage.getItem('userInfo')
            .then(result => {
                this.setState({
                    userInfo: JSON.parse(result)
                })
            }).catch(error => {
            console.log("读取失败");
        })
    }

}

const styles = StyleSheet.create({
    containerAppTaiMore: {
        flex: 1,
        backgroundColor: "#F3F3F3"
    },
    containerAppTaiMoreChild1: {
        borderBottomWidth: 1,
        borderBottomColor: "#DDDDDD",
        width: "94%",
        marginLeft: '3%',
        flexDirection: "row",
        paddingTop: 10,
        paddingBottom: 10
    },
    containerAppTaiMoreChild1N:{
        width: "94%",
        marginLeft: '3%',
        flexDirection: "row",
        paddingTop: 10,
        paddingBottom: 10
    },
    containerAppTaiMoreChild12: {
        width: "87%",
        paddingLeft: 10,
        justifyContent: "space-around"
    },
    containerAppTaiMoreChild12Text1: {
        color: "#282828",
        fontSize: 14
    },
    containerAppTaiMoreChild12Text2: {
        color: "#B2B2B2",
        fontSize: 12,
        paddingTop: 8
    },
    containerAppTaiMoreChild12Text3: {
        color: "#767676",
        fontSize: 13
    }
});
