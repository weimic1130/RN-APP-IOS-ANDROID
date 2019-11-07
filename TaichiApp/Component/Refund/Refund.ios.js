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
    CameraRoll,
    NativeModules,
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
    Linking,
    TextInput,
    TouchableWithoutFeedback,
    View,
    ScrollView,
    Animated, Modal, Picker, Alert
} from "react-native";
import {JFAPI} from './API/API';
import AsyncStorage from "@react-native-community/async-storage";
import global from '../global';
let {width, height} = Dimensions.get('window');
export default class RefundIos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: '',
            userInfo: '',
            catchData: "",
            goodsList: "",
            logisticsMoney: '',
            // 退款金额
            refundMoney: '',
            // 退款原因
            reason: '',
            wRefundState: false,
            wRefundVal: 1,
            wRefundText: '请选择退款原因'
        }
    }

    static navigationOptions = {
        headerTitle: '退款',
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
                <View style={{width: width, flex: 1, backgroundColor: "#FFFFFF"}}>
                    <ScrollView style={{flex: 1}}>
                        <View style={styles.modalSty2}>
                            {
                                this.state.goodsList.length > 0 ? this.state.goodsList.map((item, index) => {
                                    return (
                                        <View key={index} style={styles.tieCon2}>
                                            <View style={{flexDirection: "row"}}>
                                                <Image style={{width: 90, height: 90}} source={{uri: global.PicUrl + item.goodsImg}}/>
                                            </View>
                                            <View style={{width: "75%", paddingLeft: 10, justifyContent: "space-between"}}>
                                                <Text numberOfLines={2} ellipsizeMode="tail"
                                                      style={{color: "#282828", fontSize: 15, paddingBottom: 7}}>{item.goodsTitle}</Text>
                                                <View>
                                                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.tieCon223}>数量:{item.num} {item.spec}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                }) : null
                            }
                            <View style={styles.orderLinSty}></View>
                            <View style={styles.modalSty5}>
                                <Text style={styles.modalSty4Text3}>退款金额：<Text style={styles.modalSty4Text34}>{this.state.refundMoney ? this.state.refundMoney : 0}</Text></Text>
                                <Text
                                    style={styles.modalSty4Text35}>最多退{this.state.refundMoney ? this.state.refundMoney : 0}{this.state.logisticsMoney == 0 ? null : ',含运费' + this.state.logisticsMoney + '元'}</Text>
                            </View>
                            <View style={styles.modalSty5}>
                                <Text style={styles.modalSty4Text3}>退款原因：</Text>
                                <TouchableWithoutFeedback onPress={() => this.openRefund()}>
                                    <View style={styles.modalSty51}>
                                        <Text style={styles.modalSty4Text32}>{this.state.wRefundText}</Text>
                                        <Image source={require('./Images/left.png')}/>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                            <View style={styles.modalSty53}>
                                <Text style={styles.modalSty53Text}>补充说明：</Text>
                                <TextInput value={this.state.reason} onChangeText={(text) => this.setState({reason: text})} maxLength={200} multiline={true} style={styles.SdsuInputR}
                                           placeholder="请描述问题,最多200字"></TextInput>
                            </View>
                            <TouchableWithoutFeedback onPress={() => this.aRefund()}>
                                <View style={styles.modalSty535}>
                                    <Text style={styles.modalSty535Text}>退款</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </ScrollView>
                </View>
                {
                    this.state.wRefundState ?
                        <Animated.View style={styles.mask}></Animated.View> : null
                }
                {/*退款原因*/}
                <Modal animationType="slide" transparent={true} visible={this.state.wRefundState} onRequestClose={() => {
                    this.onRequestClose();
                }}>
                    <View style={[styles.PickerSty]}>
                        <View style={[styles.PickerChlden]}>
                            <TouchableWithoutFeedback onPress={() => this.closePickerDemo(2)}>
                                <Text>取消</Text>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => this.closePickerDemo(1)}>
                                <Text style={{color: "#0E6AFF"}}>确定</Text>
                            </TouchableWithoutFeedback>
                        </View>
                        <Picker selectedValue={this.state.wRefundVal} mode='dropdown' style={[styles.PickerStyItem]}
                                itemStyle={{fontSize: 20, color: '#333333', textAlign: 'center', fontWeight: 'bold'}} onValueChange={(lang) => this.setState({wRefundVal: lang})}>
                            <Picker.Item label="拍错/不喜欢" value='1'/>
                            <Picker.Item label="未按照约定时间发货" value='2'/>
                            <Picker.Item label="其他" value='3'/>
                        </Picker>
                    </View>
                </Modal>
            </View>
        );
    }

    openRefund = () => {
        if (this.state.wRefundState == false) {
            this.setState({
                wRefundState: true
            })
        } else if (this.state.wRefundState == true) {
            this.setState({
                wRefundState: false
            })
        }
    }
    closePickerDemo = (parameter) => {
        let self = this;
        self.setState({
            wRefundState: false
        })
        if (parameter == 1) {
            if (self.state.wRefundVal == 1) {
                self.setState({
                    wRefundText: '拍错/不喜欢'
                })
            } else if (self.state.wRefundVal == 2) {
                self.setState({
                    wRefundText: '未按照约定时间发货'
                })
            } else if (self.state.wRefundVal == 3) {
                self.setState({
                    wRefundText: '其他'
                })
            }
        } else if (parameter == 2) {
        }
    }
    // 退款
    aRefund = () => {
        let self = this;
        if (self.state.wRefundText == '请选择退款原因') {
            Alert.alert('请先选择退款原因');
            return;
        }
        Alert.alert(
            '提示',
            '是否确认退款?',
            [
                {text: "取消"},
                {text: "确定", onPress: () => this.confirmRefund()}
            ]
        )
    }
    // 去除特殊字符
    excludeSpecial = (s) => {
        s = s.replace(/[\'\"\\\/\b\f\n\r\t]/g, '');
        // 去掉特殊字符
        s = s.replace(/[\@\#\$\%\^\&\*\(\)\{\}\:\"\L\<\>\?\[\]]/);
        return s;
    }
    // 确认退款
    confirmRefund = () => {
        let self = this;
        console.log(self.state.catchData);
        let reason = this.state.reason;
        let id = '';
        let logisticsMoney = this.state.logisticsMoney;
        let refundMoney = '';
        if (self.state.catchData.list) {
            id = self.state.catchData.orderId;
        } else {
            id = self.state.catchData.id;
        }
        if (logisticsMoney > 0) {
            refundMoney = (logisticsMoney + this.state.refundMoney * 100)
        } else {
            refundMoney = this.state.refundMoney * 100
        }
        if (self.state.wRefundVal == 1) {
            reason = '拍错/不喜欢';
        } else if (self.state.wRefundVal == 2) {
            reason = '未按照约定时间发货'
        } else if (self.state.wRefundVal == 3) {
            reason = '其他'
        }
        let url = JFAPI.applyRefund;
        let formData = new FormData();
        formData.append('orderId', id);
        formData.append('userId', this.state.userInfo.id);
        formData.append('reason', this.excludeSpecial(reason));
        formData.append('refundMoney', refundMoney);
        let opts = {
            method: "POST",
            body: formData
        }
        fetch(url,opts)
            .then((response) => response.json())
            .then((res) => {
                console.log(res);
                if(res.code == 0){
                    Alert.alert(
                        '提示',
                        '退款已提交，请等待处理',
                        [
                            {text:"确定",onPress:() => this.goBackPage()}
                        ]
                    )
                }else{
                    Alert.alert('退款失败，请稍后再试');
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
    goBackPage = () =>{
        this.props.navigation.goBack();
        this.props.navigation.state.params.refresf();
    }
    componentDidMount() {
        let self = this;
        // 用户信息
        AsyncStorage.getItem('userInfo')
            .then(result => {
                this.setState({
                    userInfo: JSON.parse(result)
                })
            }).catch((error) => {
            console.log("读取失败");
        })
        let data = this.props.navigation.state.params.data;
        let refundMoney = 0;
        let logisticsMoney = '';
        let ListArr = [];
        if (data.list) {
            for (let i = 0; i < data.list.length; i++) {
                ListArr.push(data.list[i]);
                refundMoney = refundMoney + data.list[i].totalMoney / 100
                logisticsMoney = (logisticsMoney + data.list[i].logisticsMoney)
            }
            this.setState({
                goodsList: ListArr,
                logisticsMoney: logisticsMoney
            })
        } else {
            ListArr.push(data)
            refundMoney = refundMoney + data.totalMoney / 100
            this.setState({
                goodsList: ListArr,
                logisticsMoney: data.logisticsMoney
            })
        }
        this.setState({
            refundMoney: refundMoney,
            catchData: this.props.navigation.state.params.data,
            type: this.props.navigation.state.params.type
        })
    }
}

const styles = StyleSheet.create({
    containerAppEntertoPayOr: {
        flex: 1,
        backgroundColor: "#F3F3F3"
    },
    modalSty2: {
        width: "100%",
        backgroundColor: "#FFFFFF"
    },
    modalSty5: {
        width: "96%",
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        marginLeft: "2%",
        borderBottomWidth: 1,
        borderBottomColor: "#EAEAEA",
        justifyContent: "space-between",
        alignItems: "center",
        height: 50
    },
    modalSty53: {
        width: "96%",
        paddingTop: 10,
        backgroundColor: "#FFFFFF",
        marginLeft: "2%"
    },
    modalSty535: {
        width: "96%",
        backgroundColor: "#8A6246",
        marginLeft: "2%",
        marginTop: 25,
        height: 45,
        alignItems: "center",
        justifyContent: "center"
    },
    modalSty535Text: {
        color: "#FFFFFF",
        fontSize: 17
    },
    modalSty5N: {
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
        width: "96%",
        marginLeft: "2%",
        paddingTop: 18,
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
        fontSize: 14
    },
    modalSty4Text34: {
        color: "#A52020",
        fontSize: 17
    },
    modalSty4Text35: {
        color: "#B2B2B2",
        fontSize: 13
    },
    modalSty53Text: {
        color: "#282828",
        fontSize: 14,
        paddingBottom: 5
    },
    modalSty4Text32: {
        color: "#B2B2B2",
        fontSize: 14,
        paddingRight: 5
    },
    modalSty4Text4: {
        color: "#B2B2B2",
        fontSize: 14,
        paddingRight: 6
    },
    modalSty4Text1: {
        color: "#282828",
        fontSize: 14,
        paddingLeft: 8
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
    orderLinSty: {
        width: width,
        backgroundColor: "#F3F3F3",
        height: 5
    },
    tieCon223: {
        color: "#B2B2B2",
        fontSize: 13,
        paddingTop: 5,
        paddingBottom: 5
    },
    zjhdx: {
        width: 1,
        backgroundColor: "#EDE0D7",
        height: 25
    },
    shurukacon3L: {
        width: "48%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    shurukacon3R: {
        width: "48%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    shurukacon3LText: {
        color: "#B06F42",
        fontSize: 16,
        paddingLeft: 5
    },
    modalSty51: {
        flexDirection: "row",
        alignItems: "center"
    },
    PickerSty: {
        width: Dimensions.get('window').width,
        position: "absolute",
        bottom: 0,
        backgroundColor: "#ffffff",
        borderColor: "#dddddd",
        borderTopWidth: 1,
        zIndex: 12
    },
    PickerStyItem: {
        width: Dimensions.get('window').width
    },
    PickerChlden: {
        flexDirection: "row",
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 0,
        paddingTop: 10,
    },
    mask: {
        justifyContent: "center",
        backgroundColor: "#383838",
        opacity: 0.7,
        position: "absolute",
        width: width,
        height: height,
        left: 0,
        top: 0,
        zIndex: 11,
    },
    SdsuInputR: {
        width: "100%",
        fontSize: 15,
        marginTop: 5,
        backgroundColor: "#F7F7F7",
        paddingTop: 5,
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 5
    }
});
