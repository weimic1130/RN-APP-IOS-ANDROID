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
export default class EntertoPay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: '',
            userData: '',
            modalVisible: false,
            topUp: false,
            payState1: false,
            payState2: false,
            payState3: false
        }
    }

    static navigationOptions = {
        headerTitle: '报考支付',
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
                <View style={styles.modalSty2}>
                    <View style={styles.tieCon2}>
                        {
                            this.state.userData ?  this.EnterLevel(this.state.userData.kaoshiLevel) : null
                        }
                        {/*<View style={{flexDirection: "row"}}>*/}
                        {/*    <Image source={require('./Images/qb1.png')}/>*/}
                        {/*    <Text style={styles.tieCon21}>圆明三级</Text>*/}
                        {/*</View>*/}
                        {/*<View>*/}
                        {/*    <Text style={styles.tieCon22}>￥<Text style={styles.tieCon23}>416</Text></Text>*/}
                        {/*</View>*/}
                    </View>
                    <View style={styles.tieCon}>
                        <Text style={styles.tieConText}>支付方式</Text>
                    </View>
                    <View>
                        <View style={styles.xzzhifnConN}>
                            <View style={styles.xzzhifnCon1}>
                                <Image source={require('./Images/yue.png')}/>
                                <Text style={styles.CEtEXT}>余额支付</Text>
                            </View>
                            <TouchableWithoutFeedback onPress={() => this.choosePay('余额')}>
                                <Image style={{width: 25, height: 25}} source={this.state.payState3 ? require('./Images/xz.png') : require('./Images/wx.png')}/>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={styles.xzzhifnConN}>
                            <View style={styles.xzzhifnCon1}>
                                <Image source={require('./Images/zhifubao.png')}/>
                                <Text style={styles.CEtEXT}>支付宝</Text>
                            </View>
                            <TouchableWithoutFeedback onPress={() => this.choosePay('支付宝')}>
                                <Image style={{width: 25, height: 25}} source={this.state.payState1 ? require('./Images/xz.png') : require('./Images/wx.png')}/>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={styles.xzzhifnConN}>
                            <View style={styles.xzzhifnCon1}>
                                <Image source={require('./Images/weixin.png')}/>
                                <Text style={styles.CEtEXT}>微信</Text>
                            </View>
                            <TouchableWithoutFeedback onPress={() => this.choosePay('微信')}>
                                <Image style={{width: 25, height: 25}} source={this.state.payState2 ? require('./Images/xz.png') : require('./Images/wx.png')}/>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
                <View>
                    <View style={styles.shurukacon3}>
                        <Text style={styles.shurukacon3Text}>确定支付</Text>
                    </View>
                </View>
            </View>
        );
    }

    // 报考等级
    EnterLevel = (type) => {
        switch (type) {
            case 1:
                return (
                    <View style={{flexDirection: "row",alignItems:"center"}}>
                        <Image style={{width:35,height:35}} source={require('./Images/bkzfh.png')}/>
                        <Text style={styles.tieCon21}>弘毅一级</Text>
                    </View>
                )
                break;
            case 2:
                return (
                    <View style={{flexDirection: "row",alignItems:"center"}}>
                        <Image source={require('./Images/bkzfh.png')}/>
                        <Text style={styles.tieCon21}>弘毅二级</Text>
                    </View>
                )
                break;
            case 3:
                return (
                    <View style={{flexDirection: "row",alignItems:"center"}}>
                        <Image source={require('./Images/bkzfh.png')}/>
                        <Text style={styles.tieCon21}>弘毅三级</Text>
                    </View>
                )
                break;
            case 4:
                return (
                    <View style={{flexDirection: "row",alignItems:"center"}}>
                        <Image source={require('./Images/bkzfz.png')}/>
                        <Text style={styles.tieCon21}>归真一级</Text>
                    </View>
                )
                break;
            case 5:
                return (
                    <View style={{flexDirection: "row",alignItems:"center"}}>
                        <Image source={require('./Images/bkzfz.png')}/>
                        <Text style={styles.tieCon21}>归真二级</Text>
                    </View>
                )
                break;
            case 6:
                return (
                    <View style={{flexDirection: "row",alignItems:"center"}}>
                        <Image source={require('./Images/bkzfz.png')}/>
                        <Text style={styles.tieCon21}>归真三级</Text>
                    </View>
                )
                break;
            case 7:
                return (
                    <View style={{flexDirection: "row",alignItems:"center"}}>
                        <Image source={require('./Images/bkzfm.png')}/>
                        <Text style={styles.tieCon21}>圆明一级</Text>
                    </View>
                )
                break;
            case 8:
                return (
                    <View style={{flexDirection: "row",alignItems:"center"}}>
                        <Image source={require('./Images/bkzfm.png')}/>
                        <Text style={styles.tieCon21}>圆明二级</Text>
                    </View>
                )
                break;
            case 9:
                return (
                    <View style={{flexDirection: "row",alignItems:"center"}}>
                        <Image source={require('./Images/bkzfm.png')}/>
                        <Text style={styles.tieCon21}>圆明三级</Text>
                    </View>
                )
                break;
            default:
                return(
                    <View style={{flexDirection: "row",alignItems:"center"}}>
                        <Image source={require('./Images/bkzfh.png')}/>
                        <Text style={styles.tieCon21}>弘毅一级</Text>
                    </View>
                )
        }
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

    componentDidMount() {
        if (this.props.navigation.state.params) {
            this.setState({
                userInfo: this.props.navigation.state.params.userInfo,
                userData: this.props.navigation.state.params.data
            })
        }
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
        justifyContent: "space-between",
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
