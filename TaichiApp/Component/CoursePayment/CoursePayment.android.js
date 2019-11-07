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
import AsyncStorage from "@react-native-community/async-storage";
import { createStackNavigator, StackActions, NavigationActions, createAppContainer } from "react-navigation";
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
    Animated, Modal
} from "react-native";
import Alipay from '../Utils/Ailpay';
import { JFAPI } from './API/API';
let { width, height } = Dimensions.get('window');
import * as WeChat from "react-native-wechat";
import global from '../global';
export default class CoursePaymentAndroid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: "",
            balance: "",
            paramsData: "",
            modalVisible: false,
            topUp: false,
            payState1: false,
            payState2: false,
            payState3: false,
            PayText: "",
        }
        WeChat.registerApp('wxee2a0bd18951f6b8');//wx6695722a5c235237
    }

    static navigationOptions = {
        headerTitle: '课程支付',
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
            <View style={styles.containerAppEntertoPay}>
                {
                    this.state.paramsData ? <View>
                        <View style={styles.modalSty2}>
                            <View style={styles.tieCon2}>
                                <View style={{ flexDirection: "row" }}>
                                    <Image style={{ width: 120, height: 75 }} source={{ uri: global.PicUrl + this.state.paramsData.imgList[0] }} />
                                </View>
                                <View style={{ paddingLeft: 10, justifyContent: "space-between" }}>
                                    <Text style={{ color: "#282828", fontSize: 15 }}>{this.state.paramsData.title}</Text>
                                    <Text style={styles.tieCon22}>￥<Text style={styles.tieCon23}>{this.state.paramsData.price / 100}</Text></Text>
                                </View>
                            </View>
                            <View style={styles.tieCon}>
                                <Text style={styles.tieConText}>支付方式</Text>
                            </View>
                            <View>
                                <View style={styles.xzzhifnConN}>
                                    <View style={styles.xzzhifnCon1}>
                                        <Image source={require('./Images/yue.png')} />
                                        <Text style={styles.CEtEXT}>余额支付（余额：￥{this.state.balance > 0 ? this.state.balance : '0.00'}）</Text>
                                    </View>
                                    {
                                        this.state.balance > 0 ? <TouchableWithoutFeedback onPress={() => this.choosePay('余额')}>
                                            <Image style={{ width: 25, height: 25 }} source={this.state.payState3 ? require('./Images/xz.png') : require('./Images/wx.png')} />
                                        </TouchableWithoutFeedback> : <Image source={require('./Images/yuebuzu.png')} style={{width:25,height:25}}  />
                                    }
                                </View>
                                <View style={styles.xzzhifnConN}>
                                    <View style={styles.xzzhifnCon1}>
                                        <Image source={require('./Images/zhifubao.png')} />
                                        <Text style={styles.CEtEXT}>支付宝</Text>
                                    </View>
                                    <TouchableWithoutFeedback onPress={() => this.choosePay('支付宝')}>
                                        <Image style={{ width: 25, height: 25 }} source={this.state.payState1 ? require('./Images/xz.png') : require('./Images/wx.png')} />
                                    </TouchableWithoutFeedback>
                                </View>
                                <View style={styles.xzzhifnConN}>
                                    <View style={styles.xzzhifnCon1}>
                                        <Image source={require('./Images/weixin.png')} />
                                        <Text style={styles.CEtEXT}>微信</Text>
                                    </View>
                                    <TouchableWithoutFeedback onPress={() => this.choosePay('微信')}>
                                        <Image style={{ width: 25, height: 25 }} source={this.state.payState2 ? require('./Images/xz.png') : require('./Images/wx.png')} />
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </View>
                        <TouchableWithoutFeedback onPress={() => this.PayCourses()}>
                            <View>
                                <View style={styles.shurukacon3}>
                                    <Text style={styles.shurukacon3Text}>确定支付</Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View> : null
                }
            </View>
        );
    }

    gotoPerson = () => {
        let self = this;
        self.props.navigation.navigate('PersonalCenterN');
    }
    withdrawal = (text) => {
        if (text == 1) {
            this.setState({
                topUp: true
            })
        } else if (text == 2) {
            this.setState({
                modalVisible: true
            })
        }
    }
    choosePay = (text) => {
        if (text == "支付宝") {
            this.setState({
                payState1: true,
                payState2: false,
                payState3: false
            })
            if (this.state.payState1 == false) {
                this.setState({
                    payState1: true,
                    PayText: "支付宝"
                })
            } else {
                this.setState({
                    payState1: false
                })
            }
        } else if (text == "微信") {
            this.setState({
                payState1: false,
                payState2: true,
                payState3: false
            })
            if (this.state.payState2 == false) {
                this.setState({
                    payState2: true,
                    PayText: "微信"
                })
            } else {
                this.setState({
                    payState2: false
                })
            }
        } else if (text == "余额") {
            this.setState({
                payState1: false,
                payState2: false,
                payState3: true
            })
            if (this.state.payState3 == false) {
                this.setState({
                    payState3: true,
                    PayText: "余额"
                })
            } else {
                this.setState({
                    payState3: false
                })
            }
        }
    }
    gotoOrderDetails = () => {
        let reseAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'MypageN' })]
        })
        this.props.navigation.dispatch(reseAction);
    }
    // 支付宝支付
    async pay(res) {
        let self = this;
        let ret = await Alipay.pay(res);
        console.log(ret);
        if(ret.result){
            let reseAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'PaymentAlsoN' })]
            })
            self.props.navigation.dispatch(reseAction);
        }else{
            console.log('取消支付')
        }
    }
    // 微信支付
    async wxPayAction(wxDic) {
        let self = this;
        WeChat.isWXAppInstalled()
            .then((isInstalled) => {
                if (isInstalled) {
                    WeChat.pay(wxDic).then((requestJson) => {
                        //支付成功回调
                        if (requestJson.errCode == 0) {
                            console.log("准备跳转");
                            let reseAction = StackActions.reset({
                                index: 0,
                                actions: [NavigationActions.navigate({ routeName: 'PaymentAlsoN' })]
                            })
                            self.props.navigation.dispatch(reseAction);
                        } else if (requestJson.errCode == -2) {
                            console.log('取消了支付');
                        } else {
                            console.log('支付失败');
                        }
                    })
                } else {
                    Alert.alert('尚未安装微信，请先下载微信')
                }
            })
    }
    // 余额支付
    balancePay = () => {
        let self = this;
        let url = JFAPI.getOrder;
        let formData = new FormData();
        let price = 0;
        for (let i = 0; i < this.state.goodsList.length; i++) {
            price = price + this.state.goodsList[i].buyPrice / 100;
        }
        if (price > this.state.balance) {
            Alert.alert('余额不足，请选择其他支付方式');
            return;
        }
        formData.append('userId', this.state.userInfo.id);
        formData.append('goodsInfo', JSON.stringify(this.state.goodsList));
        formData.append('addressId', this.state.DefaultuserAddress.id);
        formData.append('payType', 2);
        let opts = {
            method: 'POST',
            body: formData
        };
        fetch(url, opts)
            .then((response) => response.json())
            .then((res) => {
                console.log("余额支付成功");
                console.log(res);
                if (res.code == 0) {
                    this.getBalance(this.state.userInfo.id);
                    let reseAction = StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({ routeName: 'PaymentAlsoN' })]
                    })
                    self.props.navigation.dispatch(reseAction);
                }
            })
            .catch((error) => {
                console.log(erro);
            })
    }
    // 获取余额
    getBalance = () => {
        let self = this;
        let url = JFAPI.getBalance;
        let formData = new FormData();
        formData.append('userId', this.state.userInfo.id);
        let opts = {
            method: "POST",
            body: formData
        }
        fetch(url, opts)
            .then((response) => response.json())
            .then((res) => {
                console.log('余额详情：',res);
                if (res.code == 0) {
                    if (res.data) {
                        console.log(res.data / 100);
                        this.setState({
                            balance: res.data / 100
                        })
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }
    // 支付课程
    PayCourses = () => {
        let text = this.state.PayText;
        // 确认支付接口 JFAPI.coursePayment
        let payType = '';
        if (text == '') {
            Alert.alert('请先选择支付方式');
            return;
        }
        if (text == "微信") {
            payType = '0';
            let url = JFAPI.getOrder;
            let formData = new FormData();
            formData.append('userId', this.state.userInfo.id);
            formData.append('lessonId', this.state.paramsData.id);
            formData.append('payType', payType);
            let opts = {
                body: formData,
                method: "POST"
            };
            fetch(url, opts)
                .then((response) => response.json())
                .then((res) => {
                    if (res.code == 0) {
                        if (res.data) {
                            let url = JFAPI.coursePayment;
                            let formData = new FormData();
                            formData.append('orderId', res.data);
                            formData.append('userId', this.state.userInfo.id);
                            formData.append('subject', this.state.paramsData.title);
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
                                            this.wxPayAction(res.data);
                                        }
                                    } else {
                                        Alert.alert('支付出错，请选择其他支付方式');
                                    }
                                })
                                .catch((err) => {
                                    console.log(err);
                                    Alert.alert('支付出错，请选择其他支付方式');
                                })
                        }
                    }
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                })
        } else if (text == "支付宝") {
            payType = '1'
            let url = JFAPI.getOrder;
            let formData = new FormData();
            formData.append('userId', this.state.userInfo.id);
            formData.append('lessonId', this.state.paramsData.id);
            formData.append('payType', payType);
            let opts = {
                body: formData,
                method: "POST"
            };
            fetch(url, opts)
                .then((response) => response.json())
                .then((res) => {
                    if (res.code == 0) {
                        if (res.data) {
                            let url = JFAPI.coursePayment;
                            let formData = new FormData();
                            formData.append('orderId', res.data);
                            formData.append('userId', this.state.userInfo.id);
                            formData.append('subject', this.state.paramsData.title);
                            let opts = {
                                body: formData,
                                method: "POST"
                            };
                            fetch(url, opts)
                                .then((response) => response.json())
                                .then((res) => {
                                    console.log(res);
                                    if (res.code == 0) {
                                        if (res.data.payInfo) {
                                            this.pay(res.data.payInfo);
                                        }
                                    } else {
                                        Alert.alert('支付出错，请选择其他支付方式');
                                    }
                                })
                                .catch((err) => {
                                    console.log(err);
                                    Alert.alert('支付出错，请选择其他支付方式');
                                })
                        }
                    }
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                })
        } else if (text == '余额') {
            payType = '2';
            let url = JFAPI.getOrder;
            let formData = new FormData();
            formData.append('userId', this.state.userInfo.id);
            formData.append('lessonId', this.state.paramsData.id);
            formData.append('payType', payType);
            let opts = {
                body: formData,
                method: "POST"
            };
            fetch(url, opts)
                .then((response) => response.json())
                .then((res) => {
                    if (res.code == 0) {
                        Alert.alert(
                            '提示',
                            '支付成功',
                            [
                                { text: "确定", onPress: () => this.gotoOrderDetails() }
                            ]
                        );
                        this.getBalance(this.state.userInfo.id);
                    } else {
                        Alert.alert('支付出错，请选择其他支付方式');
                    }
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                    Alert.alert('支付出错，请选择其他支付方式');
                })
        } else {
            payType = '0';
        }
        console.log(this.state.PayText);
        console.log(payType);
    }
    componentDidMount() {
        console.log(this.props.navigation.state.params.data);
        if (this.props.navigation.state.params.data) {
            this.setState({
                paramsData: this.props.navigation.state.params.data
            })
        }
        // 用户信息
        AsyncStorage.getItem('userInfo')
            .then(result => {
                this.setState({
                    userInfo: JSON.parse(result)
                })
                // 获取余额
                this.getBalance();
            }).catch(error => {
                console.log("读取失败");
            })
    }

}

