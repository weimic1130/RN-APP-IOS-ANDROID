/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
// icon
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator, StackActions, NavigationActions, createAppContainer } from "react-navigation";
import global from '../global';
import {
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
    Alert,
    TextInput,
    TouchableWithoutFeedback,
    View,
    ScrollView,
    Animated, KeyboardAvoidingView
} from "react-native";
import ScrollableTabView, { ScrollableTabBar, DefaultTabBar } from 'react-native-scrollable-tab-view'
import { JFAPI } from './API/API';
import HTMLView from 'react-native-htmlview';
import AsyncStorage from "@react-native-community/async-storage";
let { width, height } = Dimensions.get('window');
let codeTime = 60;
export default class CommentDetaileNp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commentsList: '',
            caoshData: '',
            dataList: '',
            comment: '',
            userInfo: ''
        }
    }

    static navigationOptions = {
        headerTitle: '头条详情',
        headerStyle: {
            backgroundColor: "#323232"
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    };

    render() {
        return (
            <View style={styles.containerAppPostDetails}>
                {
                    this.state.dataList ? <View>
                        <ScrollView keyboardShouldPersistTaps="always" style={{ flex: 1, marginBottom: 55 }}>
                            <View style={styles.culturalcon}>
                                <View style={{ justifyContent: "center", alignItems: "center" }}>
                                    <View style={styles.pyquyuscon}>
                                        <View style={styles.pyquyuscon1}>
                                            {
                                                this.state.dataList.headurl ? <Image style={styles.headerImgSize} source={{ uri: global.PicUrl + this.state.dataList.headurl }} /> : <Image style={styles.headerImgSize} source={require('./Images/tx.jpg')} />
                                            }
                                        </View>
                                        <View style={styles.pyquyuscon2}>
                                            <View style={styles.pyquyuscon21}>
                                                <View style={styles.pyquyuscon211}>
                                                    <Text style={styles.yhniche}>{this.state.dataList.name}</Text>
                                                    <Text style={styles.yhnitime}>{this.timestampChangeData(this.state.dataList.createTime)}</Text>
                                                </View>
                                                <View style={styles.pyquyuscon212}>
                                                    <Text>{this.state.dataList.browseNum * 1 + this.state.dataList.virViewNum * 1} 预览量</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    {
                                        this.state.dataList.content ? <HTMLView style={{ marginTop: 8, width: "94%" }} value={this.state.dataList.content} /> : null
                                    }
                                </View>
                            </View>
                            {
                                this.state.commentsList ? <View style={{ justifyContent: "center", alignItems: "center" }}>
                                    {
                                        this.state.commentsList.map((item, index) => {
                                            return (
                                                <View key={index} style={this.state.commentsList.length == index ? styles.pyquyusconN : styles.pyquyuscon}>
                                                    {
                                                        item.headUrl ? <View style={styles.pyquyuscon1}>
                                                            <Image style={styles.headerImgSize} source={{ uri: global.PicUrl + item.headUrl }} />
                                                        </View> : <View style={styles.pyquyuscon1}>
                                                                <Image style={styles.headerImgSize} source={require('./Images/tx.jpg')} />
                                                            </View>
                                                    }
                                                    <View style={styles.pyquyuscon2}>
                                                        <View style={styles.pyquyuscon21}>
                                                            <View style={styles.pyquyuscon211}>
                                                                <Text style={styles.yhniche}>{item.nickname ? item.nickname : ''}</Text>
                                                                <Text style={styles.yhnitime}>{this.timestampChangeData(item.createTime)}</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{ width: '96%', marginTop: 13 }}>
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
                        <View style={styles.box}>
                            <TextInput onChangeText={(text) => this.setState({ comment: text })} value={this.state.comment} ref="input" style={styles.input} placeholderTextColor='#999999' placeholder={'评论内容'} underlineColorAndroid="transparent" />
                            <TouchableWithoutFeedback onPress={() => this.Savereply()}>
                                <Image style={styles.fasImgurl} source={require('./Images/6.png')} />
                            </TouchableWithoutFeedback>
                        </View>
                    </View> : null
                }
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
    // 获取头条详情
    gotoDetails = (id) => {
        let self = this;
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
                    this.getPlList(res.data.id, 12);
                    if (res.data) {
                        this.setState({
                            dataList: res.data
                        })
                    } else {
                        this.setState({
                            dataList: ''
                        })
                    }
                } else {
                    this.setState({
                        dataList: ''
                    })
                }
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    dataList: ''
                })
            })
        this.props.navigation.state.params.refresh();
    }
    // 评论列表
    getPlList = (id, type) => {
        let url = JFAPI.getList;
        let formData = new FormData();
        formData.append('targetId', id);
        formData.append('type', type);
        let opts = {
            body: formData,
            method: "POST"
        }
        console.log(opts);
        fetch(url, opts)
            .then((response) => response.json())
            .then((res) => {
                console.log('评论列表', res);
                if (res.code == 0) {
                    if (res.data) {
                        this.setState({
                            commentsList: res.data
                        })
                    } else {
                        this.setState({
                            commentsList: ''
                        })
                    }
                } else {
                    this.setState({
                        commentsList: ''
                    })
                }
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    commentsList: ''
                })
            })
    }
    // 回复
    Savereply = () => {

        if (this.state.userInfo == null || this.state.userInfo.id == null) {
            this.props.navigation.navigate('Registr');
            return;
        }
        let url = JFAPI.savecomment;
        let comment = this.state.comment;
        if (comment == '') {
            Alert.alert('请输入要评论的内容');
            return;
        }
        let formData = new FormData();
        formData.append('userId', this.state.userInfo.id);
        formData.append('targetId', this.state.dataList.id);
        formData.append('comment', comment);
        formData.append('type', 12);
        let opts = {
            body: formData,
            method: 'POST'
        }
        console.log(opts);
        this.refs.input.blur();
        fetch(url, opts)
            .then((response) => response.json())
            .then((res) => {
                this.setState({
                    comment: ''
                })
                if (res.code == 0) {
                    this.gotoDetails(this.props.navigation.state.params.data.id);
                    this.getPlList(this.state.dataList.id, 12);
                } else {
                    this.gotoDetails(this.props.navigation.state.params.data.id);
                    this.getPlList(this.state.dataList.id, 12)
                }
            })
            .catch((err) => {
                console.log(err);
                this.gotoDetails(this.props.navigation.state.params.data.id);
                this.getPlList(this.state.dataList.id, 12);
                this.setState({
                    comment: ''
                })
            })
    }
    componentDidMount() {
        this.setState({
            caoshData: this.props.navigation.state.params.data
        })
        this.gotoDetails(this.props.navigation.state.params.data.id);
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
    containerAppPostDetails: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#F7F7F7"
    },
    tabBarUnderline: {
        backgroundColor: '#FFFFFF',
        height: 1,
    },
    culturalcon: {
        width: width,
        backgroundColor: "#FFFFFF",
        paddingBottom: 10
    },
    Ttquyu: {
        flexDirection: 'row',
        justifyContent: "space-around",
        paddingBottom: 10,
        paddingTop: 10,
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1,
        borderBottomColor: "#EAEAEA",
        width: width * 0.96,
        marginLeft: width * 0.02
    },
    tttitle: {
        color: "#3A3A3A",
        fontSize: 14,
        fontWeight: 'bold'
    },
    ttdesc: {
        color: "#A8A8A8",
        fontSize: 12
    },
    containerAppTaiMoreChild1: {
        width: "94%",
        marginLeft: '3%',
        flexDirection: "row",
        paddingTop: 10,
        paddingBottom: 10
    },
    containerAppTaiMoreChild2: {
        paddingBottom: 10,
        width: "94%",
        marginLeft: '3%'
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
        paddingTop: 5
    },
    containerAppTaiMoreChild12Text3: {
        color: "#767676",
        fontSize: 13
    },
    containerAppTaiMoreChild13Text: {
        color: "#B06F42",
        fontSize: 10
    },
    containerAppTaiMoreChild13: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#B06F42",
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 8,
        marginLeft: 5
    },
    containerAppTaiMoreChild3: {
        flexDirection: "row",
        width: "94%",
        marginLeft: '3%'
    },
    containerAppTaiMoreChild4: {
        flexDirection: "row",
        width: "94%",
        marginLeft: '3%',
        justifyContent: "space-around",
        marginTop: 10
    },
    containerAppTaiMoreChild3Img: {
        width: '100%',
        height: 175,
        marginTop: 5
    },
    containerAppTaiMoreChild41: {
        alignItems: "center",
        justifyContent: "center"
    },
    containerAppTaiMoreChild41Text: {
        color: "#B2B2B2",
        fontSize: 14,
        paddingTop: 6
    },
    iconSize: {
        width: 51,
        height: 51
    },
    iconSize1: {
        width: 17,
        height: 17
    },
    lineStyZdy: {
        width: width,
        height: 8,
        backgroundColor: "#F3F3F3",
        marginTop: 10,
        marginBottom: 10
    },
    pyquyusconN: {
        flexDirection: "row",
        width: width * 0.94,
        paddingTop: 15,
        paddingBottom: 15
    },
    pyquyuscon: {
        flexDirection: "row",
        width: width * 0.94,
        paddingTop: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#DDDDDD"
    },
    pyquyuscon21: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "96%"
    },
    pyquyuscon1: {
        marginRight: 10
    },
    pyquyuscon2: {
        width: width * 0.82
    },
    pyquyuscon212: {
        flexDirection: "row",
        paddingRight: 10,
        paddingTop: 5
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
    descconText: {
        color: "#282828",
        fontSize: 14
    },
    headerImgSize: {
        width: 38,
        height: 38,
        borderRadius: 19
    },
    lingsTitle: {
        flexDirection: "row",
        width: width * 0.96,
        marginLeft: width * 0.04,
        marginTop: 10,
        paddingTop: 15,
        alignItems: "center"
    },
    plquyuneods: {
        backgroundColor: "#F3F3F3",
        width: '96%',
        marginTop: 13,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 8,
        paddingRight: 8
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
});
