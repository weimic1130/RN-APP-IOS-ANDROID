import React, { Component } from 'react'
import { View, ScrollView, CheckBox, Text, Alert, TouchableWithoutFeedback, TouchableOpacity, TouchableHighlight, Image, StyleSheet, SectionList, Dimensions } from 'react-native'
import { commonStyle } from './js/commonStyle'
import AsyncStorage from '@react-native-community/async-storage';
import BlankPages from '../BlankPages/BlankPages';
const shoppingCartData = require('./json/ShoppingCarData')
import { JFAPI } from './API/API';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
import global from '../global';
export default class ShoppingCartIos extends Component {
    constructor(props) {
        super(props)
        // this.renderItem = this.renderItem.bind(this)
        // this.renderSectionHeader = this.renderSectionHeader.bind(this)
        this.state = {
            quanNum: 1,
            userInfo: '',
            shopList: [],
            status: [],
            isSelectedAllItem: false,
            totalNum: 0,
            totalPrice: 0.00
        }
    }

    static navigationOptions = ({ navigation, screenProps }) => ({
        headerTitle: '购物车',
        headerStyle: {
            backgroundColor: "#323232"
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    })

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={{ flex: 1 }}>
                    {
                        this.state.shopList.length > 0 ? this.state.shopList.map((item, index) => {
                            return (
                                <View style={styles.cellStyle} key={index}>
                                    <TouchableOpacity onPress={() => this.checkItem(item, index)}>
                                        <Image style={styles.checkBox} source={item.checked ? require('./Images/xz.png') : require('./Images/wx.png')} />
                                    </TouchableOpacity>
                                    <Image style={{ width: 90, height: 90, marginLeft: 10 }} source={{ uri: global.PicUrl + item.broadImg }} />
                                    <View style={{ justifyContent: commonStyle.around, flex: 1, marginHorizontal: 10 }}>
                                        <Text ellipsizeMode="tail" numberOfLines={2} style={{ fontSize: 13, color: "#282828" }}>{item.title}</Text>
                                        <Text ellipsizeMode="tail" numberOfLines={1} style={{ paddingTop: 10, color: "#B2B2B2", fontSize: 13 }}>{item.spec == 0 ? item.specName : '默认规格'}</Text>
                                        <Text style={{ fontSize: 14, fontWeight: "bold", color: "#FF3C32", paddingTop: 8 }}>￥<Text style={{ fontSize: 21 }}>{item.buyPrice / 100}</Text></Text>
                                    </View>
                                    <View style={{ flexDirection: commonStyle.row, alignItems: commonStyle.center, marginHorizontal: 10 }}>
                                        <TouchableOpacity activeOpacity={1} onPress={() => this.minus(item, index)}>
                                            {/*<TouchableOpacity activeOpacity={1} onPress={() => this.minus(sectionIndex, index)}>*/}
                                            {/*<TouchableOpacity activeOpacity={1}>*/}
                                            <Image source={require('./Images/2.png')} style={{ marginTop: 10, marginBottom: 10 }} />
                                        </TouchableOpacity>
                                        <Text style={{ width: 30, textAlign: 'center' }}>{item.num}</Text>
                                        {/*<TouchableOpacity activeOpacity={1} onPress={() => this.add(sectionIndex, index)}>*/}
                                        <TouchableOpacity activeOpacity={1} onPress={() => this.add(item, index)}>
                                            {/*<TouchableOpacity activeOpacity={1}>*/}
                                            <Image source={require('./Images/4.png')} />
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableWithoutFeedback onPress={() => this.deleteGoods(item, index)}>
                                        <Text style={{ position: "absolute", bottom: 20, right: 20 }}>删除</Text>
                                    </TouchableWithoutFeedback>
                                </View>
                            )
                        }) : <BlankPages width={width} height={height} justify={'center'} align={'center'} />
                    }
                </ScrollView>
                {
                    this.state.shopList.length > 0 ? <View style={styles.toolBar}>
                        <View style={{ flex: 1, paddingLeft: 10, flexDirection: commonStyle.row, alignItems: commonStyle.center }}>
                            <TouchableOpacity onPress={() => this.checkAllShop()}>
                                <Image style={styles.checkBox} source={this.state.isSelectedAllItem ? require('./Images/xz.png') : require('./Images/wx.png')} />
                            </TouchableOpacity>
                            <Text style={{ paddingLeft: 5, fontSize: 14, color: "#282828" }}>全选</Text>
                        </View>
                        <View>
                            <Text style={{ marginHorizontal: 10 }}>总计:
                                <Text style={{ color: commonStyle.red }}>￥{parseFloat(this.state.totalPrice).toFixed(2)}</Text>
                            </Text>
                            <Text style={{ color: "#B2B2B2", fontSize: 12, marginHorizontal: 10, paddingTop: 5 }}>免运费</Text>
                        </View>
                        <TouchableWithoutFeedback onPress={() => this.setTlement()}>
                            <View style={{ width: 120, backgroundColor: "#B06F42", alignItems: commonStyle.center, justifyContent: commonStyle.center, height: commonStyle.cellHeight }}>
                                <Text style={{ color: commonStyle.white }}>去结算({this.state.totalNum})</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View> : null
                }
            </View>
        )
    }
    // 删除商品
    deleteGoods = (obj, index) => {
        Alert.alert(
            '提示',
            '是否删除购物车商品?',
            [
                { text: '取消', onPress: () => this.setState({ goodType: true }) },
                { text: "删除", onPress: () => this.determineGoods(obj.id) }
            ]
        );
    }
    determineGoods = (id) => {
        let url = JFAPI.deleteGoods;
        let formData = new FormData();
        formData.append('id', id);
        let opts = {
            method: "POST",
            body: formData
        }
        fetch(url, opts)
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
                if (responseData.code == 0) {
                    this.getShopplist(this.state.userInfo.id);
                    this.setState({
                        totalPrice: 0.00,
                        totalNum: 0
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }
    // 去结算
    setTlement = () => {
        let dataList = this.state.shopList;
        let dataArr = [];
        for (let i = 0; i < dataList.length; i++) {
            if (dataList[i].checked) {
                console.log(dataList[i].specId.length);
                dataArr.push(
                    {
                        goodsId: dataList[i].goodsId,
                        title: dataList[i].title,
                        spec: dataList[i].specId.length > 1 ? 1 : 0,
                        specId: dataList[i].specId,
                        specName: dataList[i].specName,
                        num: dataList[i].num,
                        buyPrice: dataList[i].buyPrice,
                        unit: dataList[i].unit,
                        broadImg: dataList[i].broadImg
                    }
                );
            }
        }
        if (dataArr.length == 0) {
            Alert.alert("请选择商品");
            return;
        }
        let url = JFAPI.saveUserDefault;
        let formData = new FormData();
        let goodsInfo = JSON.stringify(dataArr);
        formData.append('userId', this.state.userInfo.id);
        formData.append('goodsInfo', goodsInfo);
        let opts = {
            method: 'POST',
            body: formData
        };
        fetch(url, opts)
            .then((response) => response.json())
            .then((res) => {
                console.log("已生成");
                console.log(res);
                if (res.code == 0) {
                    if (res.info == '请选择地址') {
                        this.props.navigation.navigate('ShippingAddressN', {
                            data: '', refresh: function () {
                                console.log("刷新");
                            }
                        })
                    } else {
                        this.props.navigation.navigate('OrderPaymentN', { data: res.data });
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            })
        // saveUserDefault
        // this.props.navigation.navigate('OrderPaymentN');
    }
    // 获取购物车详情
    getShopplist = (id) => {
        let formData = new FormData();
        formData.append('userId', id);
        let opts = {
            method: "POST",
            body: formData
        };
        let url = JFAPI.getShoppingCart;
        let objArr = [];
        fetch(url, opts)
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
                if (responseData.code == 0) {
                    if (responseData.data.length > 0) {
                        for (let i = 0; i < responseData.data.length; i++) {
                            objArr.push(
                                {
                                    checked: false,
                                    broadImg: responseData.data[i].broadImg,
                                    buyPrice: responseData.data[i].buyPrice,
                                    goodsId: responseData.data[i].goodsId,
                                    id: responseData.data[i].id,
                                    logisticsMoney: responseData.data[i].logisticsMoney,
                                    num: responseData.data[i].num,
                                    spec: responseData.data[i].spec,
                                    specId: responseData.data[i].specId,
                                    specName: responseData.data[i].specName,
                                    title: responseData.data[i].title,
                                    unit: responseData.data[i].unit
                                }
                            )
                        }
                        this.setState({
                            shopList: objArr
                        })
                        console.log(this.state.shopList);
                    } else {
                        this.setState({
                            shopList: ''
                        })
                    }
                } else {
                    this.setState({
                        shopList: []
                    })
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    componentWillMount() {

    }

    componentDidMount() {
        // 网络请求获取购物车数据
        // 获取用户数据
        console.log("获取购物车数据");
        AsyncStorage.getItem('userInfo')
            .then(result => {
                this.setState({
                    userInfo: JSON.parse(result)
                })
                this.getShopplist(this.state.userInfo.id);
            }).catch(error => {
                console.log("读取失败");
            })
    }

    checkItem(sectionIndex, index) {
        let isSelectedAllShopItem = true
        let tagNum = [];
        if (this.state.shopList[index].checked) {
            isSelectedAllShopItem = false;
        } else {
            isSelectedAllShopItem = true
        }
        this.state.shopList[index].checked = isSelectedAllShopItem;
        this.setState({
            shopList: this.state.shopList
        })
        let selectArrPrice = 0;
        let selectNum = 0;
        if (this.state.quanNum == 0) {
            this.setState({
                totalNum: 0
            })
        }
        for (let i = 0; i < this.state.shopList.length; i++) {
            if (this.state.shopList[i].checked) {
                tagNum.push(i);
                selectArrPrice = selectArrPrice + this.state.shopList[i].buyPrice / 100 * this.state.shopList[i].num
                selectNum = selectNum + this.state.shopList[i].num;
                // 选择的商品总价
                this.setState({
                    totalPrice: selectArrPrice,
                    totalNum: selectNum
                })
            }
            if (!this.state.shopList[i].checked) {
                this.setState({
                    isSelectedAllItem: false,
                })
            }
            if (tagNum.length == this.state.shopList.length) {
                this.setState({
                    isSelectedAllItem: true
                })
            } else {
                this.setState({
                    isSelectedAllItem: false
                })
            }
        }
        // this.calculateCountAndPrice()
        // this.setState({isSelectedAllItem: isSelectedAllShop, status: tempStatus})
    }

    checkedShop(index) {
        let tempStatus = this.state.status
        let shop = tempStatus[index]
        shop.checked = !shop.checked
        let items = shop.items
        for (let j = 0; j < items.length; j++) {
            let item = items[j]
            item.checked = shop.checked
        }

        let isSelectedAllShop = true
        for (let j = 0; j < tempStatus.length; j++) {
            let shop = tempStatus[j]
            if (!shop.checked) {
                isSelectedAllShop = false
                break
            }
        }

        this.calculateCountAndPrice()
        this.setState({ isSelectedAllItem: isSelectedAllShop, status: tempStatus })
    }

    checkAllShop() {
        let priceNum = [];
        let priceNum2 = [];
        let priceT = 0;
        let priceT2 = 0;
        if (this.state.isSelectedAllItem == false) {
            let array = [];
            for (let i = 0; i < this.state.shopList.length; i++) {
                array.push(
                    {
                        checked: true,
                        broadImg: this.state.shopList[i].broadImg,
                        buyPrice: this.state.shopList[i].buyPrice,
                        goodsId: this.state.shopList[i].goodsId,
                        id: this.state.shopList[i].id,
                        logisticsMoney: this.state.shopList[i].logisticsMoney,
                        num: this.state.shopList[i].num,
                        spec: this.state.shopList[i].spec,
                        specId: this.state.shopList[i].specId,
                        specName: this.state.shopList[i].specName,
                        title: this.state.shopList[i].title,
                        unit: this.state.shopList[i].unit
                    }
                )
                priceNum.push(this.state.shopList[i].buyPrice / 100 * this.state.shopList[i].num);
                priceNum2.push(this.state.shopList[i].num);
            }
            for (let i = 0; i < priceNum.length; i++) {
                priceT = priceT + priceNum[i];
            }
            for (let i = 0; i < priceNum.length; i++) {
                priceT2 = priceT2 + priceNum2[i];
            }
            this.setState({
                shopList: array,
                isSelectedAllItem: true,
                totalPrice: priceT,
                totalNum: priceT2,
                tagNum: 1,
                quanNum: 1
            })
        } else if (this.state.isSelectedAllItem == true) {
            let array = [];
            for (let i = 0; i < this.state.shopList.length; i++) {
                array.push(
                    {
                        checked: false,
                        broadImg: this.state.shopList[i].broadImg,
                        buyPrice: this.state.shopList[i].buyPrice,
                        goodsId: this.state.shopList[i].goodsId,
                        id: this.state.shopList[i].id,
                        logisticsMoney: this.state.shopList[i].logisticsMoney,
                        num: this.state.shopList[i].num,
                        spec: this.state.shopList[i].spec,
                        specId: this.state.shopList[i].specId,
                        specName: this.state.shopList[i].specName,
                        title: this.state.shopList[i].title,
                        unit: this.state.shopList[i].unit
                    }
                )
            }
            this.setState({
                shopList: array,
                isSelectedAllItem: false,
                totalNum: 0,
                totalPrice: 0.00,
                quanNum: 0
            })
        }
    }

    minus(item, index) {
        let num = item.num;
        if (num == 1) {
            return;
        }
        this.state.shopList[index].num = num - 1;
        this.setState({
            shopList: this.state.shopList
        })
        this.calculateCountAndPrice('min');
    }

    add(item, index) {
        let num = item.num;
        this.state.shopList[index].num = num + 1;
        this.setState({
            shopList: this.state.shopList
        })
        this.calculateCountAndPrice('add');
    }

    calculateCountAndPrice(type) {
        if (type == 'add') {
            let tempTotalNum = 0;
            let tempTotalPrice = 0;
            let tempList = this.state.shopList;
            for (let i = 0; i < tempList.length; i++) {
                if (tempList[i].checked) {
                    tempTotalPrice = tempTotalPrice + tempList[i].buyPrice / 100 * tempList[i].num;
                    tempTotalNum = tempTotalNum + tempList[i].num
                }
            }
            this.setState({
                totalPrice: tempTotalPrice,
                totalNum: tempTotalNum
            })
        } else if (type == 'min') {
            let tempTotalNum = 0;
            let tempTotalPrice = 0;
            let tempList = this.state.shopList;
            for (let i = 0; i < tempList.length; i++) {
                if (tempList[i].checked) {
                    tempTotalPrice = tempTotalPrice + tempList[i].buyPrice / 100 * tempList[i].num;
                    tempTotalNum = tempTotalNum + tempList[i].num
                }
            }
            this.setState({
                totalPrice: tempTotalPrice,
                totalNum: tempTotalNum
            })
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        height: height,
        backgroundColor: commonStyle.white
    },
    navBar: {
        height: commonStyle.navHeight,
        alignItems: commonStyle.center,
        justifyContent: commonStyle.center,
        borderBottomWidth: commonStyle.lineWidth,
        borderBottomColor: commonStyle.lineColor
    },
    cellStyle: {
        flexDirection: commonStyle.row,
        alignItems: commonStyle.center,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: commonStyle.lineColor,
        paddingLeft: 10
    },
    sectionHeader: {
        paddingTop: 10,
        height: 40,
        flexDirection: commonStyle.row,
        backgroundColor: "#FFFFFF",
        alignItems: commonStyle.center,
        paddingLeft: 10,
        zIndex: 10
    },
    checkBox: {
        width: 25,
        height: 25
    },
    toolBar: {
        height: commonStyle.cellHeight,
        flexDirection: commonStyle.row,
        alignItems: commonStyle.center
    }
})
