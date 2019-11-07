/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { createStackNavigator, StackActions, NavigationActions, createAppContainer } from "react-navigation";
import { RefreshControl,Modal, Alert, FlatList, TouchableOpacity, ScrollView, Button, Platform, Image, ImageBackground, Dimensions, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import Swiper from 'react-native-swiper';
// icon
import AsyncStorage from '@react-native-community/async-storage';
import Loading from '../LoadingAnimation/LoadingAnimation.js';
import SplashScreen from 'react-native-splash-screen'
import Alipay from '../Utils/Ailpay';
import * as WeChat from "react-native-wechat";
let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
import { JFAPI } from './API/API';
import global from '../global';
let self = this;
export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            paramsData:'',
            PayType:"微信",
            payState1: false,
            payState2: true,
            modalVisible:false,
            refreshing:false,
            // 用户信息
            userInfo: '',
            loadingState: true,
            // 入门课程列表
            LessonList: [],
            // 太极球课程列表
            LessonListId: '',
            slideshowArr: '',
            // 名师名家列表
            coachList: '',
            // 悠然头条列表
            noticeList: ''
        }
        WeChat.registerApp('wxee2a0bd18951f6b8');//wx6695722a5c235237
    }

    static navigationOptions = ({ navigation, screenProps }) => ({
        headerTitle: '悠然太极',
        headerStyle: {
            backgroundColor: "#323232"
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
            fontWeight: 'bold'
        }
        // headerRight: (
        //     <TouchableWithoutFeedback onPress={() => navigation.state.params.gotoMessage(self)}>
        //         <Image style={{ marginRight: 15 }} source={require('./Images/tongzhixiaoxi.png')} />
        //     </TouchableWithoutFeedback>
        // )
    })

    render() {
        return (
            <View style={styles.containerAppHome}>
                <ScrollView
                    style={{ flex: 1, marginBottom: 70 }}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }

                >
                    {/*轮播图*/}
                    <View style={{ width: width, height: 200 }}>
                        {
                            this.state.slideshowArr ?
                                <Swiper autoplay={true} showsPagination={true} height={200} horizontal={true} showsButtons={false}>
                                    {this.fetchData()}
                                </Swiper> : null
                        }
                    </View>
                    {/*导航区域*/}
                    <View style={styles.topNavContaer}>
                        <TouchableWithoutFeedback onPress={() => this.TaichiWhN()}>
                            <View style={styles.topNavContaerChild}>
                                <View style={{ alignItems: "center", justifyContent: "center", width: 40, height: 40 }}>
                                    <Image style={{ width: 28, height: 28 }} source={require('./Images/wenhua.png')} />
                                </View>
                                <Text style={styles.titleTextH}>太极文化</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => this.gotoTaichiPage()}>
                            <View style={styles.topNavContaerChild}>
                                <View style={{ alignItems: "center", justifyContent: "center", width: 40, height: 40 }}>
                                    <Image style={{ width: 27, height: 26 }} source={require('./Images/shenghuo.png')} />
                                </View>
                                <Text style={styles.titleTextH}>太极生活</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => this.gotoNearboxN()}>
                            <View style={styles.topNavContaerChild}>
                                <View style={{ alignItems: "center", justifyContent: "center", width: 40, height: 40 }}>
                                    <Image style={{ width: 28, height: 30 }} source={require('./Images/quanshi.png')} />
                                </View>
                                <Text style={styles.titleTextH}>附近教练</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => this.gotoFistnearN()}>
                            <View style={styles.topNavContaerChild}>
                                <View style={{ alignItems: "center", justifyContent: "center", width: 40, height: 40 }}>
                                    <Image style={{ width: 28, height: 24 }} source={require('./Images/quanyou.png')} />
                                </View>
                                <Text style={styles.titleTextH}>附近学员</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => this.gotoCarefreeN()}>
                            <View style={styles.topNavContaerChild}>
                                <View style={{ alignItems: "center", justifyContent: "center", width: 40, height: 40 }}>
                                    <Image style={{ width: 30, height: 27 }} source={require('./Images/luntan.png')} />
                                </View>
                                <Text style={styles.titleTextH}>悠然论坛</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    {/*名师名家*/}
                    <TouchableWithoutFeedback onPress={() => this.gotoFamousTeacherN()}>
                        <View style={styles.msmj}>
                            <View style={styles.msmjChild}>
                                <Image style={{ width: 16, height: 19 }} source={require('./Images/msmj.png')} />
                                <Text style={styles.msmjChildL}>名师名家</Text>
                            </View>
                            <View style={styles.msmjChild}>
                                <Text style={styles.msmjChildR}>更多</Text>
                                <Image source={require('./Images/left.png')} />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    {/*gotoCoashdetals*/}
                    <View style={styles.msmj2}>
                        {
                            this.state.coachList.length > 0 ? this.state.coachList.map((item, index) => {
                                return (
                                    <TouchableWithoutFeedback key={index} onPress={() => this.gotoCoashdetals(item)}>
                                        <View style={styles.msmjChild2}>
                                            <View>
                                                {
                                                    item.headurl ? <Image style={styles.msmjImg} source={{ uri: global.PicUrl + item.headurl }} /> : <Image style={styles.msmjImg} source={require('./Images/bj.png')} />
                                                }
                                            </View>
                                            <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.msmjNa}>{item.nickName ? item.nickName : item.realName}</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                )
                            }) : null
                        }
                    </View>
                    {/*悠然太极球入门*/}
                    <TouchableWithoutFeedback onPress={() => this.gotoYurantaichiN()}>
                        <View style={styles.msmjRm}>
                            <View style={styles.msmjChild}>
                                <Image resizeMode="stretch" style={{ width: 18, height: 17 }} source={require('./Images/rumen.png')} />
                                <Text style={styles.msmjChildL}>悠然太极球入门</Text>
                            </View>
                            <View style={styles.msmjChild}>
                                <Text style={styles.msmjChildR}>更多</Text>
                                <Image source={require('./Images/left.png')} />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <FlatList
                        style={{ backgroundColor: "#F7F7F7" }}
                        data={this.state.LessonList}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={this.renderTopicItem}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    />
                    {/*悠然太极课程*/}
                    {
                        this.state.LessonListId.length > 0 ? <TouchableWithoutFeedback onPress={() => this.gotoYurantaichiCourseN()}>
                            <View style={styles.msmjKC}>
                                <View style={styles.msmjChild}>
                                    <Image style={{ width: 15, height: 19 }} source={require('./Images/kecheng.png')} />
                                    <Text style={styles.msmjChildL}>悠然太极球课程</Text>
                                </View>
                                <View style={styles.msmjChild}>
                                    <Text style={styles.msmjChildR}>更多</Text>
                                    <Image source={require('./Images/left.png')} />
                                </View>
                            </View>
                        </TouchableWithoutFeedback> : null
                    }
                    <View style={{ backgroundColor: "#FFFFFF", flexWrap: "wrap", flexDirection: "row" }}>
                        {
                            this.state.LessonListId.length > 0 ? this.state.LessonListId.map((item, index) => {
                                return (
                                    <TouchableWithoutFeedback key={index} onPress={() => this.gotoCourseDetaN(item)}>
                                        <View style={styles.topicItemKc}>
                                            <Image style={styles.topicImg} source={{ uri: global.PicUrl + item.imgList }} />
                                            <View style={styles.topicContainer}>
                                                <View style={styles.topicText}>
                                                    <Text style={styles.topicTitleKc}>{item.title}</Text>
                                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                        <Text style={styles.topicDescKc}>{item.num}学员</Text>
                                                        <Text style={styles.topicDescKcR}>{(item.distanceStr / 1000).toFixed(1)}km</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                )
                            }) : null
                        }
                    </View>
                    {/*悠然头条*/}
                    {
                        this.state.noticeList.length > 0 ? <View style={styles.msmjKC}>
                            <View style={styles.msmjChild}>
                                <Image style={{ width: 15, height: 19 }} source={require('./Images/toutiao.png')} />
                                <Text style={styles.msmjChildL}>悠然头条</Text>
                            </View>
                        </View> : null
                    }
                    {/* **********************************************悠然头条列表********************************************** */}
                    {
                        this.state.noticeList.length > 0 ? <View sytle={{ backgroundColor: "#FFFFFF" }}>
                            {
                                this.state.noticeList.map((item, index) => {
                                    return (
                                        <TouchableWithoutFeedback key={index} onPress={() => this.gotoDetails(item)}>
                                            <View style={styles.Ttquyu}>
                                                <View style={{ width: width * 0.3 }}>
                                                    {
                                                        item.imgList ? <Image style={{ width: 110, height: 75 }} source={{ uri: global.PicUrl + item.imgList[0] }} /> :
                                                            <Image style={{ width: 110, height: 75 }} source={require('./Images/rumen.png')} />
                                                    }
                                                </View>
                                                <View style={{ paddingLeft: 5, width: width * 0.6, justifyContent: "space-between" }}>
                                                    <Text style={styles.tttitle}>{item.title}
                                                    </Text>
                                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                        <Text
                                                            style={styles.ttdesc}>{item.type == 1 ? '传统文化' : item.type == 2 ? '道家文化' : item.type == 3 ? '太极说' : item.type == 4 ? '悠然太极' : item.type == 5 ? '养生文化' : item.type == 6 ? '太极养生' : item.type == 7 ? '太极入门' : item.type == 8 ? '太极课程' : item.type == 9 ? '商城' : item.type == 10 ? '论坛' : item.type == 11 ? '太极团' : '论坛'}</Text>
                                                        <Text style={styles.ttdesc}>{(item.browseNum * 1 + item.virViewNum * 1)}阅读·{item.commentNum}评论</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    )
                                })
                            }
                        </View> : null
                    }
                </ScrollView>
                {/*弹出层选择支付方式*/}
                <Modal
                    animationType='fade' // 指定了 modal 的动画类型。类型：slide 从底部滑入滑出|fade 淡入淡出|none 没有动画
                    transparent={true} // 背景是否透明，默认为白色，当为true时表示背景为透明。
                    visible={this.state.modalVisible} // 是否显示 modal 窗口
                    onRequestClose={() => { this._closeModalWin(); }} // 回调会在用户按下 Android 设备上的后退按键或是 Apple TV 上的菜单键时触发。请务必注意本属性在 Android 平台上为必填，且会在 modal 处于开启状态时阻止BackHandler事件
                    onShow={()=>{console.log('modal窗口显示了');}} // 回调函数会在 modal 显示时调用
                >
                    <View style={styles.modalLayer}>
                        <View style={styles.modalContainer}>
                            <View>
                                <View style={styles.tieCon}>
                                    <Text style={styles.tieConText}>支付方式</Text>
                                </View>
                                <View>
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
                            </View>
                            <View style={styles.modalButtonStyle}>
                                <Button title="支付" color="#B06F42" onPress={() => this.payOrder()}></Button>
                                <View style={{marginBottom:10}}></View>
                                <Button title='取消' color="#A4A4A4" onPress={this._closeModalWin}></Button>
                            </View>
                        </View>
                    </View>

                </Modal>
                <Loading show={this.state.loadingState}></Loading>
                <View style={styles.btmcon}>
                    <TouchableWithoutFeedback>
                        <View style={styles.btmconleft}>
                            <Image style={{ width: 23, height: 22 }} source={require('./Images/shouye.png')} />
                            <Text style={styles.IndexTextNo}>首页</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => this.gotoJudgeRegisteredPage('HisCraftN')}>
                        <View style={styles.btmconright}>
                            <Image style={{ width: 18, height: 23 }} source={require('./Images/lianquan.png')} />
                            <Text style={styles.IndexTextNo}>练习</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => this.gotoPage('MallTemplateN')}>
                        <View style={styles.btmconright}>
                            <Image style={{ width: 21, height: 19 }} source={require('./Images/shangcheng.png')} />
                            <Text style={styles.IndexTextNo}>商城</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => this.gotoJudgeRegisteredPage('MypageN')}>
                        <View style={styles.btmconright}>
                            <Image style={{ width: 21, height: 21 }} source={require('./Images/wode.png')} />
                            <Text style={styles.IndexTextNo}>我的</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }
    // 支付订单
    payOrder = () => {
        let text = this.state.PayType;
        let payType = '';
        if (this.state.PayType == "") {
            Alert.alert('请选择支付方式');
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
                    console.log('微信获取订单',res);
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
                                    console.log('微信支付字段',res);
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
                })
                .catch((err) => {
                    console.log(err);
                })
        } else if (text == 1) {
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
                    console.log('支付宝获取订单',res);
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
                                    console.log('支付宝支付字段',res);
                                    if (res.code == 0) {
                                        if (res.data.payInfo) {
                                            // 支付宝
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
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }
    // 微信支付
    async wxPayAction(wxDic) {
        let self = this;
        WeChat.isWXAppInstalled()
            .then((isInstalled) => {
                if (isInstalled) {
                    console.log('支付字段wxdic',wxDic);
                    WeChat.pay(wxDic).then((requestJson) => {
                        console.log('支付回调', requestJson);
                        console.log(requestJson.errCode);
                        //支付成功回调
                        if (requestJson.errCode == 0) {
                            console.log("支付成功");
                            let parmaeter = {
                                data: this.state.paramsData,
                                title: "课程详情"
                            };
                            self.props.navigation.navigate('CourseDetaN', parmaeter);
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
            let parmaeter = {
                data: this.state.paramsData,
                title: "课程详情"
            };
            self.props.navigation.navigate('CourseDetaN', parmaeter);
        } else {
            console.log('取消支付');
        }
    }
    _onRefresh = () => {
        console.log('页面刷新');
        this.setState({
            refreshing:true
        })
        setTimeout(() => {
            // 轮播图
            this.getFetchdata();
            this.setState({
                refreshing:false
            })
        },1000)
    }
    // 请求页面接口
    componentDidMount() {
        console.log('隐藏启动页');
        // Alert.alert('版本1');
        setTimeout(() => {
            SplashScreen.hide();
        }, 1000)
        let self = this;
        // 轮播图
        this.getFetchdata();
        // 名师名家
        this.getCoachList();
        // 入门课程
        this.getLessonList();
        // 悠然头条
        this.GetnoticeList(1, 10);
        this.fetchData();
        setTimeout(function () {
            self.getlessonListId()
        }, 500)
        AsyncStorage.getItem('userInfo')
            .then(result => {
                this.setState({
                    userInfo: JSON.parse(result)
                })
                this.getlessonListId();
                this.getBanlce(this.state.userInfo.id);
            }).catch(error => {
                console.log("读取失败");
            })
        // 注册自定义导航右侧点击事件
        this.props.navigation.setParams({
            gotoMessage: this.MessageGoto
        })
    }

    gotoDetails = (item) => {
        let self = this;
        console.log(item);
        let state = {
            data: item,
            refresh: function () {
                self.GetnoticeList(1, 10);
            }
        };
        this.props.navigation.navigate('CommentDetaileNpN', state);
    }

    // 轮播图
    fetchData() {
        let imgs = [];
        let imgAry = this.state.slideshowArr;

        for (let i = 0; i < imgAry.length; i++) {
            imgs.push(
                <Image
                    key={i}
                    source={{ uri:imgAry[i] }}
                    style={[styles.img]} />
            );
        }
        return imgs;
    }

    // 太极球入门
    renderTopicItem = ({ item }) => {
        return (
            <TouchableWithoutFeedback onPress={() => this.gotojichukeDetales(item)}>
                <View style={styles.topicItem}>
                    <Image style={styles.topicImg} source={{ uri: global.PicUrl + item.imgList }} />
                    <View style={styles.topicContainer}>
                        <View style={styles.topicText}>
                            <Text ellipsizeMode='tail' numberOfLines={1} style={styles.topicTitle}>{item.title}</Text>
                            <Text style={styles.topicDesc}>{(item.browseNum + item.virViewNum)} 浏览量</Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
    gotojichukeDetales = (item) => {
        console.log('item',item)
        let parmaeter = {
            data: item,
            title: "课程详情"
        };
        // this.setState({
        //     paramsData:item
        // })
        this.props.navigation.navigate('CourseDetaN', parmaeter);
        // let status = true;
        // if(status){
        //     this._openModalWin();
        // }else{
        //     this.props.navigation.navigate('CourseDetaN', parmaeter);
        // }
    }

    gotoJudgeRegisteredPage = (page) => {

        if (this.state.userInfo != null && this.state.userInfo.id != null && this.state.userInfo.id != '') {
            this.gotoPage(page);

        }
        else {
            this.props.navigation.navigate('Registr');
        }

    }

    gotoPage = (parameter) => {
        // if (parameter == 'HisCraftN') {
        //     Alert.alert('功能正在开发');
        // } else {
        let reseAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: parameter })]
        })
        this.props.navigation.dispatch(reseAction);
        // }
    }
    // 获取悠然头条列表
    GetnoticeList = (page, pageSize) => {
        let url = JFAPI.noticeList;
        let formData = new FormData();
        formData.append('page', page);
        formData.append('pageSize', pageSize);
        let opts = {
            body: formData,
            method: "POST"
        };
        fetch(url, opts)
            .then((response) => response.json())
            .then((res) => {
                console.log('悠然头条', res)
                if (res.code == 0) {
                    if (res.data.length > 0) {
                        this.setState({
                            noticeList: res.data
                        })
                    } else {
                        this.setState({
                            noticeList: ''
                        })
                    }
                } else {
                    this.setState({
                        noticeList: ''
                    })
                }
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    noticeList: ''
                })
            })
    }
    // 太极球课程
    gotoYurantaichiCourseN = () => {
        this.props.navigation.navigate('YurantaichiCourseN');
    }
    // 课程详情
    gotoCourseDetaN = (item) => {
        let parmaeter = {
            data: item
        };
        this.props.navigation.navigate('CoursedetailspriceN', parmaeter);
    }
    // 太极球入门
    gotoYurantaichiN = () => {
        this.props.navigation.navigate('YurantaichiN');
    }
    // 名师名家
    gotoFamousTeacherN = () => {
        this.props.navigation.navigate('FamousTeacherN');
    }
    // 悠然论坛
    gotoCarefreeN = () => {
        if (this.state.userInfo != null && this.state.userInfo.id != null && this.state.userInfo.id != '') {
            this.props.navigation.navigate('CarefreeN');
        }
        else {
            this.props.navigation.navigate('Registr');
        }
    }
    // 附近拳友
    gotoFistnearN = () => {
        if (this.state.userInfo != null && this.state.userInfo.id != null && this.state.userInfo.id != '') {
            this.props.navigation.navigate('FistnearN');
        }
        else {
            this.props.navigation.navigate('Registr');
        }
    }
    // 附近拳师
    gotoNearboxN = () => {
        if (this.state.userInfo != null && this.state.userInfo.id != null && this.state.userInfo.id != '') {
            this.props.navigation.navigate('NearboxN');
        }
        else {
            this.props.navigation.navigate('Registr');
        }
    }
    // 太极生活
    gotoTaichiPage = () => {
        this.props.navigation.navigate('TaichiysN');
    }
    // 太极文化
    TaichiWhN = () => {
        this.props.navigation.navigate('TaichiWhN');
    }
    // 前往拳师详情
    gotoCoashdetals = (item) => {
        let self = this;
        let url = JFAPI.coachDetails;
        let formData = new FormData();
        formData.append('userId', item.id);
        let opts = {
            body: formData,
            method: "POST"
        }
        fetch(url, opts)
            .then((response) => response.json())
            .then((res) => {
                console.log(res);
                if (res.code == 0) {
                    if (res.data) {
                        let parameter = {
                            title: res.data.nickName ? res.data.nickName : '',
                            data: res.data
                        };
                        this.props.navigation.navigate('BoxerCardN', parameter)
                    } else {
                        this.props.navigation.navigate('BoxerCardN')
                    }
                } else {
                    this.props.navigation.navigate('BoxerCardN')
                }

            })
            .catch((err) => {
                console.log(err);
                this.props.navigation.navigate('BoxerCardN')
            })
    }
    // 通知消息
    MessageGoto = () => {
        let self = this;
        let navigate = self.props.navigation.navigate;
        navigate('MessageN');
    }
    // 获取余额接口
    getBanlce = (userId) => {
        let url = JFAPI.getBalance;
        let formData = new FormData();
        formData.append('userId', userId);
        let opts = {
            method: "POST",
            body: formData
        }
        fetch(url, opts)
            .then((response) => response.json())
            .then((res) => {
                // console.log(res);
                if (res.code == 0) {
                    AsyncStorage.setItem("Balance", JSON.stringify(res.data), error => {
                        if (error) {
                            console.log("缓存失败")
                        } else {
                            console.log("缓存成功", JSON.stringify(res.data));
                        }
                    })
                }
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    // 轮播图
    getFetchdata = () => {
        let imgArray = [];
        let formData = new FormData();
        formData.append('type', 1);
        let url = JFAPI.adList;
        let opts = {
            method: 'POST',
            body: formData
        };
        fetch(url, opts)
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData.code == 0) {
                    for (let i = 0; i < responseData.data.length; i++) {
                        imgArray.push(global.PicUrl + responseData.data[i].img)
                    }
                    console.log(imgArray);
                } else {
                    this.setState({
                        slideshowArr: ['http://www.tantanscience.com/lipstickImg/tghb.png', 'http://www.tantanscience.com/lipstickImg/tghb.png']
                    })
                }
                this.setState({
                    slideshowArr: imgArray
                })
            }).catch((error) => {
                console.log(error);
            })
    }
    // 名师名家列表接口
    getCoachList = () => {
        let url = JFAPI.coachList;
        let coachArray = [];
        let formData = new FormData();
        formData.append('page', 1);
        formData.append('pageSize', 5);
        let opts = {
            method: 'POST',
            body: formData
        };
        fetch(url, opts)
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
                this.setState({
                    loadingState: false
                })
                if (responseData.code == 0) {
                    if (responseData.data.length > 0) {
                        for (let i = 0; i < responseData.data.length; i++) {
                            coachArray.push(responseData.data[i]);
                        }
                        this.setState({
                            coachList: coachArray
                        })
                    } else {
                        this.setState({
                            coachList: coachArray
                        })
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            })

    }
    // 入门课程列表
    getLessonList = () => {
        let LessonListArr = [];
        let url = JFAPI.lessonList;
        let opts = {
            method: 'GET'
        };
        fetch(url, opts)
            .then((response) => response.json())
            .then((responseData) => {
                // console.log('太极球入门课程',responseData);
                this.setState({
                    loadingState: false
                })
                if (responseData.code == 0) {
                    if (responseData.data.length > 0) {
                        for (let i = 0; i < responseData.data.length; i++) {
                            LessonListArr.push(responseData.data[i])
                        }
                    }
                    this.setState({
                        LessonList: LessonListArr
                    })
                } else {
                    this.setState({
                        LessonList: ''
                    })
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
    // 太极球课程
    getlessonListId = () => {
        let formData = new FormData();
        let opts = null;
        if (this.state.userInfo != null && this.state.userInfo.id != null && this.state.userInfo.id != '') {
            formData.append('userId', this.state.userInfo.id);
            opts = {
                method: 'POST',
                body: formData
            };
        }

        let LessonListIdArr = [];
        let url = JFAPI.lessonListId;

        // console.log(opts);
        fetch(url, opts)
            .then((response) => response.json())
            .then((responseData) => {
                // console.log('太极球课程',responseData);
                if (responseData.code == 0) {
                    if (responseData.data.length > 0) {
                        for (let i = 0; i < responseData.data.length; i++) {
                            LessonListIdArr.push(responseData.data[i]);
                        }
                        this.setState({
                            LessonListId: LessonListIdArr
                        })
                    } else {
                        this.setState({
                            LessonListId: ''
                        })
                    }
                } else {
                    this.setState({
                        LessonListId: ''
                    })
                }
            })
    }
    _closeModalWin = () => {
        this.setState({modalVisible: false});
    }
    _openModalWin = () => {
        this.setState({modalVisible: true});
    }
    choosePay = (text) => {
        if (text == "支付宝") {
            this.setState({
                PayType: 1,
                payState1: true,
                payState2: false
            })
            if (this.state.payState1 == false) {
                this.setState({
                    payState1: true
                })
            } else {
                this.setState({
                    PayType:'',
                    payState1: false
                })
            }
        } else if (text == "微信") {
            this.setState({
                PayType: '微信',
                payState1: false,
                payState2: true
            })
            if (this.state.payState2 == false) {
                this.setState({
                    payState2: true
                })
            } else {
                this.setState({
                    PayType:'',
                    payState2: false
                })
            }
        }
    }
}
const styles = StyleSheet.create({
    containerAppHome: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center'
    },
    img: {
        width: width,
        height: 250,
    },
    topNavContaer: {
        width: width,
        flexDirection: "row",
        justifyContent: "space-around",
        paddingTop: 25,
        backgroundColor: "#FFFFFF"
    },
    topNavContaerChild: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF"
    },
    titleTextH: {
        fontSize: 13,
        color: "#282828",
        paddingTop: 10,
        fontWeight: "bold"
    },
    msmj: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: width,
        marginTop: 7,
        paddingTop: 18,
        paddingBottom: 5,
        backgroundColor: "#FFFFFF"
    },
    msmjKC: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: width,
        paddingTop: 18,
        paddingBottom: 5,
        backgroundColor: "#FFFFFF"
    },
    msmjRm: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: width,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: "#F7F7F7"
    },
    msmjChild: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 8,
        paddingRight: 8
    },
    msmjChild2: {
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 8,
        paddingRight: 8,
        width: "20%"
    },
    msmjChild2Rm: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
        width: width * 0.3,
        paddingTop: 15,
        paddingBottom: 15,
        marginLeft: 9
    },
    msmjChildL: {
        paddingLeft: 4,
        fontSize: 17
    },
    msmjChildR: {
        paddingRight: 4,
        fontSize: 13,
        color: "#B2B2B2",
        paddingTop: 1
    },
    msmj2Rm: {
        flexDirection: "row",
        width: width,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: "#F7F7F7"
    },
    msmj2: {
        flexDirection: "row",
        width: width,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: "#FFFFFF"
    },
    msmjImg: {
        marginBottom: 10,
        width: 46,
        height: 46,
        borderRadius: 23
    },
    msmjNa: {
        color: "#767676",
        fontSize: 14
    },
    scrollViewStyle: {
        flexDirection: 'row'
    },
    topic: {
        width: width,
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingBottom: 10,
        marginBottom: 10,
    },
    topicHead: {
        fontSize: 16,
        color: '#666',
        padding: 15,
    },
    topicItemKc: {
        width: width * 0.46,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#DDDDDD",
        marginTop: 10,
        marginLeft: 10
    },
    topicItem: {
        width: width * 0.42,
        marginLeft: 15,
        backgroundColor: "#FFFFFF",
        marginBottom: 15,
        alignItems: "center"
    },
    topicImg: {
        width: '100%',
        height: 90,
        borderColor: '#cdcdcd',
        borderRadius: 2,
    },
    topicContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    topicTitleKc: {
        fontSize: 14,
        color: "#282828",
        paddingLeft: 7
    },
    topicTitle: {
        fontSize: 14,
        color: '#282828',
        paddingRight: 5,
        paddingLeft: 5
    },
    topicDesc: {
        fontSize: 13,
        color: '#B2B2B2',
        marginTop: 3,
        paddingRight: 5,
        paddingLeft: 5,
        paddingBottom: 5
    },
    topicDescKc: {
        fontSize: 13,
        color: "#B2B2B2",
        paddingLeft: 7,
        paddingTop: 5,
        paddingBottom: 5
    },
    topicDescKcR: {
        fontSize: 13,
        color: "#FF7E00",
        paddingRight: 7,
        paddingTop: 5,
        paddingBottom: 5
    },
    topicText: {
        width: "100%"
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
        marginLeft: width * 0.04
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
    btmcon: {
        height: 70,
        width: width,
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        borderTopWidth: 1,
        borderTopColor: "#dddddd",
        overflow: "hidden",
        backgroundColor: "#ffffff"
    },
    btmconleft: {
        justifyContent: "center",
        alignItems: "center",
        width: width * 0.25
    },
    btmconright: {
        justifyContent: "center",
        alignItems: "center",
        width: width * 0.25
    },
    Indexicon: {
        width: 28,
        height: 28
    },
    IndexText: {
        fontSize: 12,
        paddingTop: 5,
        color: '#f56140'
    },
    NoIndexText: {
        fontSize: 12,
        paddingTop: 5,
        color: "#282828"
    },
    IndexTextNo: {
        fontSize: 12,
        paddingTop: 5,
        color: '#282828'
    },
    modalLayer: {
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        flex: 1,
        justifyContent: 'center',
        paddingTop:0,
        paddingLeft:32,
        paddingRight:32,
        paddingBottom:0
    },
    modalContainer: {
        height: 240,
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    modalTitleStyle: {
        textAlign: 'center',
        fontSize: 26
    },
    modalButtonStyle: {
        paddingLeft: 30,
        paddingRight: 30,
        marginTop: 18
    },
    tieCon: {
        width: "94%",
        marginLeft: "3%",
    },
    tieConText: {
        color: "#B2B2B2",
        fontSize: 14
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
    }
});
