/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { createStackNavigator, StackActions, NavigationActions, createAppContainer } from "react-navigation";

let num = 1;
import {
    FlatList,
    TouchableOpacity,
    ScrollView,
    Button,
    Platform,
    Image,
    ImageBackground,
    Dimensions,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
    Animated,
    Linking,
    DatePickerIOS, Modal, Alert
} from "react-native";
import Swiper from 'react-native-swiper';
import AsyncStorage from '@react-native-community/async-storage';

// icon
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Loading from '../LoadingAnimation/LoadingAnimation.js';
import Loadingn from '../LoadingAnimationN/LoadingAnimationN';
import HTMLView from 'react-native-htmlview';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
import { JFAPI } from './API/API';
import global from '../global';
let self = this;
export default class GoodsDetailsIos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deilImg: '',
            // 评价列表
            EvaluationList: '',
            // 确认购物车
            confirmText: '加入购物车',
            loadingState1: false,
            // 多规格商品名称
            specGoodsName: '请选择',
            specId: '',
            selectIndex: '',
            selectText: '请选择',
            PriceNum: '',
            PriceNumAll: '',
            userInfo: '',
            goodsDetail: '',
            loadingState: true,
            goodsNum: num,
            goodType: false,
            activeVip: 1,
            slideshowArr: ['https://taijiqiu.oss-cn-hangzhou.aliyuncs.com/xcx/bb3JsY7RazaW5bDdnB3XpA.jpg']
        }
    }

    static navigationOptions = ({ navigation, screenProps }) => ({
        headerTitle: '商品详情',
    })

    render() {
        return (
            <View style={styles.containerAppHome}>
                <ScrollView style={{ flex: 1, marginBottom: 70 }}>
                    {/*轮播图*/}
                    <View style={{ width: width, height: 200 }}>
                        {
                            this.state.slideshowArr ?
                                <Swiper autoplay={true} showsPagination={true} height={200} horizontal={true} showsButtons={false}>
                                    {this.fetchData()}
                                </Swiper> : null
                        }
                    </View>
                    {/*商品介绍名称价格*/}
                    <View style={styles.goodPriceTitle}>
                        <View style={styles.goodPriceTitle1}>
                            <Text numberOfLines={3} ellipsizeMode="tail" style={styles.goodTitleText}>{this.state.goodsDetail.title}</Text>
                            {
                                this.state.activeVip == 1 ? <View style={styles.goodPriceCon3}>
                                    <Text style={styles.goodPriceCon2Text3}>￥<Text style={styles.goodPriceCon2Text4}>{this.state.PriceNum}</Text></Text>
                                    <Image style={{ marginLeft: 9 }} source={require('./Images/vip.png')} />
                                </View> : <View style={styles.goodPriceCon2}>
                                        <Text style={styles.goodPriceCon2Text1}>￥<Text style={styles.goodPriceCon2Text2}>{this.state.PriceNum}</Text></Text>
                                    </View>
                            }
                            {/*<View style={styles.goodPriceCon4}>*/}
                            {/*    <Text style={styles.goodPriceCon4Text1}>会员价：￥66.66</Text>*/}
                            {/*    <View style={styles.goodPriceCon41}>*/}
                            {/*        <Text style={styles.goodPriceCon4Text2}>还不是会员?立即开通</Text>*/}
                            {/*        <Image source={require('./Images/left.png')}/>*/}
                            {/*    </View>*/}
                            {/*</View>*/}
                            <View style={styles.goodPriceCon5}>
                                <Text style={styles.goodPriceCon5Text1}>剩余：{this.state.goodsDetail.reaminStock}{this.state.goodsDetail.unit}</Text>
                                {
                                    this.state.goodsDetail.logisticsCost == 0 ? <Text style={styles.goodPriceCon5Text1}>包邮</Text> : <Text
                                        style={styles.goodPriceCon5Text1}>{this.state.goodsDetail.logisticsCost ? this.state.goodsDetail.logisticsCost / 100 : this.state.goodsDetail.logisticsCost}</Text>
                                }
                            </View>
                        </View>
                    </View>
                    {/*选择套餐*/}
                    {
                        this.state.goodsDetail.spec == 1 ? <TouchableWithoutFeedback onPress={() => this.setState({ goodType: true })}>
                            <View style={styles.goodPriceTitle}>
                                <View style={styles.goodPriceTitle1}>
                                    <View style={styles.goodPriceCon5}>
                                        <Text style={styles.goodPriceCon5Text1}>已选：<Text style={styles.goodPriceCon5Text2}>{this.state.selectText}</Text></Text>
                                        <Image source={require('./Images/left.png')} />
                                    </View>
                                </View>
                            </View>
                        </TouchableWithoutFeedback> : null
                    }
                    {/*配送方式*/}
                    <View style={styles.goodPriceTitleN}>
                        <View style={styles.goodPriceTitle1}>
                            <View style={styles.goodPriceCon5}>
                                <Text style={styles.goodPriceCon5Text1}>配送方式：快递</Text>
                            </View>
                        </View>
                    </View>
                    {/*评论更多*/}
                    {
                        this.state.EvaluationList.length > 0 ? <View style={styles.goodPriceTitle3}>
                            <View style={styles.goodPriceTitle2}>
                                <View style={styles.goodPriceCon6}>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <Image source={require('./Images/pl.png')} />
                                        <Text style={styles.goodPriceCon8Text}>评论</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <Text style={{ paddingRight: 10 }}>更多</Text>
                                        <Image source={require('./Images/left.png')} />
                                    </View>
                                </View>
                            </View>
                            <View style={{ backgroundColor: "#FFFFFF", width: width, alignItems: "center" }}>
                                <View style={styles.pyquyuscon}>
                                    <View style={styles.pyquyuscon1}>
                                        <Image source={require('./Images/vip.png')} />
                                    </View>
                                    <View style={styles.pyquyuscon2}>
                                        <View style={styles.pyquyuscon21}>
                                            <View style={styles.pyquyuscon211}>
                                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                    <Text style={styles.yhniche}>来自非洲的战神</Text>
                                                </View>
                                                <Text style={styles.yhnitime}>2019年12月12日 16:30</Text>
                                            </View>
                                        </View>
                                        <View style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: "#DDDDDD", paddingBottom: 15, marginTop: 13 }}>
                                            <Text numberOfLines={5} ellipsizeMode="tail" style={styles.descconText}>泰与恒两卦。 “坤乾”是一种易书，出自商代，坤为金德，殷以 金德王，故坤乾为商代之易。</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{ backgroundColor: "#FFFFFF", width: width, alignItems: "center" }}>
                                <View style={styles.pyquyuscon}>
                                    <View style={styles.pyquyuscon1}>
                                        <Image source={require('./Images/vip.png')} />
                                    </View>
                                    <View style={styles.pyquyuscon2}>
                                        <View style={styles.pyquyuscon21}>
                                            <View style={styles.pyquyuscon211}>
                                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                    <Text style={styles.yhniche}>来自非洲的战神</Text>
                                                </View>
                                                <Text style={styles.yhnitime}>2019年12月12日 16:30</Text>
                                            </View>
                                        </View>
                                        <View style={styles.gddosListN}>
                                            <Text numberOfLines={5} ellipsizeMode="tail" style={styles.descconText}>泰与恒两卦。 “坤乾”是一种易书，出自商代，坤为金德，殷以 金德王，故坤乾为商代之易。</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View> : null
                    }
                    {/*购买须知*/}
                    <View style={styles.goodPriceTitle3}>
                        <View style={styles.goodPriceTitle2}>
                            <View style={styles.goodPriceCon6}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Image source={require('./Images/goumai.png')} />
                                    <Text style={styles.goodPriceCon8Text}>购买须知</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.goodPriceTitle2}>
                            <View style={styles.goodPriceCon6}>
                                <View>
                                    <Text style={styles.goodPriceCon7Text}>关于包装</Text>
                                    <Text style={{ color: "#767676", fontSize: 14, marginTop: 7 }}>页面图片及描述仅供参考，由于显示器、设置亮度、光线 等诸多因素影响会造成一定色差，因此您收到货品可能与 图片包装不完</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.goodPriceTitle2}>
                            <View style={styles.goodPriceCon6}>
                                <View>
                                    <Text style={styles.goodPriceCon7Text}>关于签收</Text>
                                    <Text style={{ color: "#767676", fontSize: 14, marginTop: 7 }}>建议您先验货后签收，验货时若发现商品少货、错货等问 题，请第一时间联系客服处理;若商品包装损坏请直接拒收</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.goodPriceTitle2}>
                            <View style={styles.goodPriceCon6}>
                                <View>
                                    <Text style={styles.goodPriceCon7Text}>关于退货</Text>
                                    <Text style={{ color: "#767676", fontSize: 14, marginTop: 7 }}>商品不支持7天无理由退换货;签收后发现:商品出现缺少、 损坏等问题，请在24小时内联系客服处</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    {/*商品详情*/}
                    <View style={styles.goodPriceTitle3N}>
                        <View style={styles.goodPriceTitle2}>
                            <View style={styles.goodPriceCon6}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Image source={require('./Images/spxq.png')} />
                                    <Text style={styles.goodPriceCon8Text}>商品详情</Text>
                                </View>
                            </View>
                        </View>
                        <HTMLView style={styles.goodPriceTitle2} value={this.state.goodsDetail.details} />
                    </View>
                </ScrollView>
                {/*选择分类*/}
                {
                    this.state.goodType ?
                        <Animated.View style={styles.mask}></Animated.View> : null
                }
                <Modal animationType="slide" transparent={true} visible={this.state.goodType} onRequestClose={() => {
                    this.onRequestClose();
                }}>
                    <View style={styles.selectTypeGood}>
                        <View style={styles.selectTypeGood1}>
                            <View style={{ flexDirection: "row" }}>
                                {
                                    this.state.deilImg ? <Image style={styles.goodImgSize} source={{ uri: global.PicUrl + this.state.deilImg }} /> :
                                        <Image style={styles.goodImgSize} source={require('./Images/bj.png')} />
                                }
                                <View style={{ paddingLeft: 10, paddingTop: 10 }}>
                                    <Text style={styles.TextSize}>￥<Text style={styles.TextSize1}>{this.state.PriceNum}</Text></Text>
                                    <Text style={styles.xzspmcsty}>已选：{
                                        this.state.goodsDetail.spec == 0 ? this.state.goodsDetail.title : this.state.specGoodsName
                                    }</Text>
                                </View>
                            </View>
                            <TouchableWithoutFeedback onPress={() => this.onRequestClose()}>
                                <View style={{ width: 60, height: 60, flexDirection: "row", justifyContent: "center" }}>
                                    <Image style={styles.GbImgsize} source={require('./Images/x.png')} />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        {
                            this.state.goodsDetail.spec == 1 ? <View style={styles.selectTypeGood2}>
                                <Text>商品种类</Text>
                                <View style={styles.selectTypeGood21}>
                                    {
                                        this.state.goodsDetail.specs.map((item, index) => {
                                            return (
                                                <TouchableWithoutFeedback key={index} onPress={() => this.Productselect(item, index)}>
                                                    <View style={this.state.selectIndex == index ? styles.selectTypeGood211Active : styles.selectTypeGood211}>
                                                        <Text style={this.state.selectIndex == index ? styles.selectTypeGood211TextActive : styles.selectTypeGood211Text}>{item.title}</Text>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            )
                                        })
                                    }
                                </View>
                            </View> : null
                        }
                        <View style={styles.selectTypeGood3}>
                            <Text>购买数量</Text>
                            <View style={styles.selectTypeGood31}>
                                {
                                    this.state.goodsNum == 1 ? <Image style={{ width: 22, height: 22 }} source={require('./Images/jian.png')} /> :
                                        <TouchableWithoutFeedback onPress={() => this.MinNum()}><Image style={{ width: 22, height: 22 }}
                                            source={require('./Images/jian.png')} /></TouchableWithoutFeedback>
                                }
                                <Text style={styles.goumaiNum}>{this.state.goodsNum}</Text>
                                <TouchableWithoutFeedback onPress={() => this.MaxNum()}>
                                    <Image style={{ width: 22, height: 22 }} source={require('./Images/jia.png')} />
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                        <TouchableWithoutFeedback onPress={() => this.shoppingCart(this.state.confirmText)}>
                            <View style={styles.selectTypeGood4}>
                                <Text style={styles.selectTypeGood4Text}>{this.state.confirmText}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </Modal>
                <View style={styles.btmcon}>
                    <TouchableWithoutFeedback onPress={() => this.gotoHome()}>
                        <View style={styles.btmconleft}>
                            <Image source={require('./Images/shouye.png')} />
                            <Text style={styles.IndexTextNo}>店铺</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => this.customerService()}>
                        <View style={styles.btmconright}>
                            <Image source={require('./Images/kf.png')} />
                            <Text style={styles.IndexTextNo}>客服</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.btmconright2}>
                        <TouchableWithoutFeedback onPress={() => this.shoppingCartBtnClick()}>
                            <View style={styles.btmconright2L}>
                                <Text style={styles.btmconright2LText}>加入购物车</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => this.buyBtnClick()}>
                            <View style={styles.btmconright2R}>
                                <Text style={styles.btmconright2RText}>立即抢购</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <Loading show={this.state.loadingState} />
                <Loadingn show={this.state.loadingState1} />
            </View>
        );
    }

    onRequestClose = () => {
        this.setState({
            goodType: false
        })
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

    // 加入购物车
    shoppingCartBtnClick = () => {
        if (this.state.userInfo != null && this.state.userInfo.id != null) {
            this.setState({ goodType: true, confirmText: "加入购物车" });
        }
        else {
            this.props.navigation.navigate("Registr");
        }

    }

    // 购买
    buyBtnClick() {
        if (this.state.userInfo != null && this.state.userInfo.id != null) {
            this.setState({ goodType: true, confirmText: "确认" })
        }
        else {
            this.props.navigation.navigate("Registr");
        }

    }

    // 联系客服
    customerService = () => {
        let url = 'tel:13860116767';
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    }

    // 轮播图
    fetchData() {
        let imgs = [];
        let imgAry = this.state.slideshowArr;
        for (let i = 0; i < imgAry.length; i++) {
            imgs.push(
                <Image
                    resizeMode='contain'
                    key={i}
                    source={{ uri: imgAry[i] }}
                    style={[styles.img]} />
            );
        }
        return imgs;
    }

    // 商品详情
    getGoodsDetail = (goodsId, userId) => {
        console.log("用户id", userId);

        let formData = new FormData();
        formData.append('goodsId', goodsId);
        if (userId != null && userId != '') {
            formData.append('userId', userId);
        }

        let url = JFAPI.getInfo;
        let opts = {
            method: 'POST',
            body: formData
        };
        fetch(url, opts)
            .then((response) => response.json())
            .then((responseData) => {
                console.log("商品详情：" + JSON.stringify(responseData));
                if (responseData.code == 0) {
                    this.setState({
                        goodsDetail: responseData.data,
                        loadingState: false
                    })
                    let allData = this.state.goodsDetail;
                    if (allData.userLevel == 1 || allData.userLevel == 2) {
                        this.setState({
                            PriceNum: allData.price / 100,
                            PriceNumAll: allData.price / 100
                        })
                    } else if (allData.userLevel == 3 || allData.userLevel == 4 || allData.userLevel == 5) {
                        this.setState({
                            PriceNum: allData.hyPrice / 100,
                            PriceNumAll: allData.hyPrice / 100
                        })
                    } else if (allData.userLevel == 6 || allData.userLevel == 7 || allData.userLevel == 8) {
                        this.setState({
                            PriceNum: allData.gzPrice / 100,
                            PriceNumAll: allData.gzPrice / 100
                        })
                    } else if (allData.userLevel == 9 || allData.userLevel == 10 || allData.userLevel == 11) {
                        this.setState({
                            PriceNum: allData.ymPrice / 100,
                            PriceNumAll: allData.ymPrice / 100
                        })
                    } else {
                        this.setState({
                            PriceNum: allData.price / 100,
                            PriceNumAll: allData.price / 100
                        })
                    }
                    // 轮播图
                    let imgArr = [];
                    if (allData.imgList.length > 0) {
                        for (let i = 0; i < allData.imgList.length; i++) {
                            imgArr.push(global.PicUrl + allData.imgList[i]);
                        }
                        this.setState({
                            slideshowArr: imgArr
                        })
                    } else {
                        this.setState({
                            slideshowArr: ['https://taijiqiu.oss-cn-hangzhou.aliyuncs.com/xcx/bb3JsY7RazaW5bDdnB3XpA.jpg']
                        })
                    }
                    // 页面加载如果有多规格，设置默认规格
                    if (allData.spec == 1) {
                        this.setState({
                            specId: allData.specs[0].id,
                            deilImg: allData.specs[0].img,
                            // 多规格设置默认购物价格
                            PriceNumAll: allData.specs[0].price / 100
                        })
                        if (allData.spec == 1 && allData.price == 0) {
                            this.setState({
                                PriceNum: allData.specs[0].price / 100
                            })
                        } else if (allData.spec == 0) {
                            this.setState({
                                PriceNum: allData.price / 100
                            })
                        }
                    } else if (allData.spec == 0) {
                        this.setState({
                            deilImg: allData.imgList ? allData.imgList[0] : ''
                        })
                    }
                } else {
                    this.setState({
                        goodsDetail: '',
                        loadingState: false
                    })
                }
            })
            .catch((err) => {
                this.setState({
                    loadingState: false
                })
                console.log(err);
            })
    }
    // 评价列表
    getEvaluationList = (goodsId, pic, page, length) => {
        let url = JFAPI.getEvaluationList;
        let formData = new FormData();
        formData.append('goodsId', goodsId);
        formData.append('pic', pic);
        formData.append('page', page);
        formData.append('length', length);
        let opts = {
            method: "POST",
            body: formData
        };
        fetch(url, opts)
            .then((response) => response.json())
            .then((res) => {
                console.log('评价列表', res);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    // 选择分类商品
    Productselect = (item, index) => {
        this.setState({
            specId: item.id,
            specGoodsName: item.title
        })
        if (this.state.goodsDetail.userLevel == 0 || this.state.goodsDetail.userLevel == 1 || this.state.goodsDetail.userLevel == 2) {
            this.setState({
                PriceNumAll: item.price ? item.price / 100 : 0
            })
        } else if (this.state.goodsDetail.userLevel == 3 || this.state.goodsDetail.userLevel == 4 || this.state.goodsDetail.userLevel == 5) {
            this.setState({
                PriceNumAll: item.hyPrice ? item.hyPrice / 100 : 0
            })
        } else if (this.state.goodsDetail.userLevel == 6 || this.state.goodsDetail.userLevel == 7 || this.state.goodsDetail.userLevel == 8) {
            this.setState({
                PriceNumAll: item.gzPrice ? item.gzPrice / 100 : 0
            })
        } else if (this.state.goodsDetail.userLevel == 9 || this.state.goodsDetail.userLevel == 10 || this.state.goodsDetail.userLevel == 11) {
            this.setState({
                PriceNumAll: item.ymPrice ? item.ymPrice / 100 : 0
            })
        } else {
            this.setState({
                PriceNumAll: item.price / 100
            })
        }
        this.setState({
            selectText: item.title,
            deilImg: item.img,
            selectIndex: index
        })
    }
    // 购物车确定保存商品
    shoppingCart = (type) => {
        // 0 单规格 1 多规格
        let spec = this.state.goodsDetail.spec;
        // 商品数量
        let num = this.state.goodsNum;
        // 商品id
        let goodsId = this.state.goodsDetail.id;
        // 用户id
        let userId = this.state.userInfo.id;
        // 单规格 specId 穿0 , 多规格就传当前选择分类的id
        let specId = spec == 0 ? 0 : this.state.specId;
        let formData = new FormData();
        formData.append('num', num);
        formData.append('goodsId', goodsId);
        formData.append('userId', userId);
        formData.append('specId', specId);
        let url = JFAPI.saveGoods;
        let opts = {
            method: 'POST',
            body: formData
        }
        this.setState({
            loadingState1: false,
            goodType: false,
        })
        if (type == "加入购物车") {
            fetch(url, opts)
                .then((response) => response.json())
                .then((responseData) => {
                    Alert.alert(
                        '成功加入购物车',
                        '请及时下单购买，以免被抢完',
                        [
                            { text: '继续添加', onPress: () => this.setState({ goodType: true }) },
                            { text: "去结算", onPress: () => this.props.navigation.navigate('ShoppingCartN') }
                        ]
                    );
                })
                .catch((err) => {
                    this.setState({
                        loadingState1: false,
                        goodType: false
                    })
                    console.log(err);
                })
        } else if (type == "确认") {
            let spec = this.state.goodsDetail.spec;
            let specId = spec == 0 ? '' : this.state.specId;
            let specName = '';
            let url = JFAPI.getUserDefaultAddres;
            let formData = new FormData();
            if (this.state.goodsDetail.spec == 1) {
                for (let i = 0; i < this.state.goodsDetail.specs.length; i++) {
                    if (specId == this.state.goodsDetail.specs[i].id) {
                        specName = this.state.goodsDetail.specs[i].title
                    }
                }
            }
            formData.append('userId', this.state.userInfo.id);
            let goodsInfo = JSON.stringify([{
                goodsId: this.state.goodsDetail.id,
                title: this.state.goodsDetail.title,
                spec: spec,
                specId: specId,
                specName: spec == 0 ? '默认规格' : specName,
                num: this.state.goodsNum,
                buyPrice: this.state.PriceNumAll * 100,
                unit: this.state.goodsDetail.unit,
                broadImg: this.state.goodsDetail.imgList[0]
            }])
            formData.append('goodsInfo', goodsInfo);
            let opts = {
                method: "POST",
                body: formData
            };
            fetch(url, opts)
                .then((response) => response.json())
                .then((res) => {
                    console.log("已生成");
                    console.log(res);
                    if (res.code == 0 && res.info == '请选择地址') {
                        this.props.navigation.navigate('ShippingAddress2N', {
                            arefresh: function () {
                                self.getUserAddress(self.state.userInfo.id);
                            }
                        });
                    } else if (res.code == 0 && res.data) {
                        this.props.navigation.navigate('OrderPaymentN', { data: res.data });
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
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
            })
            .catch((error) => {
                console.log(error);
            })
    }
    // 前往首页
    gotoHome = () => {
        let self = this;
        self.props.navigation.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'HomeN' })]
            })
        )
    }
    // 请求页面接口
    componentDidMount() {
        this.fetchData();
        // 获取用户数据
        AsyncStorage.getItem('userInfo')
            .then(result => {
                console.log("用户信息", result);
                console.log(JSON.parse(result));
                this.setState({
                    userInfo: JSON.parse(result)
                })
            }).catch(error => {
                console.log("读取失败");
            })


        setTimeout(() => {
            let userId = '';
            if (this.state.userInfo != null && this.state.userInfo.id != null) {
                userId = this.state.userInfo.id;
            }
            let goodsId = this.props.navigation.state.params.detail.id;
            this.getGoodsDetail(goodsId, userId);
            this.getEvaluationList(goodsId, 0, 1, 5);// 原本放的是userid
        }, 200)
    }

    componentWillMount() {
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
        width: width * 0.18
    },
    btmconright: {
        justifyContent: "center",
        alignItems: "center",
        width: width * 0.18
    },
    btmconright2: {
        justifyContent: "space-around",
        flexDirection: "row",
        alignItems: "center",
        width: width * 0.6
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
    goodPriceTitle: {
        width: width,
        borderBottomWidth: 1,
        borderBottomColor: "#DDDDDD"
    },
    goodPriceTitle3: {
        width: width,
        borderBottomWidth: 6,
        borderBottomColor: "#DDDDDD",
        paddingTop: 15,
        justifyContent: "center"
    },
    goodPriceTitle3N: {
        width: width,
        paddingTop: 15,
        justifyContent: "center"
    },
    goodPriceTitleN: {
        width: width,
        borderBottomWidth: 6,
        borderBottomColor: "#EAEAEA"
    },
    goodPriceTitle1: {
        width: "94%",
        marginLeft: "3%",
        marginTop: 15,
        marginBottom: 15
    },
    goodPriceTitle2: {
        width: "94%",
        marginLeft: "3%",
        marginBottom: 15
    },
    goodTitleText: {
        color: "#282828",
        fontSize: 16,
        fontWeight: "700"
    },
    goodPriceCon2: {
        marginTop: 8
    },
    goodPriceCon3: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
        marginBottom: 8
    },
    goodPriceCon2Text1: {
        fontSize: 14,
        color: "#FF3C32",
        fontWeight: "500"
    },
    goodPriceCon2Text2: {
        color: "#FF3C32",
        fontSize: 24,
        fontWeight: "500"
    },
    goodPriceCon2Text3: {
        color: "#282828",
        fontSize: 13,
        fontWeight: '500'
    },
    goodPriceCon2Text4: {
        color: "#282828",
        fontSize: 18,
        fontWeight: '500'
    },
    goodPriceCon4: {
        backgroundColor: "#3E3E3E",
        borderRadius: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 6,
        height: 28,
        alignItems: "center",
        paddingLeft: 9,
        paddingRight: 9,
        marginBottom: 8
    },
    goodPriceCon5: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 4,
        marginBottom: 4
    },
    goodPriceCon6: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    goodPriceCon4Text1: {
        color: "#FFE400",
        fontSize: 13,
        fontWeight: "400"
    },
    goodPriceCon4Text2: {
        color: "#FFFFFF",
        fontSize: 13,
        paddingRight: 6
    },
    goodPriceCon41: {
        flexDirection: "row",
        alignItems: "center"
    },
    goodPriceCon5Text1: {
        color: "#767676",
        fontSize: 13
    },
    goodPriceCon5Text2: {
        color: "#282828",
        fontSize: 15
    },
    goodPriceCon6Text: {
        color: "#282828",
        fontSize: 14,
        fontWeight: '500',
        paddingLeft: 5
    },
    goodPriceCon7Text: {
        color: "#282828",
        fontSize: 14,
        fontWeight: '500'
    },
    goodPriceCon8Text: {
        color: "#282828",
        fontSize: 16,
        fontWeight: '500',
        paddingLeft: 5
    },
    pyquyuscon: {
        flexDirection: "row",
        width: width * 0.9,
        marginTop: 10,
        paddingTop: 15,
        paddingBottom: 15
    },
    pyquyuscon21: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    pyquyuscon1: {
        width: width * 0.2,
    },
    pyquyuscon2: {
        width: width * 0.72
    },
    pyquyuscon212: {
        flexDirection: "row",
        paddingRight: 10
    },
    yhniche: {
        color: "#757575",
        fontSize: 14
    },
    tieText1: {
        backgroundColor: "#B98A69",
        marginLeft: 5,
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10
    },
    tieText2: {
        color: "#FFFFFF",
        fontSize: 10
    },
    yhnitime: {
        color: "#B2B2B2",
        fontSize: 11,
        paddingTop: 5
    },
    gddosList: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: "#DDDDDD",
        paddingBottom: 15,
        marginTop: 13
    },
    gddosListN: {
        width: '100%',
        paddingBottom: 15,
        marginTop: 13
    },
    btmconright2L: {
        backgroundColor: "#FFBD20",
        height: 40,
        width: 116,
        alignItems: "center",
        justifyContent: "center",
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20
    },
    btmconright2R: {
        backgroundColor: "#FF8625",
        height: 40,
        width: 116,
        alignItems: "center",
        justifyContent: "center",
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20
    },
    btmconright2LText: {
        color: "#FFFFFF",
        fontSize: 16

    },
    btmconright2RText: {
        color: "#FFFFFF",
        fontSize: 16
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
    selectTypeGood: {
        position: "absolute",
        bottom: 0,
        width: width,
        backgroundColor: "#FFFFFF"
    },
    selectTypeGood1: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    selectTypeGood2: {
        marginTop: 10,
        width: "92%",
        marginLeft: "4%"
    },
    selectTypeGood3: {
        flexDirection: "row",
        marginTop: 10,
        width: "92%",
        marginLeft: "4%",
        justifyContent: "space-between",
        borderBottomColor: "#DDDDDD",
        borderBottomWidth: 1,
        paddingBottom: 10
    },
    selectTypeGood4: {
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 10,
        width: "92%",
        marginLeft: "4%",
        justifyContent: "center"
    },
    goodImgSize: {
        width: 110,
        height: 110,
        zIndex: 10,
        marginTop: -50,
        marginLeft: 10
    },
    TextSize: {
        color: "#FF3C32",
        fontSize: 14,
        fontWeight: "500"
    },
    TextSize1: {
        color: "#FF3C32",
        fontSize: 21,
        fontWeight: "500"
    },
    xzspmcsty: {
        fontSize: 13,
        color: "#B2B2B2",
        paddingTop: 8
    },
    GbImgsize: {
        position: "absolute",
        top: 8,
        right: 8
    },
    selectTypeGood21: {
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 10
    },
    selectTypeGood211: {
        backgroundColor: "#EFEFEF",
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 6,
        paddingBottom: 6,
        marginRight: 10,
        marginBottom: 10,
        borderRadius: 11
    },
    selectTypeGood211Active: {
        backgroundColor: "#FFF2F1",
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 6,
        paddingBottom: 6,
        marginRight: 10,
        marginBottom: 10,
        borderRadius: 11
    },
    selectTypeGood211Text: {
        color: "#272727",
        fontSize: 14
    },
    selectTypeGood211TextActive: {
        color: "#FF3C32",
        fontSize: 14
    },
    selectTypeGood31: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    selectTypeGood4Text: {
        color: "#B06F42",
        fontSize: 19,
        fontWeight: '500'
    },
    goumaiNum: {
        paddingLeft: 5,
        paddingRight: 5
    }
});
