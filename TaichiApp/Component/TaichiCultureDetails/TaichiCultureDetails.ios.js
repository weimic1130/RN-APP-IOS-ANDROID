/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { createStackNavigator, StackActions, NavigationActions, createAppContainer } from "react-navigation";
import {
    Alert,
    KeyboardAvoidingView,
    Modal,
    FlatList,
    TouchableOpacity,
    ScrollView,
    Button,
    Platform,
    Image,
    ImageBackground,
    Dimensions,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View
} from "react-native";
// icon
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
import { JFAPI } from './API/API';
import HTMLView from 'react-native-htmlview';
import Loading from "../LoadingAnimation/LoadingAnimation";
import AsyncStorage from "@react-native-community/async-storage";
import * as WeChat from 'react-native-wechat'
import global from '../global';
let self = this;
export default class HeadlinedetailsIos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "",
            comment: '',
            userInfo: '',
            loadingState: true,
            id: '',
            // 评论列表
            commentList: '',
            CultureDetaile: ""
        }
        WeChat.registerApp('wxee2a0bd18951f6b8');//wx6695722a5c235237
    }

    static navigationOptions = ({ navigation, screenProps }) => ({
        headerTitle: navigation.state.params.title,
        headerStyle: {
            backgroundColor: "#323232"
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
            fontWeight: 'bold'
        },
        headerRight: (
            <TouchableWithoutFeedback onPress={() => navigation.state.params.gotoMessage(self)}>
                <Image style={{ width: 24, height: 24 }} source={require('./Images/share.png')} />
                {/*<Text style={{color: "#FFFFFF"}}>分享</Text>*/}
            </TouchableWithoutFeedback>
        )
    })

    loseFocus() {
        this.refs.input.blur()
    }

    render() {
        let behavior = Platform.OS == 'ios' ? 'position' : null
        return (
            <View style={styles.containerAppHeader}>
                {
                    this.state.CultureDetaile ?
                        <View>
                            <ScrollView style={{ flex: 1, marginBottom: 55 }}>
                                <View style={styles.HeaderTitlecon}>
                                    <View style={styles.HeaderTitle}>
                                        <View style={styles.HeaderTitle1}>
                                            <Text
                                                style={styles.HeaderTitle1Text1}>{this.state.CultureDetaile.name}</Text>
                                            <Text style={styles.HeaderTitle1Text2}>{this.state.CultureDetaile.browseNum}浏览量
                                                / {this.timestampChangeData(this.state.CultureDetaile.createTime)}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.conTitle}>
                                    <Text style={styles.titleText}>{this.state.CultureDetaile.title}</Text>
                                    <Text
                                        style={styles.Timetext}>{this.timestampChangeData(this.state.CultureDetaile.createTime)}</Text>
                                </View>
                                <View style={styles.contitleLine}></View>
                                <HTMLView style={styles.goodPriceTitle2} value={this.state.CultureDetaile.content} />
                                {/*评论区域*/}
                                {
                                    this.state.commentList.length > 0 ? <View style={{ backgroundColor: "#F7F7F7" }}>
                                        {
                                            this.state.commentList.map((item, index) => {
                                                return (
                                                    <View key={index} style={styles.pyquyuscon}>
                                                        <View style={styles.pyquyuscon1}>
                                                            {
                                                                item.headUrl ? <Image
                                                                    style={{ width: 50, height: 50, borderRadius: 25 }}
                                                                    source={{ uri: global.PicUrl + item.headUrl }} /> : <Image
                                                                        style={{ width: 50, height: 50, borderRadius: 25 }}
                                                                        source={require('./Images/bj.png')} />
                                                            }
                                                        </View>
                                                        <View style={styles.pyquyuscon2}>
                                                            <View style={styles.pyquyuscon21}>
                                                                <View style={styles.pyquyuscon211}>
                                                                    <Text style={styles.yhniche}>{item.nickname}</Text>
                                                                    <Text
                                                                        style={styles.yhnitime}>{this.timestampChangeData(item.createTime)}</Text>
                                                                </View>
                                                            </View>
                                                            <View style={{ width: '100%', marginTop: 13 }}>
                                                                <Text style={styles.descconText}>{item.comment}</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                )
                                            })
                                        }
                                    </View> : null
                                }
                            </ScrollView>
                            {/*底部输入框*/}
                            <View style={styles.box}>
                                <TextInput ref="input" onChangeText={(text) => this.setState({ comment: text })}
                                    value={this.state.comment} style={styles.input}
                                    placeholderTextColor='#999999' placeholder={'评论内容'}
                                    underlineColorAndroid="transparent" />
                                <TouchableWithoutFeedback onPress={() => this.savecomment()}>
                                    <Image style={styles.fasImgurl} source={require('./Images/6.png')} />
                                </TouchableWithoutFeedback>
                            </View>
                        </View> : null
                }
                <Loading show={this.state.loadingState}></Loading>
            </View>
        );
    }

    add0 = number => number < 10 ? `0${number}` : number;
    timestampChangeData = (da) => {
        const times = new Date(da);
        const year = times.getFullYear();
        const month = times.getMonth() + 1;
        const day = times.getDate();
        const hour = times.getHours();
        const minutes = times.getMinutes();
        const seconds = times.getSeconds();
        return `${year}-${this.add0(month)}-${this.add0(day)} ${this.add0(hour)
            }:${this.add0(minutes)}:${this.add0(seconds)}`;
    };
    savecomment = () => {
        console.log('保存评论');
        let url = JFAPI.saveComment;
        let title = this.props.navigation.state.params.title;
        let type = '';
        if (title == '传统文化') {
            type = 1;
        } else if (title == '道家文化') {
            type = 2;
        } else if (title == '太极说') {
            type = 3;
        } else if (title == '悠然太极') {
            type = 4;
        } else if (title == '养生文化') {
            type = 5;
        } else if (title == '太极与养生') {
            type = 6;
        }
        let comment = this.state.comment;
        if (comment == '') {
            Alert.alert('请输入要评论的内容');
            return;
        }
        let formData = new FormData();
        formData.append('userId', this.state.userInfo.id);
        formData.append('targetId', this.state.CultureDetaile.id);
        formData.append('comment', comment);
        formData.append('type', type);
        let opts = {
            body: formData,
            method: "POST"
        }
        this.refs.input.blur();
        console.log('请求字段', opts);
        console.log(url);
        fetch(url, opts)
            .then((response) => response.json())
            .then((res) => {
                this.setState({
                    comment: ''
                })
                console.log(res);
                if (res.code == 0) {
                    this.getDetails(this.state.id);
                } else {
                    Alert.alert('评论失败，请稍后再试');
                }
            })
            .catch((err) => {
                this.setState({
                    comment: ''
                })
                Alert.alert('评论失败，请稍后再试');
                console.log(err);
            })
    }
    // 获取评论列表
    getcommentList = (goodsId, type, page, length) => {
        let url = JFAPI.commentsList;
        let formData = new FormData();
        formData.append('targetId', goodsId);
        formData.append('type', type);
        formData.append('page', page);
        formData.append('length', length);
        let opts = {
            body: formData,
            method: "POST"
        }
        fetch(url, opts)
            .then((response) => response.json())
            .then((res) => {
                console.log('评论列表', res);
                if (res.code == 0) {
                    if (res.data.length > 0) {
                        this.setState({
                            commentList: res.data
                        })
                    } else {
                        this.setState({
                            commentList: ''
                        })
                    }
                }
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    commentList: ''
                })
            })
    }
    getDetails = (id) => {
        let url = JFAPI.getDetails;
        let formData = new FormData();
        formData.append('id', id);
        let opts = {
            body: formData,
            method: "POST"
        };
        fetch(url, opts)
            .then((response) => response.json())
            .then((res) => {
                console.log(res);
                if (res.code == 0) {
                    if (res.data) {
                        this.setState({
                            CultureDetaile: res.data,
                            loadingState: false
                        })
                        let title = this.props.navigation.state.params.title;
                        if (title == '传统文化') {
                            this.setState({
                                type: 1
                            })
                            this.getcommentList(res.data.id, 1, 1, 10)
                        } else if (title == '道家文化') {
                            this.setState({
                                type: 2
                            })
                            this.getcommentList(res.data.id, 2, 1, 10)
                        } else if (title == '太极说') {
                            this.setState({
                                type: 3
                            })
                            this.getcommentList(res.data.id, 3, 1, 10)
                        } else if (title == '悠然太极') {
                            this.setState({
                                type: 4
                            })
                            this.getcommentList(res.data.id, 4, 1, 10)
                        } else if (title == '养生文化') {
                            this.setState({
                                type: 5
                            })
                            this.getcommentList(res.data.id, 5, 1, 10)
                        } else if (title == '太极与养生') {
                            this.setState({
                                type: 6
                            })
                            this.getcommentList(res.data.id, 6, 1, 10)
                        }
                    }
                } else {
                    this.setState({
                        CultureDetaile: '',
                        loadingState: false,
                    })
                }
            })
            .catch((err) => {
                this.setState({
                    CultureDetaile: '',
                    loadingState: false,
                })
                console.log(err);
            })
    }

    // 请求页面接口
    componentDidMount() {
        if (this.props.navigation.state.params.id) {
            this.setState({
                id: this.props.navigation.state.params.id
            })
            this.getDetails(this.props.navigation.state.params.id);
        } else {
            this.setState({
                loadingState: false,
                id: ''
            })
        }
        AsyncStorage.getItem('userInfo')
            .then(result => {
                console.log(JSON.parse(result));
                this.setState({
                    userInfo: JSON.parse(result)
                })
            }).catch(error => {
                console.log("读取失败");
            })
        // 注册自定义导航右侧点击事件
        this.props.navigation.setParams({
            gotoMessage: this.ShareWechat
        })
    }

    ShareWechat = () => {
        let self = this;
        console.log(this.state.CultureDetaile.imgList[0]);
        WeChat.isWXAppInstalled()
            .then((isInstalled) => {
                if (isInstalled) {
                    WeChat.shareToSession({
                        title: self.state.CultureDetaile.title,
                        description: self.state.CultureDetaile.title,
                        thumbImage: 'https://taiji.papaquan.net/taijiweb/information/img/1.png',
                        type: 'news',
                        webpageUrl: 'https://taiji.papaquan.net/taijiweb/information/information.html?id=' + this.state.id
                    }).catch((error) => {
                        Alert.alert(error.message);
                    });
                } else {
                    Alert.alert('请更新微信，或者安装最新版');
                }
            });
    }

    // saveComment
    componentWillMount() {
    }
}
const styles = StyleSheet.create({

    containerAppHeader: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: "center"
    },
    HeaderTitlecon: {
        backgroundColor: "#FAF7F4",
        width: width,
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomColor: "#D6B6A0",
        borderBottomWidth: 1
    },
    HeaderTitle: {
        flexDirection: 'row',
        justifyContent: "space-between",
        width: width * 0.9,
        marginTop: 10
    },
    HeaderTitle1Text1: {
        color: "#282828",
        fontSize: 14
    },
    HeaderTitle1Text2: {
        color: "#B2B2B2",
        fontSize: 12,
        paddingTop: 4,
        paddingBottom: 4
    },
    conTitle: {
        width: width * 0.94,
        marginLeft: width * 0.03,
        alignItems: "center",
        paddingTop: 10
    },
    contitleLine: {
        width: width,
        alignItems: "center",
        backgroundColor: '#EAEAEA',
        height: 1,
        marginTop: 15
    },
    titleText: {
        color: "#3A3A3A",
        fontWeight: "bold",
        fontSize: 17
    },
    Timetext: {
        color: "#A8A8A8",
        fontSize: 12,
        paddingTop: 10
    },
    contTitleText2: {
        color: "#3A3A3A",
        fontSize: 14,
        fontWeight: "bold"
    },
    contitleImage: {
        width: "100%"
    },
    diansaNum: {
        color: "#B2B2B2",
        fontSize: 14,
        paddingTop: 5,
        paddingBottom: 5
    },
    remsnscON: {
        backgroundColor: "#F7F7F7",
        flexDirection: "row",
        justifyContent: "space-between",
        width: width,
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 15
    },
    rementj: {
        flexDirection: 'row',
        justifyContent: "space-between",
        width: width * 0.9,
        marginTop: 10,
        marginLeft: width * 0.05
    },
    rementj1: {
        flexDirection: "row",
        alignItems: "center"
    },
    rementj2: {
        flexDirection: "row",
        alignItems: "center"
    },
    retjText1: {
        color: "#282828",
        fontSize: 16,
        paddingLeft: 10
    },
    retjText2: {
        color: "#B2B2B2",
        fontSize: 13,
        paddingRight: 6
    },
    culturalcon: {
        width: width,
        backgroundColor: "#F7F7F7",
        paddingTop: 10,
        paddingBottom: 10
    },
    Ttquyu: {
        flexDirection: 'row',
        justifyContent: "space-around",
        paddingBottom: 10,
        paddingTop: 10,
        backgroundColor: "#F7F7F7",
        borderBottomWidth: 1,
        borderBottomColor: "#EAEAEA",
        width: width * 0.96,
        marginLeft: width * 0.04
    },
    TtquyuNo: {
        flexDirection: 'row',
        justifyContent: "space-around",
        paddingBottom: 10,
        paddingTop: 10,
        backgroundColor: "#F7F7F7",
        width: width * 0.96,
        marginLeft: width * 0.04
    },
    zesbiaoti: {
        color: "#3A3A3A",
        fontSize: 14,
        fontWeight: "bold"
    },
    tttitle: {
        color: "#A8A8A8",
        fontSize: 12,
        fontWeight: 'bold'
    },
    ttdesc: {
        color: "#A8A8A8",
        fontSize: 12
    },
    pyquyuscon: {
        flexDirection: "row",
        width: width * 0.92,
        marginLeft: width * 0.04,
        marginTop: 10,
        paddingTop: 15,
        borderBottomColor: "#EAEAEA",
        borderBottomWidth: 1,
        paddingBottom: 15
    },
    pyquyuscon21: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    pyquyuscon1: {
        width: width * 0.2,
    },
    pyquyuscon2: {
        width: width * 0.75
    },
    pyquyuscon212: {
        flexDirection: "row",
        paddingRight: 10
    },
    yhniche: {
        color: "#757575",
        fontSize: 14
    },
    yhnitime: {
        color: "#B2B2B2",
        fontSize: 11,
        paddingTop: 5
    },
    diansas: {
        color: "#B2B2B2",
        fontSize: 13,
        paddingRight: 8
    },
    pyquyuscon211: {
        alignContent: "space-between"
    },
    descconText: {
        color: "#282828",
        fontSize: 14,
        fontWeight: "bold"
    },
    Dbinput: {
        width: width,
        position: "absolute",
        bottom: 0,
        backgroundColor: "#DDDDDD",
        height: 50
    },
    box: {
        width: width,
        height: 55,
        backgroundColor: '#FFFFFF',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#DDDDDD",
        shadowOpacity: 0.5,
        shadowRadius: 2
    },
    input: {
        height: 40,
        width: '80%',
        fontSize: 15,
        color: '#333333',
        backgroundColor: '#F3F3F3',
        paddingVertical: 0,
        paddingLeft: 5
    },
    fasImgurl: {
        marginLeft: 10
    },
    goodPriceTitle2: {
        width: width * 0.94,
        marginLeft: width * 0.03,
        paddingBottom: 15,
        paddingTop: 15
    }
});
