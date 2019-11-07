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
import BlankPages from '../BlankPages/BlankPages';
import Swiper from 'react-native-swiper';
import { JFAPI } from './API/API';
import { createStackNavigator, StackActions, NavigationActions, createAppContainer } from "react-navigation";
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
    Animated,
    Alert
} from "react-native";
import ScrollableTabView, { ScrollableTabBar, DefaultTabBar } from 'react-native-scrollable-tab-view'
import Loading from '../LoadingAnimation/LoadingAnimation';
import AsyncStorage from '@react-native-community/async-storage';
let { width, height } = Dimensions.get('window');
import global from '../global';
export default class MallTemplateAndroid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // 用户信息
            userInfo: '',
            labelArr: [],
            slideshowArr: [],
            goodsList: [],
            loadingState: true
        }
    }

    static navigationOptions = {
        headerTitle: '商城',
        headerStyle: {
            backgroundColor: "#323232"
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
            fontWeight: 'bold'
        },
    };

    render() {
        let label = this.state.labelArr;
        return (
            <View style={styles.containerAppMall}>
                <ScrollView style={{ flex: 1, marginBottom: 70 }}>
                    {/*轮播图*/}
                    <View style={{ width: width, height: 250 }}>
                        {
                            this.state.slideshowArr ?
                                <Swiper key={this.state.slideshowArr.length} autoplay={true} showsPagination={true} height={250} horizontal={true} showsButtons={false} >
                                    {this.fetchData()}
                                </Swiper> : null
                        }
                    </View>
                    {/*    <TextInput style={styles.zdyInputMall} placeholder="搜索商品"></TextInput>*/}
                    {/*分类区域*/}
                    <ScrollableTabView
                        style={{ flex: 1, width: width, height: height }}
                        onChangeTab={(obj) => this.switchTabMall(obj)}
                        initialPage={0}
                        renderTabBar={() => <ScrollableTabBar />}
                        tabBarBackgroundColor='#fff'
                        tabBarActiveTextColor='#8A6246'
                        tabBarInactiveTextColor='#333'
                        tabBarUnderlineStyle={styles.tabBarUnderline}
                        tabBarTextStyle={{ fontSize: 16 }}
                    >
                        {
                            label.map((item, index) => {
                                return (
                                    <View tabLabel={item.name} key={index}>
                                        <View style={styles.culturalcon}>
                                            {
                                                this.state.goodsList.length > 0 ? <View style={styles.goodsList}>
                                                    {
                                                        this.state.goodsList.map((item, index) => {
                                                            return (
                                                                <TouchableWithoutFeedback key={index} onPress={() => this.goodsDetails(item)}>
                                                                    <View style={styles.goodsListChild}>
                                                                        <Image style={styles.goodImg} source={{ uri: global.PicUrl + item.imgList[0] }} />
                                                                        <Text style={styles.goodsNAME} numberOfLines={1} ellipsizeMode="tail">{item.title}</Text>
                                                                        <View style={styles.goodsListChild2}>
                                                                            <Text style={styles.TextPrice1}>￥<Text style={styles.TextPrice2}>{item.price == 0 ? '0.01' : item.price / 100}</Text></Text>
                                                                            <Image source={require('./Images/2.png')} />
                                                                        </View>
                                                                    </View>
                                                                </TouchableWithoutFeedback>
                                                            )
                                                        })
                                                    }
                                                </View> : <View style={styles.blankEmpty}>
                                                        <Image source={require('./Images/k.png')} />
                                                        <Text style={styles.emptyAllText}>这里什么都没有,空空的</Text>
                                                    </View>
                                            }
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </ScrollableTabView>
                </ScrollView>
                <View style={styles.btmcon}>
                    <TouchableWithoutFeedback onPress={() => this.gotoPage('HomeN')}>
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
                    <TouchableWithoutFeedback>
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
                <Loading show={this.state.loadingState}></Loading>
            </View>
        );
    }
    // 轮播图
    fetchData() {
        let imgs = [];
        let imgAry = this.state.slideshowArr;
        for (let i = 0; i < imgAry.length; i++) {
            imgs.push(
                <Image
                    resizeMode="cover"
                    key={i}
                    source={{ uri: imgAry[i] }}
                    style={[styles.img]} />
            );
        }
        return imgs;
    }
    componentDidMount() {
        console.log("安卓");
        let self = this;
        this.getMallFetchdata();
        this.getClassfication();
        AsyncStorage.getItem('userInfo')
            .then(result => {
                this.setState({
                    userInfo: JSON.parse(result)
                })
            }).catch(error => {
                console.log("读取失败");
            })
        setTimeout(function () {
            self.setState({
                loadingState: false
            })
        })
    }
    goodsDetails = (obj) => {
        this.props.navigation.navigate('GoodsDetailsN', { detail: obj })
    }
    // 分类切换
    switchTabMall = (obj) => {
        console.log(this.state.labelArr[obj.i])
        let goods = this.state.labelArr[obj.i];
        this.getClassficationGood(goods.id, 1, 10);
    }
    // 商品详情页
    // GoodsDetailsN
    // 轮播图
    getMallFetchdata = () => {
        let imgArray = [];
        let formData = new FormData();
        formData.append('type', 2);
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
                        imgArray.push('https://taijiqiu.oss-cn-hangzhou.aliyuncs.com/' + responseData.data[i].img)
                    }
                }
                this.setState({
                    slideshowArr: imgArray
                })
            });
    }
    // 获取商品分类
    getClassfication = () => {
        let ficationArr = [];
        let url = JFAPI.getList;
        let opts = {
            method: 'POST',
            body: ''
        };
        fetch(url, opts)
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
                if (responseData.code == 0) {
                    if (responseData.data.length > 0) {
                        this.setState({
                            labelArr: responseData.data
                        })
                        this.getClassficationGood(responseData.data[0].id, 1, 10)
                    } else {
                        this.setState({
                            labelArr: []
                        })
                    }
                } else {
                    this.setState({
                        labelArr: []
                    })
                }
            })
    }
    // 分类下的商品
    getClassficationGood = (id, page, pageSize) => {
        this.setState({
            loadingState: true
        })
        let url = JFAPI.getListId;
        let formData = new FormData();
        formData.append('classifyId', id);
        formData.append('page', page);
        formData.append('length', pageSize);
        let opts = {
            method: 'POST',
            body: formData
        };
        console.log(url);
        console.log(opts);
        fetch(url, opts)
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
                if (responseData.code == 0) {
                    if (responseData.data.length > 0) {
                        this.setState({
                            goodsList: responseData.data
                        })
                    } else {
                        this.setState({
                            goodsList: []
                        })
                    }
                }
                this.setState({
                    loadingState: false
                })
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    loadingState: false,
                    goodsList: []
                })
            })
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
}

