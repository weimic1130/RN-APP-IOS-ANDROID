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
export default class MyWallet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            topUp: false,
            payState1: false,
            payState2: false
        }
    }

    static navigationOptions = {
        headerTitle: '我的钱包',
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
            <View style={styles.containerAppMyWalle}>
                <ImageBackground style={{width: '100%', flex: 1}} source={require('./Images/bj.png')}>
                    <ScrollView style={{flex: 1}}>
                        {/*顶部头像区域*/}
                        <View style={styles.MypageChild}>
                            <Text style={styles.pagechild2Text1}>账户余额(元)</Text>
                            <Text style={styles.pagechild2Text2}>42500.00</Text>
                        </View>
                        <View style={styles.MypageChild1}>
                            <View style={styles.pageChild3}>
                                <TouchableWithoutFeedback onPress={() => this.withdrawal('1')}>
                                    <View style={styles.pageChild31}>
                                        <Image source={require('./Images/qb1.png')}/>
                                        <Text style={styles.CzText}>充值</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <View style={styles.pageChild31x}></View>
                                <TouchableWithoutFeedback onPress={() => this.withdrawal('2')}>
                                    <View style={styles.pageChild32}>
                                        <Image source={require('./Images/qb2.png')}/>
                                        <Text style={styles.TxText}>提现</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                        <View style={styles.MypageChild2}>
                            <View style={styles.pageChild4}>
                                <View style={styles.pageChild41}>
                                    <Text style={styles.pageChild4Text}>余额明细</Text>
                                </View>
                            </View>
                            <View style={styles.pageChild5}>
                                <View style={styles.pageChild51}>
                                    <View>
                                        <Text style={styles.pageChild5Text}>课程卖出</Text>
                                        <Text style={styles.pageChild6Text}>2019/01/07 11:22</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.pageChild7Text}>￥<Text style={styles.pageChild8Text}>415</Text></Text>
                                    </View>
                                </View>
                                <View style={styles.pageChild51}>
                                    <View>
                                        <Text style={styles.pageChild5Text}>课程卖出</Text>
                                        <Text style={styles.pageChild6Text}>2019/01/07 11:22</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.pageChild7Text}>￥<Text style={styles.pageChild8Text}>415</Text></Text>
                                    </View>
                                </View>
                                <View style={styles.pageChild51}>
                                    <View>
                                        <Text style={styles.pageChild5Text}>课程卖出</Text>
                                        <Text style={styles.pageChild6Text}>2019/01/07 11:22</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.pageChild7Text}>￥<Text style={styles.pageChild8Text}>415</Text></Text>
                                    </View>
                                </View>
                                <View style={styles.pageChild51}>
                                    <View>
                                        <Text style={styles.pageChild5Text}>课程卖出</Text>
                                        <Text style={styles.pageChild6Text}>2019/01/07 11:22</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.pageChild7Text}>￥<Text style={styles.pageChild8Text}>415</Text></Text>
                                    </View>
                                </View>
                                <View style={styles.pageChild51}>
                                    <View>
                                        <Text style={styles.pageChild5Text}>课程卖出</Text>
                                        <Text style={styles.pageChild6Text}>2019/01/07 11:22</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.pageChild7Text}>￥<Text style={styles.pageChild8Text}>415</Text></Text>
                                    </View>
                                </View>
                                <View style={styles.pageChild51}>
                                    <View>
                                        <Text style={styles.pageChild5Text}>课程卖出</Text>
                                        <Text style={styles.pageChild6Text}>2019/01/07 11:22</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.pageChild7Text}>￥<Text style={styles.pageChild8Text}>415</Text></Text>
                                    </View>
                                </View>
                                <View style={styles.pageChild51N}>
                                    <View>
                                        <Text style={styles.pageChild5Text}>课程卖出</Text>
                                        <Text style={styles.pageChild6Text}>2019/01/07 11:22</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.pageChild7Text}>￥<Text style={styles.pageChild8Text}>415</Text></Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    {/*提现方式*/}
                    <Modal animationType="slide" transparent={true} visible={this.state.modalVisible} onRequestClose={() => {
                        this.onRequestClose();
                    }}>
                        <View style={styles.modalSty}>
                            <View style={styles.tieCon}>
                                <Text style={styles.tieConText}>请选择提现方式</Text>
                            </View>
                            <View>
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
                            <View>
                                <View style={styles.shurukacon}>
                                    <TextInput style={styles.zdyInputSty} placeholder="在此输入提现金额"></TextInput>
                                </View>
                                <View style={styles.shurukacon2}>
                                    <Text style={styles.shurukacon2Text1}>可提现9.98元</Text>
                                    <Text style={styles.shurukacon2Text2}>全部提现</Text>
                                </View>
                                <View style={styles.shurukacon3}>
                                    <Text style={styles.shurukacon3Text}>确定提现</Text>
                                </View>
                            </View>
                            <View style={styles.shurukacon4}>
                                <Text style={styles.shurukacon4Text}>(24小时内到账,每日可提现一次)</Text>
                            </View>
                        </View>
                    </Modal>
                    {
                        this.state.modalVisible ? <View style={styles.DemoBack}></View> : null
                    }
                    {/*充值方式*/}
                    <Modal animationType="slide" transparent={true} visible={this.state.topUp} onRequestClose={() => {
                        this.onRequestClose();
                    }}>
                        <View style={styles.modalSty2}>
                            <View style={styles.tieCon}>
                                <Text style={styles.tieConText}>请选择充值方式</Text>
                            </View>
                            <View>
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
                            <View>
                                <View style={styles.shurukacon5}>
                                    <TextInput style={styles.zdyInputSty} placeholder="在此输入充值金额"></TextInput>
                                </View>
                                <View style={styles.shurukacon3}>
                                    <Text style={styles.shurukacon3Text}>确定充值</Text>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    {
                        this.state.topUp ? <View style={styles.DemoBack}></View> : null
                    }
                </ImageBackground>
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
                payState2: false
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
                payState2: true
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
        }
    }

    componentDidMount() {
    }

}

const styles = StyleSheet.create({
    containerAppMyWalle: {
        flex: 1,
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
        width: "92%",
        left: "4%",
        position: "absolute",
        bottom: height * 0.35,
        backgroundColor: "#FFFFFF",
        zIndex: 2,
        paddingBottom: 15
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
        paddingTop: 18,
        paddingBottom: 18,
        borderBottomWidth: 1,
        borderBottomColor: "#DDDDDD"
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
    }
});
