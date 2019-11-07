/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
let num = 1;
// icon
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {createStackNavigator, StackActions, NavigationActions, createAppContainer} from "react-navigation";
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
    TextInput,
    TouchableWithoutFeedback,
    View,
    ScrollView,
    Animated, Modal
} from "react-native";

let {width, height} = Dimensions.get('window');
export default class OrderDetailsAndroid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goodsNum:num,
            modalVisible: false,
            topUp: false,
            payState1: false,
            payState2: false,
            payState3: false,
            payWay: false,
            payDetail: false
        }
    }

    static navigationOptions = {
        headerTitle: '订单详情',
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
            <View style={styles.containerAppEntertoPayOr}>
                <View style={{width: width, backgroundColor: "#FFFFFF"}}>
                    {/*顶部*/}
                    <View style={styles.modalSty4}>
                        <View style={{flexDirection:"row"}}>
                            <Image source={require('./Images/yifahuo.png')} />
                            <Text style={styles.modalSty4Text1}>卖家已发货</Text>
                        </View>
                        <Text style={styles.modalSty4Text2}>剩余10天23小时自动收货</Text>
                    </View>
                    <View style={styles.orderLinSty}></View>
                    {/*支付方式*/}
                    <View style={styles.modalSty2}>
                        <View style={styles.tieCon2}>
                            <View style={{flexDirection: "row"}}>
                                <Image style={{width: 90, height: 90}} source={require('./Images/bj.png')}/>
                            </View>
                            <View style={{width: "75%", paddingLeft: 10, justifyContent: "space-between"}}>
                                <Text numberOfLines={2} ellipsizeMode="tail"
                                      style={{color: "#282828", fontSize: 15, paddingBottom: 7}}>悠然太极球一式悠然太极球一式悠然太极球一式悠然太极球一式悠然太极球一式悠然太极球一式悠然太极球一式悠然太极球一式悠然太极球一式</Text>
                                <View>
                                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.tieCon223}>数量:1   500克特惠装</Text>
                                    <Text style={styles.tieCon22}>￥<Text style={styles.tieCon23}>416</Text></Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.modalSty5}>
                            <Text style={styles.modalSty4Text3}>商品总价：<Text>￥891.00</Text></Text>
                            <Text style={styles.modalSty4Text3}>会员折扣：<Text>￥-5.00</Text></Text>
                            <Text style={styles.modalSty4Text3}>运费：<Text>￥5.00</Text></Text>
                            <Text style={styles.modalSty4Text3}>实付金额：<Text>￥896.00</Text></Text>
                        </View>
                        <View style={styles.modalSty5}>
                            <Text style={styles.modalSty4Text3}>收货人：王先生</Text>
                            <Text style={styles.modalSty4Text3}>收货地址：福建省厦门市集美区软件园三期2号楼8层</Text>
                        </View>
                        <View style={styles.modalSty5N}>
                            <Text style={styles.modalSty4Text3}>订单编号：9058d9289r025dh3</Text>
                            <Text style={styles.modalSty4Text3}>支付方式：钱包支付</Text>
                            <Text style={styles.modalSty4Text3}>付款时间：2019年09月07日  16:33</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.OrderBtm}>
                    <View style={styles.shurukacon3}>
                        <View style={styles.shurukacon3L}>
                            <Image source={require('./Images/shangjia.png')} />
                            <Text style={styles.shurukacon3LText}>联系商家</Text>
                        </View>
                        <View style={styles.zjhdx}></View>
                        <View style={styles.shurukacon3R}>
                            <Image source={require('./Images/tuikuang.png')} />
                            <Text style={styles.shurukacon3LText}>申请退款</Text>
                        </View>
                    </View>
                </View>
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
                    payState1: true
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
                    payState2: true
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
    openPayDetails = () => {
        if (this.state.payDetail == false) {
            this.setState({
                payDetail: true
            })
        } else if (this.state.payDetail == true) {
            this.setState({
                payDetail: false
            })
        }
    }
    MinNum = () => {
        this.setState({
            goodsNum:num --
        })
    }
    MaxNum = () =>{
        num += 1
        this.setState({
            goodsNum:num
        })
    }
    componentDidMount() {
        console.log("ios");
        // data
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
        width: "96%",
        backgroundColor: "#FFFFFF",
        marginLeft: "2%"
    },
    modalSty5: {
        width: "96%",
        backgroundColor: "#FFFFFF",
        marginLeft: "2%",
        borderBottomWidth: 1,
        borderBottomColor: "#EAEAEA",
        paddingBottom: 10,
        paddingTop: 15,
        justifyContent: "space-between"
    },
    modalSty5N:{
        width: "96%",
        backgroundColor: "#FFFFFF",
        marginLeft: "2%",
        paddingBottom: 10,
        paddingTop: 15,
        justifyContent: "space-between"
    },
    modalSty4: {
        width: "94%",
        backgroundColor: "#FFFFFF",
        marginLeft: "3%",
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
        width: "98%",
        marginLeft: "1%",
        paddingTop: 18,
        borderBottomColor: "#EAEAEA",
        borderBottomWidth: 1,
        paddingBottom: 14
    },
    xzzhifnCon: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "98%",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#DDDDDD",
        marginLeft: "1%"
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
        width: "100%",
        // backgroundColor: "#B06F42",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#EAEAEA",
        height: 50
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
        fontSize: 23,
        color: "#C22525"
    },
    LeftImgSize: {
        position: "absolute",
        right: 8,
        top: 25
    },
    modalSty4Text3: {
        color: "#282828",
        fontSize: 14,
        paddingBottom:8
    },
    modalSty4Text4: {
        color: "#B2B2B2",
        fontSize: 14,
        paddingRight: 6
    },
    modalSty4Text1: {
        color: "#282828",
        fontSize: 14,
        paddingLeft:8
    },
    modalSty4Text2: {
        color: "#B2B2B2",
        fontSize: 14,
        paddingTop: 9
    },
    OrderBtm: {
        position: "absolute",
        bottom: 0,
        width: width,
        backgroundColor: "#FFFFFF"
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
    },
    orderLinSty:{
        width:width,
        backgroundColor:"#F3F3F3",
        height:5
    },
    tieCon223:{
        color:"#B2B2B2",
        fontSize:13,
        paddingTop:5,
        paddingBottom:5
    },
    zjhdx:{
        width:1,
        backgroundColor:"#EDE0D7",
        height:25
    },
    shurukacon3L:{
        width:"48%",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center"
    },
    shurukacon3R:{
        width:"48%",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center"
    },
    shurukacon3LText:{
        color:"#B06F42",
        fontSize:16,
        paddingLeft:5
    }
});
