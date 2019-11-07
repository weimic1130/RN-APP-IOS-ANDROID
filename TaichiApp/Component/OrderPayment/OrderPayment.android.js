/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';

let num = 1;
// icon
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { JFAPI } from './API/API';
import Alipay from '../Utils/Ailpay';
import { createStackNavigator, StackActions, NavigationActions, createAppContainer } from "react-navigation";
import {
    NativeModules,
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
import AsyncStorage from "@react-native-community/async-storage";
import * as WeChat from "react-native-wechat";
import global from '../global';
let { width, height } = Dimensions.get('window');
export default class OrderPaymentAndroid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buyNum: 0,
            // 余额
            balance: '',
            allData: '',
            addressId: '',
            payPrice: '0.00',
            PayType: '微信',
            goodsList: '',
            DefaultuserAddress: '',
            userInfo: '',
            goodsNum: num,
            goumaishuliang: '',
            modalVisible: false,
            topUp: false,
            payState1: false,
            payState2: true,
            payState3: false,
            payWay: true
        }
        //wx6695722a5c235237
        WeChat.registerApp('wxee2a0bd18951f6b8');
    }

    static navigationOptions = {
        headerTitle: '订单支付',
        headerStyle: {
            backgroundColor: "#323232"
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
            fontWeight: 'bold'
        },
    };

    // ShippingAddressPage
    render() {
        return (
            <View style={styles.containerAppEntertoPayOr}>
                <ScrollView style={{ marginBottom: 40 }}>
                    <View style={{ width: width, backgroundColor: "#FFFFFF" }}>
                        {/*顶部*/}
                        {
                            this.state.DefaultuserAddress ? <TouchableWithoutFeedback onPress={() => this.selectAddress()}>
                                <View style={styles.modalSty4}>
                                    <Text style={styles.modalSty4Text1}>{this.state.DefaultuserAddress.name} {this.state.DefaultuserAddress.tel}</Text>
                                    <Text style={styles.modalSty4Text2}>{this.state.DefaultuserAddress.address}</Text>
                                    <Image style={styles.LeftImgSize} source={require('./Images/left.png')} />
                                </View>
                            </TouchableWithoutFeedback> :
                                <TouchableWithoutFeedback onPress={() => this.selectAddress()}>
                                    <View style={styles.modalSty4}>
                                        <Text style={styles.modalSty4Text1}>请选择收货地址</Text>
                                        <Image style={styles.LeftImgSize} source={require('./Images/left.png')} />
                                    </View>
                                </TouchableWithoutFeedback>
                        }
                        {/*支付方式*/}
                        <View style={styles.modalSty2}>
                            {
                                this.state.goodsList.length > 0 ? this.state.goodsList.map((item, index) => {
                                    return (
                                        <View key={index} style={styles.tieCon2}>
                                            <View style={{ flexDirection: "row" }}>
                                                <Image style={{ width: 120, height: 75 }} source={{ uri: global.PicUr + item.broadImg }} />
                                            </View>
                                            <View style={{ width: "65%", paddingLeft: 10, justifyContent: "space-between" }}>
                                                <Text numberOfLines={3} ellipsizeMode="tail"
                                                    style={{ color: "#282828", fontSize: 15, paddingBottom: 7 }}>{item.title}</Text>
                                                <Text style={{ paddingBottom: 7 }} numberOfLines={1} ellipsizeMode="tail">{item.specName}</Text>
                                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                                    <Text style={styles.tieCon22}>￥<Text style={styles.tieCon23}>{item.buyPrice / 100}/{item.unit} <Text
                                                        style={styles.tieCon22}>x{item.num}</Text></Text></Text>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                }) : null
                            }
                            {/*支付金额*/}
                            <View style={styles.modalSty5}>
                                <View style={styles.modalSty5Child}>
                                    <Text style={styles.modalSty4Text3}>购买数量：</Text>
                                    <Text style={styles.modalSty4Text3}>{this.state.goumaishuliang}</Text>
                                </View>
                                <View style={styles.modalSty5Child}>
                                    <Text style={styles.modalSty4Text3}>支付金额：</Text>
                                    <Text>￥{this.state.payPrice ? this.state.payPrice : '0.00'}</Text>
                                </View>
                                <View style={styles.modalSty5Child}>
                                    <Text style={styles.modalSty4Text3}>总运费：</Text>
                                    <Text>{this.state.allData.totalLogisticsMoney == 0 ? '免运费' : this.state.allData.totalLogisticsMoney / 100}</Text>
                                </View>
                            </View>
                            {
                                this.state.payWay ? <View>
                                    <View style={styles.tieCon}>
                                        <Text style={styles.tieConText}>支付方式</Text>
                                    </View>
                                    <View>
                                        {
                                            this.state.balance > 0 ? <View style={styles.xzzhifnConN}>
                                                <View style={styles.xzzhifnCon1}>
                                                    <Image source={require('./Images/yue.png')} />
                                                    <Text style={styles.CEtEXT}>余额支付（余额：￥{this.state.balance > 0 ? this.state.balance : '0.00'}）</Text>
                                                </View>
                                                <TouchableWithoutFeedback onPress={() => this.choosePay('余额')}>
                                                    <Image style={{ width: 25, height: 25 }} source={this.state.payState3 ? require('./Images/xz.png') : require('./Images/wx.png')} />
                                                </TouchableWithoutFeedback>
                                            </View> : <View style={styles.xzzhifnConN}>
                                                    <View style={styles.xzzhifnCon1}>
                                                        <Image source={require('./Images/yue.png')} />
                                                        <Text style={styles.CEtEXT}>余额支付（余额：￥{this.state.balance > 0 ? this.state.balance : '0.00'}）</Text>
                                                    </View>
                                                    <TouchableWithoutFeedback>
                                                        <Image style={{ width: 25, height: 25 }} source={require('./Images/yuebuzu.png')} />
                                                    </TouchableWithoutFeedback>
                                                </View>
                                        }
                                        <View style={styles.xzzhifnConN}>
                                            <View style={styles.xzzhifnCon1}>
                                                <Image source={require('./Images/zhifubao.png')} />
                                                <Text style={styles.CEtEXT}>支付宝</Text>
                                            </View>
                                            <TouchableWithoutFeedback onPress={() => this.choosePay('支付宝')}>
                                                <Image style={{ width: 25, height: 25 }} source={this.state.payState1 ? require('./Images/xz.png') : require('./Images/wx.png')} />
                                            </TouchableWithoutFeedback>
                                        </View>
                                        <View style={styles.xzzhifnConNW}>
                                            <View style={styles.xzzhifnCon1}>
                                                <Image source={require('./Images/weixin.png')} />
                                                <Text style={styles.CEtEXT}>微信</Text>
                                            </View>
                                            <TouchableWithoutFeedback onPress={() => this.choosePay('微信')}>
                                                <Image style={{ width: 25, height: 25 }} source={this.state.payState2 ? require('./Images/xz.png') : require('./Images/wx.png')} />
                                            </TouchableWithoutFeedback>
                                        </View>
                                    </View>
                                </View> : null
                            }
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.OrderBtm}>
                    <View style={styles.shurukacon3}>
                        <Text style={styles.shurukacon3BtmText}>总计：
                            <Text
                                style={styles.shurukacon3BtmText2}>{this.state.allData.totalLogisticsMoney == 0 ? this.state.payPrice : (this.state.payPrice * 1 + (this.state.allData.totalLogisticsMoney / 100))}</Text></Text>
                        <TouchableWithoutFeedback onPress={() => this.payOrder()}>
                            <View style={styles.shurukacon3BtmR}>
                                <Text style={styles.shurukacon3BtmRText}>立即支付</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </View>
        );
    }

    // 支付订单
    payOrder = () => {
        if (this.state.PayType == "") {
            Alert.alert('请选择支付方式');
            return;
        }
        if (this.state.PayType == 2) {
            this.balancePay();
        } else {
            let formData = new FormData();
            formData.append('userId', this.state.userInfo.id);
            formData.append('goodsInfo', JSON.stringify(this.state.goodsList))
            let url = JFAPI.goodsSettlement;
            let opts = {
                method: 'POST',
                body: formData
            };
            console.log(url);
            console.log(opts);
            fetch(url, opts)
                .then((response) => response.json())
                .then((res) => {
                    if (res.code == 0) {
                        let Porder = JFAPI.getOrder;
                        let PayformData = new FormData();
                        PayformData.append('userId', this.state.userInfo.id);
                        PayformData.append('goodsInfo', JSON.stringify(this.state.goodsList));
                        PayformData.append('addressId', this.state.DefaultuserAddress.id);
                        PayformData.append('payType', this.state.PayType == '微信' ? 0 : this.state.PayType);
                        let opts = {
                            method: 'POST',
                            body: PayformData
                        };
                        // 下单
                        fetch(Porder, opts)
                            .then((response) => response.json())
                            .then((res) => {
                                console.log("支付下单结果", res);
                                if (res.code == 0) {
                                    this.confirmPayment(res.data)
                                } else {
                                    Alert.alert(res.info);
                                }
                            })
                            .catch((error) => {
                                console.log(error);
                            })
                    } else if (res.code == -1) {
                        Alert.alert(res.info)
                    } else {
                        Alert.alert("网络问题，请稍后在支付");
                    }
                    console.log(res);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
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
    // 余额支付
    balancePay = () => {
        // getOrder
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
                if (res.code == 0) {
                    // Alert.alert(
                    //     '提示',
                    //     '支付成功',
                    //     [
                    //         {text: "确定", onPress: () => this.gotoOrderDetails()}
                    //     ]
                    // );
                    this.getBalance(this.state.userInfo.id);
                    let reseAction = StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({ routeName: 'PaymentAlsoN' })]
                    })
                    self.props.navigation.dispatch(reseAction);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }
    gotoOrderDetails = () => {
        let reseAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'MypageN' })]
        })
        this.props.navigation.dispatch(reseAction);
    }

    // 微信支付
    async wxPayAction(wxDic) {
        let self = this;
        WeChat.isWXAppInstalled()
            .then((isInstalled) => {
                if (isInstalled) {
                    // console.log('支付字段wxdic',wxDic);
                    WeChat.pay(wxDic).then((requestJson) => {
                        // console.log('支付回调', requestJson);
                        // console.log(requestJson.errCode);
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
                    }).catch((err) => {
                            console.log('支付出错',err);
                        })
                } else {
                    Alert.alert('尚未安装微信，请先下载微信')
                }
            })
    }

    // 支付宝支付
    async pay(res) {
        let self = this;
        let ret = await Alipay.pay(res);
        if (ret.result) {
            let reseAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'PaymentAlsoN' })]
            })
            self.props.navigation.dispatch(reseAction);
        } else {
            console.log('取消支付');
        }
    }

    confirmPayment = (parameter) => {
        // console.log("支付参数", parameter);
        let self = this;
        let PayUrl = JFAPI.payment;
        let formData = new FormData();
        formData.append('batchId', parameter);
        formData.append('userId', this.state.userInfo.id);
        formData.append('subject', '购物车');
        formData.append('logisticsMoney', this.state.allData.totalLogisticsMoney == 0 ? 0 : this.state.allData.totalLogisticsMoney / 100);
        let opts = {
            method: 'POST',
            body: formData
        };
        fetch(PayUrl, opts)
            .then((response) => response.json())
            .then((res) => {
                console.log('支付', res);
                if (res.code == 0) {
                    console.log('支付类型', this.state.PayType);
                    if (this.state.PayType == "微信") {
                        this.wxPayAction(res.data);
                    } else if (this.state.PayType == 1) {
                        if (res.data.payInfo) {
                            // 支付宝
                            this.pay(res.data.payInfo);
                        }
                    }
                } else if (res.code == -1) {
                    Alert.alert(res.info);
                }
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            })
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
                PayType: 1,
                payState1: true,
                payState2: false,
                payState3: false
            })
            if (this.state.payState1 == false) {
                this.setState({
                    payState1: true
                })
            } else {
                this.setState({
                    payState1: false
                })
            }
        } else if (text == "微信") {
            this.setState({
                PayType: '微信',
                payState1: false,
                payState2: true,
                payState3: false
            })
            if (this.state.payState2 == false) {
                this.setState({
                    payState2: true
                })
            } else {
                this.setState({
                    payState2: false
                })
            }
        } else if (text == "余额") {
            this.setState({
                PayType: 2,
                payState1: false,
                payState2: false,
                payState3: true
            })
            if (this.state.payState3 == false) {
                this.setState({
                    payState3: true
                })
            } else {
                this.setState({
                    payState3: false
                })
            }
        }
    }
    openPayWay = () => {
        let self = this;
        if (this.state.payWay == true) {
            this.setState({
                payWay: false
            })
        } else if (this.state.payWay == false) {
            this.setState({
                payWay: true
            })
        }
    }
    MinNum = () => {
        this.setState({
            goodsNum: num--
        })
    }
    MaxNum = () => {
        num += 1
        this.setState({
            goodsNum: num
        })
    }

    componentDidMount() {
        // 用户信息
        AsyncStorage.getItem('userInfo')
            .then(result => {
                this.setState({
                    userInfo: JSON.parse(result)
                })
                // 获取用户默认地址
                this.getUserAddress(this.state.userInfo.id);
                // 获取余额
                this.getBalance();
            }).catch(error => {
                console.log("读取失败");
            })
        if (this.props.navigation.state.params.data) {
            // 获取参数
            this.setState({
                goodsList: this.props.navigation.state.params.data.goodsList,
                allData: this.props.navigation.state.params.data
            })
            let dataList = this.props.navigation.state.params.data.goodsList;
            // goumaiNum
            let goodsData = this.props.navigation.state.params.data.goodsList;
            let price = 0;
            let spNum = 0;
            for (let i = 0; i < goodsData.length; i++) {
                price = price + goodsData[i].buyPrice * goodsData[i].num;
                spNum = spNum + goodsData[i].num
            }
            this.setState({
                payPrice: (price / 100).toFixed(2),
                goumaishuliang: spNum
            })
        } else {
            // 获取参数
            this.setState({
                goodsList: this.props.navigation.state.params.goodsList,
            })
            let goodsData = this.props.navigation.state.params.goodsList;
            let price = 0;
            let spNum = 0;
            for (let i = 0; i < goodsData.length; i++) {
                price = price + goodsData[i].buyPrice * goodsData[i].num;
                spNum = spNum + goodsData[i].num
            }
            this.setState({
                payPrice: (price / 100).toFixed(2),
                goumaishuliang: spNum
            })
        }
    }

    // 前往地址详情页
    selectAddress = () => {
        let self = this;
        this.props.navigation.navigate('ShippingAddress2N', {
            arefresh: function () {
                self.getUserAddress(self.state.userInfo.id);
            }
        });
    }
    // 获取默认地址
    getUserAddress = (id) => {
        let url = JFAPI.userAddress;
        let formData = new FormData();
        formData.append('userId', id)
        let opts = {
            method: "POST",
            body: formData
        }
        fetch(url, opts)
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
                if (responseData.code == 0) {
                    if (responseData.data) {
                        this.setState({
                            DefaultuserAddress: responseData.data
                        })
                    } else {
                        this.setState({
                            DefaultuserAddress: ''
                        })
                    }
                }
            })
            .catch((error) => {
                this.setState({
                    DefaultuserAddress: ''
                })
                console.log(error);
            })
    }
}

