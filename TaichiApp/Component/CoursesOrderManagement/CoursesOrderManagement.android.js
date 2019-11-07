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
import AsyncStorage from "@react-native-community/async-storage";
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
    Animated, Alert
} from "react-native";
import ScrollableTabView, {ScrollableTabBar, DefaultTabBar} from 'react-native-scrollable-tab-view'
import {JFAPI} from './API/API';

let {width, height} = Dimensions.get('window');
import BlankPages from '../BlankPages/BlankPages';
import global from '../global';
let codeTime = 60;
export default class CoursesOrderManagementAndroid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            switchText: "全部",
            userInfo: '',
            orderList: '',
            orderList1: '',
            orderList2: '',
            orderList3: '',
            orderList4: '',
            orderList5: '',
            orderList6: ''
        }
    }

    static navigationOptions = {
        headerTitle: '课程订单',
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
            <View style={styles.containerAppTaichi}>
                <View style={styles.culturalcon}>
                    {
                        this.state.orderList.length > 0 ? <ScrollView>
                            {
                                this.state.orderList.length > 0 ? this.state.orderList.map((item, index) => {
                                    return (
                                        <View key={index}>
                                            <View style={{paddingTop: 10, width: width * 0.96, marginLeft: width * 0.02}}>
                                                {
                                                    this.PayStatus(item.status)
                                                }
                                            </View>
                                            <View>
                                                <View sytle={{backgroundColor: "#FFFFFF"}}>
                                                    <View style={styles.TtquyuPar}>
                                                        <View style={styles.TtquyuPar1}>
                                                            <Image style={{width: 75, height: 75}} source={{uri: global.PicUrl + 'xcx/ctRZFkAMApamcFPXdBEfYr.jpg'}}/>
                                                            <View style={{justifyContent:'space-around'}}>
                                                                <View style={styles.zongriqi}>
                                                                    <Text numberOfLines={2} ellipsizeMode="tail">{item.title}</Text>
                                                                    {/*<Text style={{paddingRight:8}}>￥{item.goodsMoney / 100}</Text>*/}
                                                                </View>
                                                                <View style={styles.zongriqi}>
                                                                    <Text style={styles.TtquyuPar11Text2}>下单时间：{this.timestampChangeData(item.createTime)}</Text>
                                                                    {/*<Text style={styles.TtquyuPar11Text2}>2</Text>*/}
                                                                </View>
                                                                <View style={styles.zongriqi}>
                                                                    <Text
                                                                        style={styles.TtquyuPar11Text2Dfk}>合计：{item.payMoney / 100}</Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                            {
                                                index + 1 == this.state.orderList.length ? null : <View style={styles.linePad}></View>
                                            }
                                        </View>
                                    )
                                }) : <BlankPages width={width} height={height} justify={'center'} align={'center'} />
                            }
                        </ScrollView> : <BlankPages width={width} height={height} justify={'center'} align={'center'} />
                    }
                </View>
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
    // 取消订单
    cancelOrder = (item) => {
        Alert.alert(
            '提示',
            '确定取消该订单吗?',
            [
                {text: '取消'},
                {text: "确定", onPress: () => this.determinecancelOrder(item.batchId)}
            ]
        );
    }
    // 删除订单
    DeleteOrder = (item) => {
        console.log(item);
        Alert.alert(
            '提示',
            '确定删除该订单吗?',
            [
                {text:'取消'},
                {text:'确定', onPress:() => this.determineDeleteOrder(item.id)}
            ]
        )
    }
    // 确定删除订单
    determineDeleteOrder = (id) =>{
        console.log(id);
        let url = JFAPI.deleteOrder;
        let formData = new FormData();
        formData.append('orderId',id);
        let opts = {
            method:"POST",
            body:formData
        }
        fetch(url,opts)
            .then((response) => response.json())
            .then((res) => {
                if (res.code == 0) {
                    this.getOrderList(this.state.userInfo.id, '4', 1, 10)
                }
                console.log(res);
            })
            .catch((err) => {
                console.log(res);
            })
    }
    // 确定取消订单
    determinecancelOrder = (batchId) => {
        let url = JFAPI.cancelOrder;
        let formData = new FormData();
        formData.append('batchId', batchId);
        let opts = {
            method: "POST",
            body: formData
        }
        fetch(url, opts)
            .then((response) => response.json())
            .then((res) => {
                console.log(res);
                let type = '';
                if (this.state.switchText == "全部") {
                    type = '-1';
                } else if (this.state.switchText == "待付款") {
                    type = '0';
                } else if (this.state.switchText == "待发货") {
                    type = '1';
                } else if (this.state.switchText == "待收货") {
                    type = '2';
                } else if (this.state.switchText == "待评价") {
                    type = '3';
                }
                if (res.code == 0) {
                    this.getOrderList(this.state.userInfo.id, type, 1, 20);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
    // 订单状态
    PayStatus = (params) => {
        switch (params) {
            case 0:
                return (<Text style={{color: "#C22525", fontSize: 14}}>未付款</Text>)
                break;
            case 1:
                return (<Text style={{color: "#C22525", fontSize: 14}}>已付款</Text>)
                break;
            default:
                return (<Text style={{color: "#C22525", fontSize: 14}}>交易成功</Text>)
        }
    }
    // 去评价
    gotoEvaluate = (item) => {
        let self = this;
        this.props.navigation.navigate('EvaluationN',{data:item,refresh:function(){
                self.getOrderList(self.state.userInfo.id,'-1',1,10)
            }})
    }
    // 获取订单列表
    getOrderList = (userId, status, page, pageSize) => {
        let url = JFAPI.userOrderList;
        let formData = new FormData();
        formData.append('userId', userId);
        formData.append('status', status);
        formData.append('page', page);
        formData.append('pageSize', pageSize);
        let opts = {
            method: "POST",
            body: formData
        };
        console.log(url);
        console.log(formData);
        fetch(url, opts)
            .then((response) => response.json())
            .then((res) => {
                console.log(this.state.switchText);
                console.log(res);
                if (res.code == 0) {
                    let dataArr = [];
                    let dataArr1 = [];
                    let dataArr2 = [];
                    let dataArr3 = [];
                    let dataArr4 = [];
                    let dataArr5 = [];
                    let dataArr6 = [];
                    if (res.data.length > 0) {
                        if (this.state.switchText == "全部") {
                            for (let i = 0; i < res.data.length; i++) {
                                dataArr.push(res.data[i]);
                            }
                            this.setState({
                                orderList: dataArr
                            })
                        } else if (this.state.switchText == '待付款') {
                            for (let i = 0; i < res.data.length; i++) {
                                dataArr1.push(res.data[i]);
                            }
                            this.setState({
                                orderList1: dataArr1
                            })
                        } else if (this.state.switchText == '待发货') {
                            for (let i = 0; i < res.data.length; i++) {
                                dataArr2.push(res.data[i]);
                            }
                            this.setState({
                                orderList2: dataArr2
                            })
                        }else if(this.state.switchText == '待收货'){
                            for(let i = 0; i < res.data.length; i++){
                                dataArr4.push(res.data[i]);
                            }
                            this.setState({
                                orderList4:dataArr4
                            })
                        }else if(this.state.switchText == '待评价'){
                            for(let i = 0; i < res.data.length; i++){
                                dataArr5.push(res.data[i]);
                            }
                            this.setState({
                                orderList5:dataArr5
                            })
                        }else if(this.state.switchText == "已关闭"){
                            for (let i = 0; i < res.data.length; i++) {
                                dataArr3.push(res.data[i]);
                            }
                            this.setState({
                                orderList3: dataArr3
                            })
                        }else if(this.state.switchText == '已退款'){
                            for(let i = 0; i < res.data.length; i++){
                                dataArr6.push(res.data[i]);
                            }
                            this.setState({
                                orderList6:dataArr6
                            })
                        }
                    } else {
                        this.setState({
                            orderList:'',
                            orderList1:'',
                            orderList2:'',
                            orderList3:'',
                            orderList4:'',
                            orderList5:'',
                            orderList6:''
                        })
                    }
                }
            }).catch((err) => {
            console.log(err);
        })
    }
    // 确认收货
    ConfirmGoods = (item,type) => {
        let url = '';
        if(type == 1){
            url = JFAPI.confirmOrder;;
        }else if(type == 2){
            url = JFAPI.extendedAuto;
        }
        console.log(url);
        let orderId = item.id;
        let formData = new FormData();
        formData.append('orderId', orderId);
        let opts = {
            method: "POST",
            body: formData
        }
        fetch(url, opts)
            .then((response) => response.json())
            .then((res) => {
                console.log(res);
                if(res.code == 0){
                    let type = '';
                    if (this.state.switchText == "全部") {
                        type = '-1';
                    } if (this.state.switchText == "待收货") {
                        type = '2';
                    }else{
                        type = '2'
                    }
                    if (res.code == 0) {
                        this.getOrderList(this.state.userInfo.id, type, 1, 20);
                    }
                }else{
                    Alert.alert('网络出现问题，请稍后再试');
                }
            })
            .catch((err) => {
                this.getOrderList(this.state.userInfo.id, '2', 1, 20);
                console.log(err);
            })
    }

    componentDidMount() {
        // 用户信息
        AsyncStorage.getItem('userInfo')
            .then(result => {
                this.setState({
                    userInfo: JSON.parse(result)
                })
                // 默认获取全部订单
                this.getOrderList(this.state.userInfo.id, '-1', 1, 10);
            }).catch((error) => {
            console.log("读取失败");
        })
    }

}

const styles = StyleSheet.create({
    containerAppTaichi: {
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
        marginTop: 10,
        paddingBottom: 10
    },
    TtquyuG: {
        flexDirection: 'row',
        justifyContent: "space-around",
        paddingBottom: 10,
        paddingTop: 10,
        backgroundColor: "#FFFFFF",
        width: width * 0.96,
        marginLeft: width * 0.02
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
    Ttquyu1: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    Ttquyu1Text1: {
        fontSize: 15,
        color: "#282828"
    },
    Ttquyu1Text1gjsp: {
        fontSize: 14,
        color: "#282828"
    },
    Ttquyu1Text2: {
        fontSize: 15,
        color: "#B2B2B2"
    },
    TtquyuParN:{
        flexDirection: "row",
        paddingBottom: 10,
        paddingTop: 10,
        backgroundColor: "#FFFFFF",
        width: width * 0.96,
        marginLeft: width * 0.02
    },
    TtquyuPar: {
        flexDirection: "row",
        paddingBottom: 10,
        paddingTop: 10,
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1,
        borderBottomColor: "#EAEAEA",
        width: width * 0.96,
        marginLeft: width * 0.02
    },
    TtquyuPar1: {
        flexDirection: "row",
        width: "75%"
    },
    TtquyuPar11: {
        marginLeft: 10
    },
    TtquyuPar11Text2: {
        color: "#B2B2B2",
        fontSize: 13,
        paddingTop: 8
    },
    TtquyuPar11Text2Dfk: {
        color: "#282828",
        fontSize: 14,
        paddingTop: 8
    },
    Ttquyu1Text1gjspPrice: {
        color: "#C22525",
        fontSize: 17
    },
    Ttquyu1Text1gjspAqx: {
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#DDDDDD",
        width: 90,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 7,
        paddingBottom: 7,
        marginRight: 10,
    },
    Ttquyu1Text1gjspA: {
        backgroundColor: "#B06F42",
        borderRadius: 14,
        width: 90,
        paddingTop: 7,
        paddingBottom: 7,
        alignItems: "center",
        justifyContent: "center"
    },
    Ttquyu1Text1gjspARexr: {
        color: "#FFFFFF"
    },
    Ttquyu1Text1gjspARexrqx: {
        color: "#DDDDDD"
    },
    linePad: {
        width: width,
        backgroundColor: "#F3F3F3",
        height: 9,
        marginTop: 10
    },
    zongriqi: {
        flexDirection: "row",
        marginLeft: 10,
        justifyContent: "space-between"
    }
});