const styles = StyleSheet.create({
    containerAppMall: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#F7F7F7"
    },
    zdyInputMall: {
        width: "90%",
        backgroundColor: "#FFFFFF",
        height: 40,
        borderRadius: 20,
        paddingLeft: 15,
        marginTop: 25
    },
    TopImagBack: {
        width: '100%',
        height: 200,
        alignItems: "center"
    },
    tabBarUnderline: {
        backgroundColor: '#FFFFFF',
        height: 1,
    },
    culturalcon: {
        width: width,
        backgroundColor: "#F7F7F7",
        marginTop: 10,
        paddingTop: 10,
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
    goodsList: {
        width: "94%",
        flexWrap: 'wrap',
        flexDirection: "row",
        marginLeft: "3%"
    },
    goodsListChild: {
        width: "49%",
        borderWidth: 1,
        backgroundColor: "#FFFFFF",
        borderColor: "#DDDDDD",
        marginRight: "1%",
        marginBottom: 10
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
    goodImg: {
        width: "100%",
        height: 190
    },
    goodsListChild2: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 5
    },
    goodsNAME: {
        fontSize: 15,
        color: "#282828",
        paddingTop: 8,
        paddingLeft: 6
    },
    TextPrice1: {
        color: "#B98A69",
        fontSize: 14,
        fontWeight: "bold",
        paddingLeft: 6
    },
    TextPrice2: {
        color: "#B98A69",
        fontSize: 19,
        fontWeight: "bold"
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
    img: {
        width: width,
        height: 300,
    },
    blankEmpty: {
        alignItems: "center"
    },
    emptyAllText: {
        fontSize: 16,
        paddingTop: 8,
        color: "#B2B2B2"
    }
});