const styles = StyleSheet.create({
    containerAppEntertoPayOr: {
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
        paddingBottom: 15
    },
    modalSty3: {
        width: "94%",
        backgroundColor: "#FFFFFF",
        marginLeft: "3%",
        borderBottomWidth: 1,
        borderBottomColor: "#EAEAEA",
        flexDirection: "row",
        paddingBottom: 10,
        paddingTop: 10,
        alignItems: "center"
    },
    modalSty5: {
        width: "94%",
        backgroundColor: "#FFFFFF",
        marginLeft: "3%",
        borderBottomWidth: 1,
        borderBottomColor: "#EAEAEA",
        paddingBottom: 10,
        paddingTop: 10,
        justifyContent: "space-between"
    },
    modalSty5Child: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        paddingBottom: 5,
        paddingTop: 5,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    modalSty4: {
        width: "94%",
        backgroundColor: "#FFFFFF",
        marginLeft: "3%",
        borderBottomWidth: 1,
        borderBottomColor: "#EAEAEA",
        height: 60,
        justifyContent: "center"
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
    xzzhifnConNW: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#EAEAEA",
        width: "94%",
        alignItems: "center",
        marginLeft: "3%",
        paddingBottom: 5
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
        width: "100%",
        // backgroundColor: "#B06F42",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#EAEAEA",
        height: 40
    },
    shurukacon6: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#EAEAEA",
        height: 40
    },
    shurukacon7: {
        width: "100%",
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: "#F8F8F8"
    },
    shurukacon8: {
        width: "100%",
        flexDirection: "row",
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "#FFFFFF",
        justifyContent: "flex-end",
        paddingRight: 10
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
        fontSize: 20,
        color: "#C22525"
    },
    modalSty3Text: {
        color: "#282828",
        fontSize: 14,
        fontWeight: "400",
        paddingLeft: 10
    },
    LeftImgSize: {
        position: "absolute",
        right: 8,
        top: 25
    },
    modalSty4Text3: {
        color: "#282828",
        fontSize: 14
    },
    modalSty4Text4: {
        color: "#B2B2B2",
        fontSize: 14,
        paddingRight: 6
    },
    modalSty4Text1: {
        color: "#282828",
        fontSize: 14
    },
    modalSty4Text2: {
        color: "#B2B2B2",
        fontSize: 14,
        paddingTop: 6
    },
    OrderBtm: {
        position: "absolute",
        bottom: 0,
        width: width,
        backgroundColor: "#FFFFFF",
        height: 40
    },
    shurukacon3BtmText: {
        color: "#282828",
        fontSize: 15,
        paddingLeft: 8
    },
    shurukacon3BtmText2: {
        color: "#C22525",
        fontSize: 15,
        fontWeight: "500"
    },
    shurukacon3BtmR: {
        backgroundColor: "#B06F42",
        width: 110,
        height: 40,
        alignItems: "center",
        justifyContent: "center"
    },
    shurukacon3BtmR2: {
        flexDirection: "row",
        width: 110,
        height: 40,
        alignItems: "center",
        justifyContent: "center"
    },
    shurukacon3BtmRText: {
        color: "#F7F7F7",
        fontSize: 15
    },
    shurukacon3BtmRText2: {
        color: "#B2B2B2",
        fontSize: 13,
        paddingRight: 5
    },
    shurukacon71: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: 30,
        alignItems: "center",
        paddingLeft: 8,
        paddingRight: 8
    },
    shurukacon711: {
        color: "#282828",
        fontSize: 13
    },
    shurukacon712: {
        color: "#767676",
        fontSize: 13
    },
    shurukacon73: {
        borderWidth: 1,
        borderColor: "#56C1FF",
        backgroundColor: "#EBF7FF",
        borderRadius: 4
    },
    shurukacon74Text: {
        color: "#65BCFF",
        fontSize: 13
    },
    shurukacon73Text: {
        color: "#65BCFF",
        fontSize: 10,
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 8,
        paddingRight: 8
    },
    shurukacon7142: {
        color: "#FF8E4F",
        fontSize: 10,
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 8,
        paddingRight: 8
    },
    shurukacon714: {
        borderWidth: 1,
        borderColor: "#FF8256",
        backgroundColor: "#FFF0EB",
        borderRadius: 4
    },
    shurukacon71Text: {
        color: "#FF8E4F",
        fontSize: 13
    },
    shurukacon8Text1: {
        color: "#282828",
        fontSize: 14
    },
    shurukacon8Text2: {
        color: "#FF3620",
        fontSize: 18
    }
});