const styles = StyleSheet.create({
    containerAppEntertoPay: {
        flex: 1,
        backgroundColor: "#F3F3F3"
    },
    MypageChild: {
        width: "100%",
        paddingBottom: 15,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40
    },
    MypageChild1: {
        flexDirection: "row",
        marginTop: 5
    },
    MypageChild2: {
        marginTop: 5,
    },
    pagechild2Text1: {
        color: "#767676",
        fontSize: 13
    },
    pagechild2Text2: {
        color: "#323232",
        fontSize: 32,
        fontWeight: "bold",
        paddingTop: 6
    },
    pageChild3: {
        width: "92%",
        borderRadius: 3,
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: "4%",
        height: 60,
        paddingTop: 8,
        paddingBottom: 8
    },
    pageChild4: {
        width: "92%",
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: "4%",
        paddingTop: 10
    },
    pageChild5: {
        width: "92%",
        borderRadius: 3,
        backgroundColor: "#FFFFFF",
        marginLeft: "4%"
    },
    pageChild41: {
        width: "92%",
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: "4%",
        borderBottomWidth: 1,
        borderBottomColor: "#EAEAEA",
        paddingTop: 10,
        paddingBottom: 10
    },
    pageChild51: {
        width: "92%",
        borderRadius: 3,
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: "4%",
        borderBottomWidth: 1,
        borderBottomColor: "#EAEAEA",
        paddingTop: 16,
        paddingBottom: 8
    },
    pageChild51N: {
        width: "92%",
        borderRadius: 3,
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: "4%",
        paddingTop: 16,
        paddingBottom: 8
    },
    pageChild31x: {
        width: 1,
        backgroundColor: "#A97B5B",
        opacity: 0.1,
        height: "100%"
    },
    pageChild31: {
        flexDirection: "row",
        width: '49%',
        justifyContent: "center"
    },
    pageChild32: {
        flexDirection: "row",
        width: "49%",
        justifyContent: "center"
    },
    CzText: {
        color: "#A97B5B",
        fontSize: 16,
        paddingLeft: 10,
        fontWeight: "bold"
    },
    TxText: {
        color: "#A97B5B",
        fontSize: 16,
        paddingLeft: 10,
        fontWeight: "bold"
    },
    pageChild4Text: {
        fontSize: 13,
        color: "#B2B2B2"
    },
    pageChild5Text: {
        color: "#282828",
        fontSize: 14,
        paddingBottom: 6
    },
    pageChild6Text: {
        color: "#B2B2B2",
        fontSize: 13
    },
    pageChild7Text: {
        fontSize: 13,
        color: "#A97B5B"
    },
    pageChild8Text: {
        color: "#A97B5B",
        fontSize: 21
    },
    DemoBack: {
        position: 'absolute',
        backgroundColor: "#333333",
        width: width,
        height: height,
        opacity: 0.5,
        zIndex: 3,
        top: 0
    },
    modalSty2: {
        width: "94%",
        backgroundColor: "#FFFFFF",
        marginLeft: "3%",
        paddingBottom: 15,
        marginTop: 20
    },
    modalSty: {
        width: "92%",
        left: "4%",
        position: "absolute",
        bottom: height * 0.25,
        backgroundColor: "#FFFFFF",
        zIndex: 2,
        paddingBottom: 15
    },
    tieCon: {
        width: "94%",
        marginLeft: "3%",
        paddingTop: 18
    },
    tieCon2: {
        flexDirection: "row",
        width: "94%",
        marginLeft: "3%",
        paddingTop: 18,
        borderBottomColor: "#EAEAEA",
        borderBottomWidth: 1,
        paddingBottom: 14
    },
    xzzhifnCon: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "94%",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#DDDDDD",
        marginLeft: "3%"
    },
    xzzhifnConN: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "94%",
        alignItems: "center",
        marginLeft: "3%"
    },
    xzzhifnCon1: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10
    },
    CEtEXT: {
        color: "#282828",
        fontSize: 15,
        paddingLeft: 10
    },
    tieConText: {
        color: "#B2B2B2",
        fontSize: 14
    },
    shurukacon: {
        width: "94%",
        marginLeft: "3%",
        marginTop: 10
    },
    shurukacon5: {
        width: "94%",
        marginLeft: "3%",
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#DDDDDD",
        paddingBottom: 15
    },
    shurukacon2: {
        width: "94%",
        marginLeft: "3%",
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#EAEAEA",
        paddingBottom: 12
    },
    shurukacon3: {
        width: "94%",
        backgroundColor: "#B06F42",
        marginLeft: "3%",
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#EAEAEA",
        paddingTop: 12,
        paddingBottom: 12
    },
    shurukacon4: {
        width: "94%",
        marginLeft: "3%",
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 6,
        paddingBottom: 6
    },
    zdyInputSty: {
        backgroundColor: "#F3F3F3",
        height: 40,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5
    },
    shurukacon2Text1: {
        color: "#767676",
        fontSize: 13
    },
    shurukacon2Text2: {
        color: "#1CACEB",
        fontSize: 13
    },
    shurukacon3Text: {
        color: "#FFFFFF",
        fontSize: 17
    },
    shurukacon4Text: {
        color: "#B2B2B2",
        fontSize: 13
    },
    tieCon21: {
        color: "#282828",
        fontSize: 14,
        paddingLeft: 10
    },
    tieCon22: {
        color: "#C22525",
        fontSize: 14
    },
    tieCon23: {
        fontSize: 23,
        color: "#C22525"
    }
});
